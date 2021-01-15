const routes = [
    {
        path: '/editor',
        name: 'editor',
        component: () => import('../../views/editor/Editor.vue'),
    },
    {
        path: '/editor-m',
        name: 'editorM',
        component: () => import('../../views/editor/EditorM.vue'),
    },
    {
        path: '*',
        hidden: true,
        redirect: { name: 'editor' }
    }
];

export default routes;
