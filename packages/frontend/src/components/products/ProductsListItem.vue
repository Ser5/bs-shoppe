<script setup lang="ts">
import { ref }         from 'vue';
import { IProduct }    from 'common/interfaces';
import Favorite        from '../favorites/Favorite.vue';
import ProductControls from './ProductControls.vue';
import Card            from '../Card.vue';

const props = defineProps<{
	product: IProduct,
}>();

let product = ref(props.product);
</script>



<template>
	<Card class="product" :name="product.name" :url="product.url">
		<template v-slot:badges>
			<Favorite class="product__favorite" :productId="product.id" />
		</template>
		<template v-slot:stuff>
			<ProductControls :product="product" />
		</template>
	</Card>
</template>



<style scoped>
.product {
	position: relative;
}

.product__favorite {
	position: absolute;
	right: 20px;
	top: 20px;
}
</style>
