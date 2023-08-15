<script setup lang="ts">
import Menu            from '../Menu.vue';
import FavoritesWidget from '../favorites/FavoritesWidget.vue';
import BasketWidget    from '../basket/BasketWidget.vue';
</script>



<template>
	<div class="header">
		<div class="header__block">
			<a class="header__block header__title" href="/">BS.Shoppe</a>
			<Menu class="header__block" />
		</div>
		<div class="header__block header__widgets">
			<FavoritesWidget class="header__widget" />
			<BasketWidget class="header__widget" />
		</div>
	</div>
</template>



<style scoped>
.header {
	display: flex;
	justify-content: space-between;
	flex-shrink: 0;
	padding: 25px 0;
	margin-bottom: 25px;
	border-bottom: 1px solid black;
	z-index: 3;
}

.header__left, .header__right {
	display: flex;
}

.header__block {
	display: flex;
	align-items: center;
}
.header__block:not(:last-child) {
	margin-right: 35px;
}

.header__title {
	font-size: 32px;
	text-decoration: none;
}

.header__widgets {
	display: flex;
	align-items: center;
}
.header__widget {
	font-size: 14px;
}
.header__widget:not(:last-child) {
	margin-right: 35px;
}

@media (max-width: 768px) {
	.header__title {
		font-size: 20px;
	}
	.header__block:not(:last-child) {
		margin-right: 20px;
	}
}

@media (max-width: 478px) {
	.header__title {
		display: none;
	}
}
</style>
