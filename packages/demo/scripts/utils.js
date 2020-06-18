/**
 * Created by Liu.Jun on 2019/11/27 9:57.
 */

exports.getSingle = function getSingle(fn) {
    let result;
    return function proxySingle(...args) {
        if (!result) {
            result = fn.apply(this, args);
        }
        return result;
    };
};
