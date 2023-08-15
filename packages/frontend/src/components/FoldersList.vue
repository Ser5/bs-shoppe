<script setup lang="ts">
import { IFolder } from "common/interfaces";
import Card        from './Card.vue';

const props = defineProps<{
	folders: IFolder[],
}>();
</script>



<template>
	<div class="cards-list">
		<Card v-for="folder in props.folders" :name="folder.name" :url="folder.url"></Card>
	</div>
</template>
