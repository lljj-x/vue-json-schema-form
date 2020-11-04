const routes = [
    {
        path: '/index',
        name: 'editor',
        meta: {
            title: 'Schema generator'
        },
        component: () => import('../../views/editor/Editor.vue'),
    },
    {
        path: '*',
        hidden: true,
        redirect: { name: 'editor' }
    }
];

export default routes;
