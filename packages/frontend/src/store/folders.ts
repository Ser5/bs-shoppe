import { defineStore } from 'pinia';
import { ref, watch }  from 'vue';
import { IFolder, IFolders, ITreeFolder, ITreeFoldersList } from 'common/interfaces';



export const useFoldersStore = defineStore('folders', () => {
	let folders: IFolders = {};
	let byId   = ref(folders);
	let allIds = ref(Object.keys(folders));



	//Карта код -> раздел
	let _byCode: Record<string, IFolder> = {};
	let byCode = ref(_byCode);

	//В виде дерева
	let _treeMap: Record<number, ITreeFolder> = {};
	let _tree: ITreeFoldersList = [];
	let tree = ref(_tree);

	watch(byId, (newById, oldById) => {
		//Карта код -> раздел
		for (let folder of Object.values<IFolder>(newById)) {
			_byCode[folder.code] = folder;
		}

		//В виде дерева
		_treeMap = {
			0: {id: 0, parentId: 0, code: '', name: '', url: '', sort: 0, children: []}
		};
		for (let folder of Object.values<IFolder>(newById)) {
			_treeMap[folder.id] = {...folder, children: []};
		}
		for (let folder of Object.values(_treeMap)) {
			if (folder.id) {
				_treeMap[folder.parentId].children.push(folder);
			}
		}
		for (let folder of Object.values(_treeMap)) {
			folder.children.sort((a, b) => a.sort - b.sort);
		}
		tree.value = _treeMap[0].children;
	});



	function getByPath (path: string|string[]): IFolder|null {
		let folderCodesList: string[] = [];
		if (typeof path === 'string') {
			folderCodesList = [...path.matchAll(/[^/]+/)].map(e => ''+e);
		} else {
			folderCodesList = path;
		}

		let expectedParentId          = 0;
		let foundFolder: IFolder|null = null;
		for (let code of folderCodesList) {
			let folder = byCode.value[code];
			if (folder && folder.parentId == expectedParentId) {
				foundFolder      = folder;
				expectedParentId = folder.id;
			} else {
				foundFolder = null;
				break;
			}
		}

		return foundFolder;
	}



	function getSubfoldersList (folderId: number): IFolder[] {
		let folder = _treeMap[folderId];
		return folder ? folder.children : [];
	}



	return {byId, byCode, allIds, tree, getByPath, getSubfoldersList};
});
