/**
 * Created by Liu.Jun on 2020/11/22 9:48 下午.
 */

export function isEmptyObject(obj) {
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}
