<script setup lang="ts">
import { ref }          from 'vue';
import { IProduct }     from 'common/interfaces';
import { useMainStore } from '@store/main';
import CountInput       from '../CountInput.vue';

const props = defineProps<{
	product: IProduct,
}>();

let mainStore     = useMainStore();
let catalogStore  = mainStore.catalog();
let productsStore = mainStore.products();
let basketStore   = mainStore.basket();

let product = ref(props.product);
</script>



<template>
	<div class="card-section controls__props">
		<div class="controls__prop" v-for="prop in product.props" :key="prop.id">
			<div class="controls__prop-name">{{ prop.name }}</div>
			<div class="controls__prop-values">
				<div class="controls__prop-value" v-for="value in Object.values(prop.values)" :key="value.id">
					<input
						:id ="`${product.id}:${prop.id}:${value.id}`"
						class="hidden"
						type="radio"
						:name="`${product.id}:${prop.id}`"
						:value="value.id"
						:checked="value.id == productsStore.getActivePropValueId(product.id, prop.id)"
						@change="productsStore.setActivePropValue(product.id, prop.id, value.id)"
					>
					<label :for="`${product.id}:${prop.id}:${value.id}`" class="btn">{{ value.name }}</label>
				</div>
			</div>
		</div>
	</div>
	<div class="card-section controls__price" v-for="offer of [productsStore.getActiveOffer(product.id)]">{{ offer ? `${offer.price} руб.` : '' }}</div>
	<div class="card-section controls__basket">
		<CountInput
			class="controls__basket-count"
			:value="productsStore.getPropValueCount(product.id, productsStore.getActivePropValuesMap(product.id)) || 1"
			@update:model-value="count => catalogStore.setProductOfferCount(product.id, productsStore.getActivePropValuesMap(product.id), count)"
		/>
		<button
			:class="`btn controls__basket-add ${basketStore.getOffersCountForProduct(product.id) ? 'btn_active' : ''}`"
			@click="basketStore.addOfferForProduct(product.id, productsStore.getPropValueCount(product.id, productsStore.getActivePropValuesMap(product.id)))"
		>
			{{ basketStore.getOffersCountForProduct(product.id) ? 'В корзинке' : 'В корзинку' }}
		</button>
	</div>
</template>



<style scoped>
.controls__props {
	flex-grow: 1;
}
.controls__prop {
	margin-bottom: 15px;
}

.controls__prop-name {
	margin-bottom: 5px;
}

.controls__prop-values {
	display: flex;
	flex-wrap: wrap;
	gap: 10px;
}

.controls__price {
	font-size: 20px;
}

.controls__basket {
	display: flex;
}

.controls__basket-count {
	flex-grow: 1;
	margin-right: 20px;
}

.controls__basket-add {
	flex-shrink: 0;
	width: 50%;
	padding: 10px 20px;
	font-size: 18px;
}
</style>
