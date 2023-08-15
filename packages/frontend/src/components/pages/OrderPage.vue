<script setup lang="ts">
import { useMainStore }       from '@store/main';
import NavChainAndHeader    from '../NavChainAndHeader.vue';

let mainStore = useMainStore();

let navChainItems = [
	...mainStore.navChain().getForIndex(),
	{url: '/order/', text: 'Оформление заказа'},
];

function order () {
	mainStore.basket().clear(() => window.location.href = '/order/done/');
}
</script>



<template>
	<NavChainAndHeader :items="navChainItems" />

	Тут типа оформление заказа

	<button class="btn" @click="order">Купить (очистить корзину)</button>
</template>



<style scoped>
button {display: block; margin-top: 100px;}
</style>
