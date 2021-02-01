/**
 * Created by Liu.Jun on 2021/2/1 10:00 下午.
 */

import Antd from 'ant-design-vue';

// eslint-disable-next-line import/no-webpack-loader-syntax
import '!vue-style-loader!css-loader!ant-design-vue/dist/antd.css';

export default {
    install(app) {
        app.use(Antd);
    }
};
