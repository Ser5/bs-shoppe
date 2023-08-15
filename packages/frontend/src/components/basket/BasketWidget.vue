<script setup lang="ts">
//?
import { ref, computed }  from 'vue';
import { useBasketStore } from '@store/basket';
import Dropdown           from '../Dropdown.vue';

let basketStore = useBasketStore();
let basketData  = computed(() => basketStore.getFullData());

let isActive = ref(false);
</script>



<template>
	<div class="basket">
		<div class="basket__total" @click="isActive = !isActive">
			<div class="basket__icon">🛒</div>
			<div class="basket__count">{{ basketData.total.count }}</div>
			<div class="basket__price">{{ basketData.total.price }} руб.</div>
		</div>
		<Dropdown class="basket__dropdown" :isActive="isActive">
			<div class="basket__items">
				<div class="basket__items-head">{{ basketData.total.count ? `Товаров в корзине: ${basketData.total.count}` : `Корзина пуста` }}</div>
				<div class="basket__item" v-for="item in basketData.items" :key="item.offer.id">
					<div class="basket__item-data">
						<a class="basket__item-name" href="#">{{ item.offer.name }}</a>
						<div class="basket__item-price">{{ `${item.offer.price} руб. &times; ${item.count} = ${item.price} руб.` }}</div>
					</div>
					<button class="btn basket__item-delete" title="Убрать из корзины" @click="basketStore.remove(item.offer.id)">&times;</button>
				</div>
			</div>
			<a class="btn btn_order" href="/basket/" v-if="basketData.total.count">Перейти в корзину</a>
		</Dropdown>
	</div>
</template>



<style scoped>
.basket {
	position: relative;
	min-width: 100px;
	font-size: 14px;
	cursor: pointer;
}

.basket__total {
	display: flex;
	align-items: center;
}

.basket__icon {
	position: relative;
	top: -1px;
	margin-right: 10px;
	font-size: 20px;
}

.basket__count {
	display: inline-flex;
	justify-content: center;
	align-items: center;
	height: 22px;
	min-width: 22px;
	padding: 0 7px;
	margin-right: 10px;
	background: #0c7580;
	border-radius: 11px;
}

.basket__price {
	white-space: nowrap;
}

.basket__dropdown {
	top: 30px;
	right: 0;
}
.basket__items {
	overflow: auto;
	height: 300px;
	cursor: default;
}
.basket__items-head {
	margin: 5px 100px 25px 0;
	font-size: 20px;
}
.basket__item {
	display: flex;
	align-items: flex-start;
}
.basket__item:not(:last-child) {
	margin-bottom: 15px;
}

.basket__item-data {
	flex-grow: 1;
	margin-right: 20px;
	line-height: 145%;
}

.basket__item-name {
}

.basket__item-delete {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 24px;
	height: 24px;
	padding: 0;
	font-size: 18px;
}
.basket__item-delete:hover {
	color: #e14b4b;
}
</style>
