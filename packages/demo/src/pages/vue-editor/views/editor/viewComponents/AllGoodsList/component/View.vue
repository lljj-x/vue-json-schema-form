<template>
    <GoodsListView
        :line-num="2"
        :line-items="5"
        title="全部商品"
    ></GoodsListView>
</template>
<script>
import GoodsListView from '../../../components/GoodsListView';

export default {
    name: 'AllGoodsList',
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
