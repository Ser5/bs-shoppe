<script setup lang="ts">
import { useMainStore } from '@store/main';

let favoritesStore = useMainStore().favorites();
</script>



<template>
	<a class="fav" href="/favorites/" :title="`В избранном: ${favoritesStore.count()}`">
		<div class="fav__icon">❤</div>
		<div class="fav__count">{{ favoritesStore.count() }}</div>
	</a>
</template>



<style scoped>
.fav {
	display: flex;
	align-items: center;
	text-decoration: none;
	cursor: pointer;
}
.fav__icon {
	margin-right: 10px;
	font-size: 20px;
	color: #e14b4b;
}
</style>
