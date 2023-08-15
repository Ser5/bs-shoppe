<script setup lang="ts">
import { useNavChainStore } from '@store/nav-chain';
import NavChainAndHeader    from '../NavChainAndHeader.vue';

let navChainItems = [
	...useNavChainStore().getForIndex(),
	{url: '/order/', text: 'Оформление заказа'},
];
</script>



<template>
	<NavChainAndHeader :items="navChainItems" />
	<div>Заказ создан!</div>
	<a href="/catalog/">В каталог!</a>
</template>



<style scoped>
div, a {font-size: 20px;}
div    {padding: 50px 0 20px 0;}
</style>
