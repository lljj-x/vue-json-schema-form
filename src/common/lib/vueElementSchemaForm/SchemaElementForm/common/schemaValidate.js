import Ajv from 'ajv';
import i18n from '../i18n';

import {
    isObject, deepEquals
} from './utils';

let ajv = createAjvInstance();

let formerCustomFormats = null;
let formerMetaSchema = null;

// 创建实例
function createAjvInstance() {
    const ajvInstance = new Ajv({
        errorDataPath: 'property',
        allErrors: true,
        multipleOfPrecision: 8,
        schemaId: 'auto',
        unknownFormats: 'ignore',
    });

    // 添加base-64 format
    ajvInstance.addFormat(
        'data-url',
        /^data:([a-z]+\/[a-z0-9-+.]+)?;(?:name=(.*);)?base64,(.*)$/
    );

    // 添加color format
    ajvInstance.addFormat(
        'color',
        // eslint-disable-next-line max-len
        /^(#?([0-9A-Fa-f]{3}){1,2}\b|aqua|black|blue|fuchsia|gray|green|lime|maroon|navy|olive|orange|purple|red|silver|teal|white|yellow|(rgb\(\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*,\s*\b([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\b\s*\))|(rgb\(\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*,\s*(\d?\d%|100%)+\s*\)))$/
    );
    return ajvInstance;
}

/**
 * 将错误输出从ajv转换为jsonschema使用的格式
 * At some point, components should be updated to support ajv.
 */

function transformAjvErrors(errors = []) {
    if (errors === null) {
        return [];
    }

    return errors.map((e) => {
        const {
            dataPath, keyword, message, params, schemaPath
        } = e;
        const property = `${dataPath}`;

        // put data in expected format
        return {
            name: keyword,
            property,
            message,
            params, // specific to ajv
            stack: `${property} ${message}`.trim(),
            schemaPath,
        };
    });
}

/**
 * 通过 schema校验formData并返回错误信息
 * @param formData 校验的数据
 * @param schema
 * @param transformErrors function - 转换错误, 如个性化的配置
 * @param additionalMetaSchemas 数组 添加 ajv metaSchema
 * @param customFormats 添加 ajv 自定义 formats
 * @returns {{errors: ([]|{stack: string, schemaPath: *, name: *, property: string, message: *, params: *}[])}}
 */
export default function validateFormData({
    formData,
    schema,
    transformErrors,
    additionalMetaSchemas = [],
    customFormats = {}
} = {}) {
    const newMetaSchemas = !deepEquals(formerMetaSchema, additionalMetaSchemas);
    const newFormats = !deepEquals(formerCustomFormats, customFormats);

    // 变更了 Meta或者调整了format配置重置新的实例
    if (newMetaSchemas || newFormats) {
        ajv = createAjvInstance();
    }

    // 添加更多要验证的模式
    if (
        additionalMetaSchemas
        && newMetaSchemas
        && Array.isArray(additionalMetaSchemas)
    ) {
        ajv.addMetaSchema(additionalMetaSchemas);
        formerMetaSchema = additionalMetaSchemas;
    }

    // 注册自定义的 formats - 没有变更只会注册一次 - 否则重新创建实例
    if (customFormats && newFormats && isObject(customFormats)) {
        Object.keys(customFormats).forEach((formatName) => {
            ajv.addFormat(formatName, customFormats[formatName]);
        });

        formerCustomFormats = customFormats;
    }

    let validationError = null;
    try {
        ajv.validate(schema, formData);
    } catch (err) {
        validationError = err;
    }

    // ajv 默认多语言处理
    i18n.getCurrentLocalize()(ajv.errors);

    let errors = transformAjvErrors(ajv.errors);

    // 清除错误
    ajv.errors = null;

    // 处理异常
    const noProperMetaSchema = validationError
        && validationError.message
        && typeof validationError.message === 'string'
        && validationError.message.includes('no schema with key or ref ');

    if (noProperMetaSchema) {
        errors = [
            ...errors,
            {
                stack: validationError.message,
            },
        ];
    }

    // 转换错误, 如传入自定义的错误
    if (typeof transformErrors === 'function') {
        errors = transformErrors(errors);
    }

    return {
        errors
    };
}

/**
 * 根据模式验证数据，如果数据有效则返回true，否则返回* false。如果模式无效，那么这个函数将返回* false。
 * @param schema
 * @param data
 * @returns {boolean|PromiseLike<any>}
 */
export function isValid(schema, data) {
    try {
        return ajv.validate(schema, data);
    } catch (e) {
        return false;
    }
}
