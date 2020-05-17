/**
 * Created by Liu.Jun on 2020/4/17 15:13.
 */

import config from './config';

const {
    typeMap,
    valueMap
} = Object.entries(config).reduce((preVal, [type, value]) => {
    preVal.typeMap[type] = value.type;
    preVal.valueMap[type] = value.default;
    return preVal;
}, {
    typeMap: {},
    valueMap: {},
});

export {
    typeMap,
    valueMap
};
