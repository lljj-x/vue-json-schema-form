/**
 * Created by Liu.Jun on 2019/11/29 12:26.
 */

import generateDefaultValue from '../generateDefaultValue';
import { typeMap } from '../schemaTypeMap';

/**
 * @param schemaJson
 */
export default (schemaJson) => {
    // props只会为 object
    const defaultValue = generateDefaultValue(schemaJson);

    return Object.entries(schemaJson.properties).reduce((preVal, [key, value]) => {
        preVal[key] = {
            required: Array.isArray(schemaJson.required) ? schemaJson.required.includes(key) : false,
            type: [].concat(value.type).map(item => typeMap[item]),
            default: () => defaultValue[key]
        };
        return preVal;
    }, {});
};
