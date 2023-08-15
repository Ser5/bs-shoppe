<script setup lang="ts">
import { useNavChainStore } from '@store/nav-chain';
import NavChainAndHeader    from '../NavChainAndHeader.vue';
import Basket               from '../basket/Basket.vue';

let navChainItems = [
	...useNavChainStore().getForIndex(),
	{url: '/basket/', text: 'Корзина'},
];
</script>



<template>
	<NavChainAndHeader :items="navChainItems" />
	<Basket />
</template>
