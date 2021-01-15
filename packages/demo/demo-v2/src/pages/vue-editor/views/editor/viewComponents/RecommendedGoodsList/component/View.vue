<template>
    <GoodsListView
        :line-num="1"
        :line-items="5"
        title="推荐商品"
    ></GoodsListView>
</template>
<script>
import GoodsListView from '../../../components/GoodsListView';

export default {
    name: 'RecommendedGoodsList',
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
