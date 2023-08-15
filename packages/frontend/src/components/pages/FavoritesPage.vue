<script setup lang="ts">
import { useNavChainStore } from '@store/nav-chain';
import NavChainAndHeader    from '../NavChainAndHeader.vue';
import FavoritesList        from '../favorites/FavoritesList.vue';

let navChainItems = [
	...useNavChainStore().getForIndex(),
	{url: '/favorites/', text: 'Избранное'},
];
</script>



<template>
	<NavChainAndHeader :items="navChainItems" />
	<FavoritesList />
</template>
