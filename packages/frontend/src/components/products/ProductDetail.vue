<script setup lang="ts">
import { useMainStore } from '@store/main';
import Favorite             from '../favorites/Favorite.vue';
import ProductControls      from './ProductControls.vue';

const props = defineProps<{
	id: number,
}>();

let product = useMainStore().products().byId[props.id];
</script>



<template>
	<div class="product">
		<div class="product__image">
			<div class="product__img"></div>
		</div>
		<div class="product__data">
			<Favorite class="product__section" :productId="product.id" :isFull="true" />
			<ProductControls :product="product" />
		</div>
	</div>
</template>



<style scoped>
.product {
	display: flex;
}

.product__section {
	margin-bottom: 25px;
}

.product__image {
	width: 700px;
	height: 700px;
	margin-right: 50px;
}
.product__img {
	display: block;
	width: 100%;
	height: 100%;
	background: black;
}

.product__data {
	flex-grow: 0;
}
</style>
