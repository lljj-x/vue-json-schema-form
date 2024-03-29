export default {
    $schema: 'http://json-schema.org/draft-07/schema#',
    type: 'object',
    definitions: {
        ImgItem: {
            type: 'object',
            properties: {
                imgUrl: {
                    title: '图片地址',
                    type: 'string',
                    format: 'uri'
                },
                imgLink: {
                    title: '链接地址',
                    type: 'string',
                    format: 'uri',
                    default: 'https://www.jd.com'
                }
            },
            required: [
                'imgUrl',
                'imgLink'
            ]
        }
    },
    properties: {
        startTime: {
            title: '配置秒杀开始时间',
            type: 'string',
            format: 'date-time'
        },
        seckillBrand: {
            $ref: '#/definitions/ImgItem'
        },
        goodsList: {
            type: 'array',
            minItems: 4,
            maxItems: 8,
            uniqueItems: true,
            'ui:afterArrayOperate': (formData, command, payload) => {
                debugger;
            },
            items: {
                $ref: '#/definitions/ImgItem'
            }
        }
    },
    required: [
        'startTime'
    ],
    additionalProperties: false
};
