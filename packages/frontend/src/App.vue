<script setup lang="ts">
import { useMainStore } from '@store/main';
import Header           from './components/layout/Header.vue';
import Footer           from './components/layout/Footer.vue';

let backdropStore = useMainStore().backdrop();
</script>



<template>
	<Header />
	<div class="main">
		<RouterView />
	</div>
	<Footer />
	<div :class="`backdrop backdrop_mobile ${backdropStore.isActive ? 'backdrop_active' : ''}`" @click="backdropStore.clicked()"></div>
</template>
