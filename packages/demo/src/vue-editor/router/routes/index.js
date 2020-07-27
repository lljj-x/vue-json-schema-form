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
        path: '*',
        hidden: true,
        redirect: { name: 'editor' }
    }
];

export default routes;
