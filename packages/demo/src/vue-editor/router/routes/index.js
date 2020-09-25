const routes = [
    {
        path: '/editor',
        name: 'editor',
        meta: {
            title: 'Vue Editor'
        },
        component: () => import('../../views/editor/Editor.vue'),
    },
    {
        path: '/editor-m',
        name: 'editorM',
        meta: {
            title: 'Vue Editor Mobile'
        },
        component: () => import('../../views/editor/EditorM.vue'),
    },
    {
        path: '*',
        hidden: true,
        redirect: { name: 'editor' }
    }
];

export default routes;
