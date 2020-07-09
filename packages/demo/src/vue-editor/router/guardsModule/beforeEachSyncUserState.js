/**
 * 新开标签页时，同步用户状态信息
 * 当前用户状态信息通过 sessionStorage 存储，且用户新开标签时无法获取前一个窗口的用户状态信息
 * 所以该情景下通过请求接口的方式获取状态信息，并同步
 */

import store from '@/store';

export default async function beforeEachSyncUserState() {
    if (!store.getters.isLogin) {
        await store.dispatch('updateUserInfo'); // 用户通过新开标签页进入页面
    }
}
