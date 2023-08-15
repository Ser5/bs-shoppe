import { IFolders } from 'common/interfaces';



export const folders: IFolders = {
	1: {
		id:       1,
		parentId: 0,
		name:     'Одежда',
		code:     'odejda',
		url:      '/catalog/odejda/',
		sort:     1,
	},
	2: {
		id:       2,
		parentId: 0,
		name:     'Мебель',
		code:     'mebel',
		url:      '/catalog/mebel/',
		sort:     2,
	},
	3: {
		id:       3,
		parentId: 2,
		name:     'Кресла',
		code:     'kresla',
		url:      '/catalog/mebel/kresla/',
		sort:     1,
	},
	4: {
		id:       4,
		parentId: 2,
		name:     'Диваны',
		code:     'divany',
		url:      '/catalog/mebel/divany/',
		sort:     2,
	},
}
