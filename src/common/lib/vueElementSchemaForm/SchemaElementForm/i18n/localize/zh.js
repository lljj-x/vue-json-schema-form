// https://github.com/epoberezkin/ajv-i18n
export default function localizeZh(errors) {
    if (!(errors && errors.length)) return;
    for (let i = 0; i < errors.length; i += 1) {
        const e = errors[i];
        let out;
        let n;
        let cond;
        switch (e.keyword) {
        case '$ref':
            out = `无法找到引用${e.params.ref}`;
            break;
        case 'additionalItems':
            out = '';
            n = e.params.limit;
            out += `不允许超过${n}个元素`;
            break;
        case 'additionalProperties':
            out = '不允许有额外的属性';
            break;
        case 'anyOf':
            out = '数据应为 anyOf 所指定的其中一个';
            break;
        case 'const':
            out = '应当等于常量';
            break;
        case 'contains':
            out = '应当包含一个有效项';
            break;
        case 'custom':
            out = `应当通过 "${e.keyword} 关键词校验"`;
            break;
        case 'dependencies':
            out = '';
            n = e.params.depsCount;
            out += `应当拥有属性${e.params.property}的依赖属性${e.params.deps}`;
            break;
        case 'enum':
            out = '应当是预设定的枚举值之一';
            break;
        case 'exclusiveMaximum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `应当为 ${cond}`;
            break;
        case 'exclusiveMinimum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `应当为 ${cond}`;
            break;
        case 'false schema':
            out = '布尔模式出错';
            break;
        case 'format':
            out = `应当匹配格式 "${e.params.format}"`;
            break;
        case 'formatExclusiveMaximum':
            out = 'formatExclusiveMaximum 应当是布尔值';
            break;
        case 'formatExclusiveMinimum':
            out = 'formatExclusiveMinimum 应当是布尔值';
            break;
        case 'formatMaximum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `应当是 ${cond}`;
            break;
        case 'formatMinimum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `应当是 ${cond}`;
            break;
        case 'if':
            out = `应当匹配模式 "${e.params.failingKeyword}" `;
            break;
        case 'maximum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `应当为 ${cond}`;
            break;
        case 'maxItems':
            out = '';
            n = e.params.limit;
            out += `不应多于 ${n} 个项`;
            break;
        case 'maxLength':
            out = '';
            n = e.params.limit;
            out += `不应多于 ${n} 个字符`;
            break;
        case 'maxProperties':
            out = '';
            n = e.params.limit;
            out += `不应有多于 ${n} 个属性`;
            break;
        case 'minimum':
            out = '';
            cond = `${e.params.comparison} ${e.params.limit}`;
            out += `应当为 ${cond}`;
            break;
        case 'minItems':
            out = '';
            n = e.params.limit;
            out += `不应少于 ${n} 个项`;
            break;
        case 'minLength':
            out = '';
            n = e.params.limit;
            out += `不应少于 ${n} 个字符`;
            break;
        case 'minProperties':
            out = '';
            n = e.params.limit;
            out += `不应有少于 ${n} 个属性`;
            break;
        case 'multipleOf':
            out = `应当是 ${e.params.multipleOf} 的整数倍`;
            break;
        case 'not':
            out = '不应当匹配 "not" schema';
            break;
        case 'oneOf':
            out = '只能匹配一个 "oneOf" 中的 schema';
            break;
        case 'pattern':
            out = `应当匹配模式 "${e.params.pattern}"`;
            break;
        case 'patternRequired':
            out = `应当有属性匹配模式 ${e.params.missingPattern}`;
            break;
        case 'propertyNames':
            out = `属性名 '${e.params.propertyName}' 无效`;
            break;
        case 'required':
            out = `应当有必需属性 ${e.params.missingProperty}`;
            break;
        case 'switch':
            out = `由于 ${e.params.caseIndex} 失败，未通过 "switch" 校验, `;
            break;
        case 'type':
            out = `应当是 ${e.params.type} 类型`;
            break;
        case 'uniqueItems':
            out = `不应当含有重复项 (第 ${e.params.j} 项与第 ${e.params.i} 项是重复的)`;
            break;
        default:
            // eslint-disable-next-line no-continue
            continue;
        }
        e.message = out;
    }
}
