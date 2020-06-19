import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueForm from '@lljj/vue-json-schema-form';

export default ({
  Vue
}) => {
  Vue.use(ElementUI);
  Vue.component('VueForm', VueForm);
}
