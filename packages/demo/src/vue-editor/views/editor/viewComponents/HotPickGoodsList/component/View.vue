<template>
    <GoodsListView
        :line-num="1"
        :line-items="5"
        title="热销商品"
    ></GoodsListView>
</template>
<script>
    import GoodsListView from '../../../components/GoodsListView';

    export default {
        name: 'HotPickGoodsList',
        components: {
            GoodsListView
        },
        props: {
            formData: {
                type: Object,
                default: () => ({})
            }
        }
    };
</script>
