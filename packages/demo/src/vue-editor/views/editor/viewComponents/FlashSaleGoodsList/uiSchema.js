import genImgItem from '../_commonConfig/ui/genImgItem';

export default {
    startTime: {
        'ui:options': {
            placeholder: '选择开始时间',
            style: {
                width: '100%'
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            }
        }
    },
    seckillBrand: {
        ...genImgItem(),
        'ui:title': '广告位配置',
        'ui:description': ''
    },
    goodsList: {
        'ui:options': {
            title: '添加商品',
            description: '添加秒杀商品，这里应该是结合具体业务调用添加商品'
        },
        items: {
            ...genImgItem({
                width: 1920,
                height: 500,
            }),
            'ui:title': '商品配置',
            'ui:description': ''
        }
    }
};
