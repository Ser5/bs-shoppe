<script setup lang="ts">
import { IProducts }    from 'common/interfaces';
import ProductsListItem from './ProductsListItem.vue';

const props = defineProps<{
  items: IProducts,
}>();

</script>



<template>
	<div class="cards-list">
		<ProductsListItem v-for="product in props.items" :key="product.id" :product="product" />
	</div>
</template>
