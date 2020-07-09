// import beSyncUserState from './guardsModule/beforeEachSyncUserState.js';
// import bePublishSave from './guardsModule/beforeEachPublishSave.js';
// import beRedirect from './guardsModule/beforeEachRedirect.js';

// 顺序执行
const beListConfig = [
    // beSyncUserState, // 新开标签页时，同步用户状态信息
    // bePublishSave, // 发布保存提示框
    // beRedirect // 分析用户状态，重定向落地页
];

// 路由守卫
export default function guards(router) {
    router.beforeEach(async (to, from, next) => {
        const beGuardsList = [...beListConfig];

        // 依次执行每一个拦截器
        // 如果有返回路由地址 中断循环，跳转路由，'' || 'next' 字符串，执行next();
        // 如果catch异常 终止路由跳转，中断循环

        while (beGuardsList.length > 0) {
            const handler = beGuardsList.shift();
            const isRunInterceptor = handler.valid ? handler.valid(to, from) : true;

            if (isRunInterceptor) {
                try {
                    const nextValue = await handler(to, from); // eslint-disable-line
                    if (nextValue !== undefined) {
                        next(...(nextValue === '' || nextValue === 'next' ? [] : [nextValue]));
                        return;
                    }
                } catch (e) {
                    // reject 或者 throw error 中断后续拦截器，并且不跳转页面
                    next(false);
                    return;
                }
            }
        }

        // 兜底执行
        next();
    });

    // after each 不用改变路由行为，不采用上述模式
    router.afterEach((to, from) => {
        const baseTitle = 'Demo';
        document.title = to.meta.title ? `${to.meta.title} | ${baseTitle}` : baseTitle;
    });
}
