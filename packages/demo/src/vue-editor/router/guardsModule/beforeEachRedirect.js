import ELEMENT from 'ELEMENT';
import store from '@/store';

const { Message } = ELEMENT;

/**
 * 分析用户状态，重定向落地页
 * @param to
 * @param from
 * @returns {string|{name: string}|{name: string}}
 */

export default function beforeEachRedirect(to, from) {
    const { isLogin, authorized } = store.getters;

    // 登录状态，个人中心可以直接打开
    if (isLogin && !['PersonalCenter'].includes(to.name)) {
        // 激活状态 Login\Main 统一跳转去发布选择模板、其它继续下一个
        // 没激活一律跳转 个人中心

        if (authorized) {
            return ['Login', 'Main'].includes(to.name) ? { name: 'ArticleTemplateList' } : 'next';
        }

        Message.warning('Access denied. Please apply for authentication first.');
        return { name: 'PersonalCenter' };
    }

    // 未登陆访问非登陆页 -> 登陆页
    if (!isLogin && !['Login'].includes(to.name)) {
        return {
            name: 'Login'
        };
    }

    return 'next';
}
