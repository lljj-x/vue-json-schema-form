import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueForm from '@lljj/vue-json-schema-form';

import componentWithDialog from './injectVue/component-with-dialog';
import JsonPerttyPrint from './injectVue/JsonPerttyPrint.vue';

function showJson({ componentProps }) {
    const instance = componentWithDialog({
        VueComponent: JsonPerttyPrint,
        dialogProps: {
            title: 'formData',
            width: '800px'
        },
        componentProps
    });
}

export default ({
  Vue
}) => {
  Vue.use(ElementUI);
  Vue.component('VueForm', VueForm);

  Vue.prototype.$componentWithDialog = componentWithDialog;
  Vue.prototype.$showJson = showJson;
}
