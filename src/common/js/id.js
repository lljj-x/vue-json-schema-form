/**
 * Created by Liu.Jun on 2020/4/28 18:06.
 */


// 只保证同时生成不重复
export default function genIdFn() {
    let preKey = `${+new Date()}`;
    let key = 0;
    return () => {
        const curTimestamp = `${+new Date()}`;
        if (curTimestamp === preKey) {
            key += 1;
        } else {
            // 重置 key
            key = 0;
        }

        preKey = curTimestamp;
        return `${preKey}x${key}`;
    };
}

export const genId = genIdFn();
