/**
 * Created by Liu.Jun on 2019/8/28 12:25.
 */

export default (() => {
    let prevRouteName = ''; // 上一个进入的路由

    // beforeEach 钩子
    function beforeEachPublishSave(to, from) {
        // 针对拥有多个出口的路由（重定向）最多只会进行一次拦截
        if (['Main'].includes(prevRouteName)) {
            prevRouteName = to.name;
            return undefined;
        }

        const fromInstances = from.matched[from.matched.length - 1].instances.default;
        const result = fromInstances.onRouteLeave(to, from);
        if (result !== false) {
            // 只有确认进入某路由才会记录路径
            prevRouteName = to.name;
        }
        return result;
    }

    // 判断是否执行钩子
    beforeEachPublishSave.valid = (to, from) => [
        'EditLongArticle', // 长文章编辑页
        'EditShortArticle', // 长文章编辑页
        'EditReviews', // 长文章编辑页
        'PersonalCenter', // 个人中心编辑页
    ].includes(from.name);

    return beforeEachPublishSave;
})();
