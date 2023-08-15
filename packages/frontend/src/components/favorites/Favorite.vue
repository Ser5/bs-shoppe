<script setup lang="ts">
import { ref }          from 'vue';
import { useMainStore } from '@store/main';

const props = defineProps<{
	isFull?:   boolean,
	productId: number,
}>();

let favoritesStore = useMainStore().favorites();

let isFull    = !!props.isFull;
let productId = ref(props.productId);
</script>



<template>
	<button :class="`fav ${isFull ? 'btn fav_full' : 'fav_small'} ${favoritesStore.isSet(productId) ? 'fav_active' : ''}`" @click="favoritesStore.toggle(productId)">
		<div class="fav__icon">❤</div>
		<div class="fav__text">{{ !favoritesStore.isSet(productId) ? 'В избранное' : 'В избранном' }}</div>
	</button>
</template>



<style scoped>
.fav {
	display: flex;
	justify-content: center;
	align-items: center;
	right: 20px;
	top: 20px;
	background: white;
	cursor: pointer;
}



.fav_small {
	width: 30px;
	height: 30px;
	padding: 3px 0 0 0;
	border-radius: 50%;
	font-size: 0;
	transition: all 0.25s;
}
.fav_small:hover {
	box-shadow: 0 0 0 2px inset #e14b4b;
}
.fav__icon {
	font-size: 20px;
	color: #555;
}
.fav_active .fav__icon {
	color: #e14b4b;
}



/*.fav_full {
}*/
.fav_full .fav__icon {
	padding-right: 12px;
}
.fav_full .fav__text {
	width: 100px;
	text-align: left;
}
</style>
