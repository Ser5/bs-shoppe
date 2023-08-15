<script setup lang="ts">
import { useNavChainStore } from '@store/nav-chain';
import Nav                  from '../NavChainAndHeader.vue';
import ProductDetail        from '../products/ProductDetail.vue';

const props = defineProps<{
	id: number,
}>();
</script>



<template>
	<Nav :items="useNavChainStore().getForProductDetail(props.id)" />
	<ProductDetail :id="props.id" />
</template>
