/**
 * Created by Liu.Jun on 2020/4/29 11:58.
 */

export default [
    {
        // 默认轮播图
        name: 'CarouselImg',
        value: {
            imgList: [
                {
                    imgUrl: 'https://gjusp.alicdn.com/img/img1550568121854-2927159970.jpg@1000y-0ic_50Q.jpg_.webp',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://m.360buyimg.com/babel/jfs/t1/136164/18/4633/216335/5f1176b9E0d2e6f59/e41c72e01932fd73.jpg.webp',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://gw.alicdn.com/tfs/TB1DKP9zCtYBeNjSspkXXbU8VXa-1920-450.jpg_Q90.jpg',
                    imgLink: 'https://www.jd.com'
                }
            ]
        }
    },
    {
        name: 'Text',
        value: {
            txt: '抢购商品',
            txtColor: '#507aa0'
        }
    },
    {
        // 默认秒杀商品
        name: 'FlashSaleGoodsList',
        value: {
            startTime: (new Date((+new Date() + 60 * 60 * 1000 * 3))).toISOString(),
            seckillBrand: {
                // eslint-disable-next-line max-len
                imgUrl: 'https://img30.360buyimg.com/babel/s290x370_jfs/t1/133470/23/5172/252715/5f1a3b3cE2c82f4cf/4a92d18397680eee.jpg!cc_290x370.webp',
                imgLink: 'https://www.jd.com'
            },
            goodsList: [
                {
                    // eslint-disable-next-line max-len
                    imgUrl: 'https://img20.360buyimg.com/seckillcms/s140x140_jfs/t1/126328/18/7901/172630/5f1a59abE28e964aa/f5e20e27f28b0a89.jpg.webp',
                    imgLink: 'https://www.jd.com'
                },
                {
                    // eslint-disable-next-line max-len
                    imgUrl: 'https://img30.360buyimg.com/seckillcms/s140x140_jfs/t1/142185/40/3434/109046/5f16ac4fE956bf200/90efad9b84ffe90b.jpg.webp',
                    imgLink: 'https://www.jd.com'
                },
                {
                    // eslint-disable-next-line max-len
                    imgUrl: 'https://img14.360buyimg.com/seckillcms/s140x140_jfs/t1/133076/17/1286/104358/5ed75fc3E23ef61d0/b978578df3ac20be.jpg.webp',
                    imgLink: 'https://www.jd.com'
                },
                {
                    // eslint-disable-next-line max-len
                    imgUrl: 'https://img14.360buyimg.com/seckillcms/s140x140_jfs/t1/118303/36/12735/201862/5f190d0eEdc4b3f3e/aa56786b0830a522.jpg.webp',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://img14.360buyimg.com/seckillcms/s140x140_jfs/t1/124035/6/7608/109674/5f1535f4E446ef9a3/5d16b10d7fdd226e.jpg.webp',
                    imgLink: 'https://www.jd.com'
                }
            ]
        }
    },
    {
        name: 'Text',
        value: {
            txt: '超值进口新发现',
            txtColor: '#ff0132'
        }
    },
    {
        name: 'MultipleImg5',
        value: {
            imgList: [
                'https://img.alicdn.com/tps/i4/TB1Q2Mnd2zO3e4jSZFxwu1P_FXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1t2dzOvb2gK0jSZK9wu1EgFXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1ZJtFOAL0gK0jSZFAwu3A9pXa.png_500x1000q75.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB1y4tuOxz1gK0jSZSgSuuvwpXa.jpg_500x1000q75s0.jpg_.webp',
                'https://img.alicdn.com/tps/i4/TB14GVJOAT2gK0jSZFkwu3IQFXa.png_500x1000q75.jpg_.webp',
            ].map(item => ({
                imgUrl: item,
                imgLink: 'https://www.tmall.com',
            }))
        }
    },
    {
        name: 'Text',
        value: {
            txt: '超值进口新发现',
            txtColor: '#487cff'
        }
    },
    {
        name: 'MultipleImg2_3',
        value: {
            imgItem1_1: {
                imgUrl: 'https://img.alicdn.com/tps/i4/TB1fbhiawoQMeJjy0FnSuv8gFXa.jpg_490x490q100.jpg_.webp',
                imgLink: 'https://www.jd.com/'
            },
            imgItem1_2: {
                imgUrl: 'https://gw.alicdn.com/tfs/TB1UzOqoWL7gK0jSZFBXXXZZpXa-468-602.jpg',
                imgLink: 'https://www.jd.com/'
            },
            imgItem2_1: {
                imgUrl: 'https://img.alicdn.com/tfs/TB1XjMYnfb2gK0jSZK9XXaEgFXa-468-1236.jpg',
                imgLink: 'https://www.jd.com/'
            },
            imgItem2_2: {
                imgUrl: 'https://gw.alicdn.com/tfs/TB1s720BxD1gK0jSZFyXXciOVXa-468-1236.jpg',
                imgLink: 'https://www.jd.com/'
            },
            imgItem2_3: {
                imgUrl: 'https://gw.alicdn.com/tfs/TB1xVR9oFP7gK0jSZFjXXc5aXXa-468-602.jpg',
                imgLink: 'https://www.jd.com/'
            }
        }
    },
    {
        name: 'Text',
        value: {
            txt: '超值进口新发现',
            txtColor: '#589A6D'
        }
    },
    {
        name: 'MultipleImg1_3',
        value: {
            imgItem1_1: {
                imgUrl: 'https://aecpm.alicdn.com/simba/img/TB1W4nPJFXXXXbSXpXXSutbFXXX.jpg',
                imgLink: 'http://127.0.0.1:8800/vue-editor.html#/editor'
            },
            imgItem2_1: {
                imgUrl: 'https://img.alicdn.com/tps/i4/TB1KhvGOAY2gK0jSZFgSuw5OFXa.jpg',
                imgLink: 'http://127.0.0.1:8800/vue-editor.html#/editor'
            },
            imgItem2_2: {
                imgUrl: 'https://img.alicdn.com/tps/i4/TB17qddaOERMeJjSspiSuvZLFXa.jpg_320x5000q100.jpg_.webp',
                imgLink: 'http://127.0.0.1:8800/vue-editor.html#/editor'
            },
            imgItem2_3: {
                imgUrl: 'https://img.alicdn.com/tfs/TB1XjMYnfb2gK0jSZK9XXaEgFXa-468-1236.jpg',
                imgLink: 'http://127.0.0.1:8800/vue-editor.html#/editor'
            }
        }
    },
    {
        name: 'CategoryGoods',
        value: {
            title: '打造爱巢',
            subTitle: 'HOME',
            banner: {
                link: {
                    imgUrl: 'https://img.alicdn.com/tps/i4/TB1MesKcWmWQ1JjSZPhwu0CJFXa.png',
                    imgLink: 'https://www.jd.com'
                },
                bannerTitle: '广告位',
                bannerSubTitle: '广告位副标题'
            },
            goodsList: [
                {
                    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i3/3243519086/O1CN016gQ0Ia2GzR82IAhdR_!!0-item_pic.jpg',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i1/2145455856/O1CN01tJoDJ11t85wjbqfVw_!!0-item_pic.jpg',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i1/2750439771/TB14Nr2MVXXXXbMapXXXXXXXXXX_!!0-item_pic.jpg',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i2/2619099633/O1CN01XQNyC82L1xuQm6aeX_!!0-item_pic.jpg',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i1/748159429/O1CN01xeiYck2JWX37gKDJk_!!2-item_pic.png',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i1/3294603858/O1CN01HpuPy31eN0YdGTTkz_!!2-item_pic.png',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i1/2105113961/O1CN01C6b1kj1f8BJxju0i4_!!0-item_pic.jpg',
                    imgLink: 'https://www.jd.com'
                },
                {
                    imgUrl: 'https://gw.alicdn.com/bao/uploaded/i3/670743919/TB1ikrMawnH8KJjSspcXXb3QFXa_!!0-item_pic.jpg',
                    imgLink: 'https://www.jd.com'
                }
            ]
        }
    },
    {
        name: 'RecommendedGoodsList'
    },
    {
        name: 'AllGoodsList'
    }
];
