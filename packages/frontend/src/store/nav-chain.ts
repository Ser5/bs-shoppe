import { defineStore }      from 'pinia';
import { useFoldersStore }  from './folders';
import { useProductsStore } from './products';
import { INavChainItem, INavChainItemsList } from "common/interfaces";



export const useNavChainStore = defineStore('navChain', () => {
	let foldersStore  = useFoldersStore();
	let productsStore = useProductsStore();

	function getForIndex (): INavChainItemsList {
		return [{url: '/', text: 'Главная'}];
	}

	function getForCatalog (): INavChainItemsList {
		return [
			...getForIndex(),
			{url: '/catalog/', text: 'Каталог'}
		];
	}

	function getForFolder (folderId: number): INavChainItemsList {
		let foldersChain: INavChainItemsList = [];
		while (folderId != 0) {
			let folder = foldersStore.byId[folderId];
			if (folder) {
				let chainItem: INavChainItem = {url: folder.url, text: folder.name};
				foldersChain.unshift(chainItem);
				folderId = folder.parentId;
			} else {
				break;
			}
		}
		return [...getForCatalog(), ...foldersChain];
	}

	function getForProductDetail (productId: number): INavChainItemsList {
		let chain: INavChainItemsList;
		let product = productsStore.byId[productId];
		if (product) {
			chain = [
				...getForFolder(product.folderId),
				{url: product.url, text: product.name},
			];
		} else {
			chain = getForCatalog();
		}
		return chain;
	}

	/*function getForRoute (productId: number): INavChainItemsList {
		switch (router.currentRoute.value.name) {
			case 'Index':
			break;

			default:
				break;
		}
	}*/

	return {getForIndex, getForCatalog, getForFolder, getForProductDetail};
});
