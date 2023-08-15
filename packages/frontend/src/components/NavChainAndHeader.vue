<script setup lang="ts">
import { INavChainItemsList } from "common/interfaces";
import NavChain               from './NavChain.vue';

const props = defineProps<{
	items: INavChainItemsList,
}>();
</script>



<template v-if="props.items.length > 0">
	<NavChain :items="props.items" />
	<h1>{{ props.items[props.items.length - 1].text }}</h1>
</template>



<style scoped>
h1 {
	margin: 15px 0 30px 0;
}
</style>
