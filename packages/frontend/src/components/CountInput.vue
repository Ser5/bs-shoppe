<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
	class?: string,
	value?: number,
	min?:   number,
	max?:   number,
}>();

const emit = defineEmits<{
	(e: 'update:model-value', value: number): void,
}>();

let value = computed(() => props.value ?? 1);
let min   = props.min ?? 1;
let max   = props.max ?? 1000000;

function dec () {
	if (value.value > min) {
		emit('update:model-value', value.value - 1);
	}
}

function inc () {
	if (value.value < max) {
		emit('update:model-value', value.value + 1);
	}
}
</script>



<template>
	<div :class="`count ${props.class}`">
		<button class="btn count__btn" @click="dec">&minus;</button>
		<input class="count__value" :value="value" readonly>
		<button class="btn count__btn" @click="inc">+</button>
	</div>
</template>



<style>
.count {
	overflow: hidden;
	display: flex;
	align-items: stretch;
	border-radius: 4px;
}

.count__btn {
	flex-shrink: 0;
	width: 23%;
	min-width: 34px;
	border-radius: 0px;
	background: rgb(233, 233, 237);
}

.count__value {
	width: 54%;
	border-radius: 0px;
	text-align: center;
}
</style>
