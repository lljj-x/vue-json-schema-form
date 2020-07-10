/**
 * Created by Liu.Jun on 2020/5/31 8:27 下午.
 */

// 指南页左侧菜单

// sidebar
// [
//     {
//         title: 'Group 1',   // 必要的
//         path: '/foo/',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
//         collapsable: false, // 可选的, 默认值是 true,
//         sidebarDepth: 1,    // 可选的, 默认值是 1
//         children: [
//             '/',
//             ['/page-b', 'Explicit link text'] // 显示地指定链接的文字
//         ]
//     },
//     {
//         title: 'Group 2',
//         children: [ /* ... */ ]
//     }
// ]

exports.getGuideSidebar = ([groupA = '指南', groupB = '详细配置', groupC = '深入配置', groupD = '更新计划'] = []) => {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                '',
                'basic-config',
                'i18n',
                'polyfill',
                'faq',
                'demo',
            ]
        },
        // {
        //     title: groupB,
        //     collapsable: false,
        //     children: [
        //         'schema',
        //         'uiSchema',
        //         'errorSchema'
        //     ]
        // },
        {
            title: groupC,
            collapsable: false,
            children: [
                'adv-config',
                'design',
                'custom-render-component',
                'why',
            ]
        },
        {
            title: groupD,
            collapsable: false,
            children: [
                'todo',
            ]
        }
    ]
};

// 配置页左侧菜单
exports.getConfigSidebar = ([groupA = '配置'] = []) => {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                'schema',
                'uiSchema',
                'errorSchema',
            ]
        }
    ]
};

// 配置页左侧菜单
exports.getRulesSidebar = ([groupA = '类型规则'] = []) => {
    return [
        {
            title: groupA,
            collapsable: false,
            children: [
                'string',
                'number',
                'object',
                'array',
                'boolean',
                'null',
                'combining',
            ]
        }
    ]
};
