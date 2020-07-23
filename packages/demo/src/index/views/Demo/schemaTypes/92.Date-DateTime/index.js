/**
 * Created by Liu.Jun on 2020/7/22 11:07 下午.
 */

export default {
    schema: {
        title: '时间日期选择',
        type: 'object',
        description: '日期和日期时间支持区间选择（默认格式为时间戳，配置 type string 会格式化为 ISO 时间）',
        required: ['dateTimeRange', 'dateTime'],
        properties: {
            dateTimeRange: {
                title: '日期时间区间选择',
                type: 'array',
                format: 'date-time',
                items: {
                    type: 'string'
                }
            },
            dateTimeRangeNumber: {
                title: '日期时间区间选择（number时间戳）',
                type: 'array',
                format: 'date-time',
                items: {
                    type: 'number'
                }
            },
            dateRange: {
                title: '日期区间选择',
                type: 'array',
                format: 'date',
                items: {
                    type: 'string'
                }
            },
            dateRangeNumber: {
                title: '日期区间选择（number时间戳）',
                type: 'array',
                format: 'date',
                items: {
                    type: 'number'
                }
            },
            time: {
                title: '时间选择',
                type: 'string',
                format: 'time'
            },
            dateTime: {
                title: '日期时间',
                type: 'string',
                format: 'date-time'
            },
            dateTimeNumber: {
                title: '日期时间（时间戳）',
                type: 'number',
                format: 'date-time'
            },
            date: {
                title: '日期',
                type: 'string',
                format: 'date'
            },
            dateNumber: {
                title: '日期（时间戳）',
                type: 'number',
                format: 'date'
            }
        }
    }
};
