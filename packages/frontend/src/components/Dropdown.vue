<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	isActive?: boolean,
}>();

let isActive = computed(() => !!props.isActive);
</script>



<template>
	<div :class="`dropdown ${isActive ? 'dropdown_active' : ''}`">
		<slot></slot>
	</div>
</template>



<style scoped>
.dropdown {
	display: none;
	position: absolute;
	padding: 10px 15px;
	width: max-content;
	border-radius: 4px;
	background: #555;
}
.dropdown_active {
	display: block;
}
</style>
