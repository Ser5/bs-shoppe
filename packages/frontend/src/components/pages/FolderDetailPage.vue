<script setup lang="ts">
import { IFolder, IProducts } from 'common/interfaces';
import { useMainStore }       from '@store/main';
import NotFoundPage           from './NotFoundPage.vue';
import NavChainAndHeader      from '../NavChainAndHeader.vue';
import ProductsList           from '../products/ProductsList.vue';
import FoldersList            from '../FoldersList.vue';

const props = defineProps<{
	path: string[],
}>();

let mainStore     = useMainStore();
let foldersStore  = mainStore.folders();
let productsStore = mainStore.products();

let folder = foldersStore.getByPath(props.path);

let subfoldersList: IFolder[];
let products:       IProducts;
if (folder) {
	subfoldersList = foldersStore.getSubfoldersList(folder.id);
	if (subfoldersList.length == 0) {
		products = productsStore.getForFolder(folder.id);
	}
}
</script>



<template>
	<NotFoundPage v-if="!folder" />
	<template v-else>
		<NavChainAndHeader :items="mainStore.navChain().getForFolder(folder.id)" />
		<FoldersList v-if="subfoldersList.length" :folders="subfoldersList"/>
		<ProductsList v-else :items="products" />
	</template>
</template>
