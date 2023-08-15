<script setup lang="ts">
//import { ref } from 'vue';

const props = defineProps<{
	url:       string,
	name:      string,
	imageUrl?: string,
}>();

//let imageUrl = ref(props.imageUrl);
</script>



<template>
	<div class="card">
		<slot name="badges"></slot>
		<div class="card-section card__image">
			<a class="card-section card__img" :href="props.url"></a>
		</div>
		<div class="card-section card__info">
			<a class="card__name" :href="props.url">{{ props.name }}</a>
		</div>
		<slot name="stuff"></slot>
	</div>
</template>



<style scoped>
.card {
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 10px 10px 20px 10px;
	background: #555;
	border-radius: 8px;
	color: white;
}

.card__favorite {
	position: absolute;
	right: 20px;
	top: 20px;
}

.card__image {
	width: 100%;
}
.card__img {
	display: block;
	width: 100%;
	padding-bottom: 100%;
	background: black;
}

.card__info div {
	padding: 5px 0;
}

.card__name {
	font-size: 24px;
	text-decoration: none;
}
.card__name:hover {
	text-decoration: underline;
}
</style>
