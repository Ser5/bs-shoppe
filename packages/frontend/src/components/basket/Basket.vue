<script setup lang="ts">
import { computed }                      from 'vue';
import { IBasketFullDataItem, IProduct } from 'common/interfaces';
import { useMainStore }                  from '@store/main';
import CountInput                        from '../CountInput.vue';

let mainStore     = useMainStore();
let catalogStore  = mainStore.catalog();
let productsStore = mainStore.products();
let basketStore   = mainStore.basket();

let basketData = computed(() => basketStore.getFullData());



interface IPropWithValue {
	propName:  string,
	valueName: string,
};

interface IPropsWithValuesList extends Array<IPropWithValue> {};

interface IDetail {
	id:      number,
	item:    IBasketFullDataItem,
	product: IProduct,
	props:   IPropsWithValuesList,
}

interface IDetailedList extends Array<IDetail> {}



let detailedList = computed(() => {
	let _detailedList: IDetailedList = [];
	for (let item of basketData.value.items) {
		let offer   = item.offer;
		let product = productsStore.byId[item.offer.productId];
		let detail: IDetail = {
			id: offer.id,
			item,
			product,
			props: [],
		};
		for (let [propId, valueId] of Object.entries(offer.props)) {
			let prop      = product.props[+propId];
			let propName  = prop.name;
			let valueName = prop.values[valueId].name;
			detail.props.push({propName, valueName});
		}
		_detailedList.push(detail);
	}
	return _detailedList;
});
</script>



<template>
	<div class="basket">
		<div class="basket__items">
			<div class="basket__items-head" v-if="basketData.total.count">Товаров в корзине: {{ basketData.total.count }} на {{ basketData.total.price }} руб.</div>
			<div class="basket__items-head" v-else>
				<div class="basket__items-head-line">Корзина пуста</div>
				<a href="/catalog/">В каталог!</a>
			</div>
			<div class="basket__item" v-for="e in detailedList" :key="e.id">
				<div class="basket__image">
					<a class="basket__img" :href="e.product.url"></a>
				</div>
				<div class="basket__not-image">
					<div class="basket__product">
						<a class="basket__item-name" :href="e.product.url">{{ e.product.name }}</a>
						<table class="basket__item-props">
							<tbody>
								<tr v-for="pv in e.props">
									<td>{{ pv.propName }}</td>
									<td>{{ pv.valueName }}</td>
								</tr>
								<tr>
									<td>Цена</td>
									<td class="basket__item-price">{{ e.item.offer.price }} руб.</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div class="basket__item-count">
						<CountInput
							class="basket__item-count-input"
							:value="e.item.count"
							@update:model-value="count => catalogStore.setOfferCount(e.item.offer.id, count)"
						/>
						<div class="basket__item-price">{{ e.item.price }} руб.</div>
					</div>
					<div>
						<button class="btn basket__item-delete" title="Убрать из корзины" @click="basketStore.remove(e.id)">&times;</button>
					</div>
				</div>
			</div>
		</div>
		<a class="btn btn_order" href="/order/" v-if="basketData.total.count">К оформлению</a>
	</div>
</template>



<style scoped>
.basket {
	position: relative;
	max-width: 1000px;
	margin: 0 auto;
}

.basket__items {
	margin-bottom: 50px;
}

.basket__items-head {
	margin-bottom: 25px;
	font-size: 20px;
}
.basket__items-head-line {
	margin-bottom: 20px;
}

.basket__item {
	display: flex;
	align-items: flex-start;
}

.basket__item:not(:last-child) {
	margin-bottom: 15px;
}

.basket__image {
	width: 200px;
	margin-right: 30px;
}
.basket__img {
	display: block;
	width: 100%;
	padding-bottom: 100%;
	background: black;
}

.basket__not-image {
	display: flex;
	align-items: flex-start;
	flex-grow: 1;
}

.basket__product {
	flex-grow: 1;
}

.basket__item-name {
	display: block;
	margin-bottom: 20px;
	font-size: 20px;
}

.basket__item-props {
}


.basket__item-props td {
	padding-bottom: 5px;
}
.basket__item-props td:first-child {
	padding-right: 10px;
	color: #ddd;
}

.basket__item-price {
	white-space: nowrap;
}

.basket__item-count {
	flex-grow: 1;
}

.basket__item-count-input {
	max-width: 150px;
	margin-bottom: 20px;
}

.basket__item-delete {
	margin-left: 20px;
	font-size: 18px;
}

.basket__item-delete:hover {
	color: #e14b4b;
}

@media (max-width: 1000px) {
	.basket__product {
		flex-grow: 3;
	}
}
@media (max-width: 768px) {
	.basket__image {
		margin-right: 20px;
	}
	.basket__not-image {
		flex-wrap: wrap;
	}
	/*.basket__product {
		width: 100%;
	}*/
	.basket__item-count {
		order: 4;
		width: 100%;
		padding-top: 20px;
	}
	/*.basket__item-count-input {
		max-width: 120px;
	}*/
}
@media (max-width: 478px) {
	.basket__items-head {
		margin-bottom: 20px;
		font-size: 18px;
	}
	.basket__image {
		width: 40%;
		margin-right: 10px;
	}
	.basket__item-name {
		font-size: 18px;
	}
	.basket__item-props {
		font-size: 14px;
	}
}
</style>
