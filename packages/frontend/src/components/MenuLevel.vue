<script setup lang="ts">
import { computed }         from 'vue';
import { ITreeFoldersList } from "common/interfaces";

const props = defineProps<{
	foldersList: ITreeFoldersList,
}>();

let foldersList = computed(() => props.foldersList);
</script>



<template>
	<div class="menu__level">
		<template v-for="folder in foldersList" :key="folder.id">
			<a class="menu__item" :href="folder.url">{{ folder.name }}</a>
			<MenuLevel v-if="folder.children.length > 0" :foldersList="folder.children" />
		</template>
	</div>
</template>



<style scoped>
.menu__level .menu__level {
	padding-left: 20px;
}

.menu__item {
	display: block;
	width: max-content;
	padding: 5px 0;
}
</style>
