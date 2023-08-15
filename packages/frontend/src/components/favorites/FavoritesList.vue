<script setup lang="ts">
import { IProducts }         from 'common/interfaces';
import { useMainStore }      from '@store/main';
import ProductsList          from '../products/ProductsList.vue';

let productsStore  = useMainStore().products();
let favoritesStore = useMainStore().favorites();

let products: IProducts = {};
for (let productId of favoritesStore.allIds) {
	let product = productsStore.byId[productId];
	if (product) {
		products[productId] = product;
	}
}
</script>



<template>
	<div class="favorites">
		<ProductsList :items="products" />
	</div>
</template>



<style scoped>
</style>
