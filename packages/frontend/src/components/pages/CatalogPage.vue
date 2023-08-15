<script setup lang="ts">
import { useProductsStore } from '@store/products';
import ProductsList         from '../products/ProductsList.vue';
</script>

<template>
	<ProductsList :items="useProductsStore().byId" />
</template>
