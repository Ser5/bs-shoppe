<script setup lang="ts">
import { INavChainItemsList } from "common/interfaces";

const props = defineProps<{
	items: INavChainItemsList,
}>();

let maxIndex = props.items.length - 1;
</script>



<template>
	<div class="nav-chain">
		<template v-for="(item, index) in props.items">
			<a class="nav-chain__item" :href="item.url">{{ item.text }}</a>
			<span class="nav-chain__item nav-chain__sep" v-if="index < maxIndex"></span>
		</template>
	</div>
</template>



<style scoped>
.nav-chain {
	display: flex;
}

.nav-chain__item:not(:last-child) {
	margin-right: 10px;
}

.nav-chain__sep {
	color: #aaa;
	font-weight: bold;
	transform: scaleX(0.7);
	z-index: -1;
}
.nav-chain__sep::after {
	content: '>';
}
</style>
