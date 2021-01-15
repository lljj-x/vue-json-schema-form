/**
 * Created by Liu.Jun on 2020/11/20 9:43.
 */

// import './theme/index.css';
import ElementPlus, {
    ElLoading,
    ElMessageBox,
    ElMessage
} from 'ElementPlus';

console.log(ElementPlus);
export default {
    install(app) {
        app.use(ElementPlus);

        // 原型方法
        app.config.globalProperties.$loading = ElLoading.service;
        app.config.globalProperties.$alert = ElMessageBox.alert;
        app.config.globalProperties.$confirm = ElMessageBox.confirm;
        app.config.globalProperties.$prompt = ElMessageBox.prompt;
        app.config.globalProperties.$msgbox = ElMessageBox;
        app.config.globalProperties.$message = ElMessage;
    }
};
