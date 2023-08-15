import { IProductPropsCollection, IProducts } from 'common/interfaces';
import { props as p } from "./props.js";
import { getColors }  from "./prop-values/colors.js"
import { getSizes }   from "./prop-values/sizes.js";


interface IPreProduct {
	folderId: number,
	name:     string,
	props:    IProductPropsCollection,
};



let preProductsList: IPreProduct[] = [
	//Одежда
	{
		folderId: 1,
		name:     'Труселя семейные',
		props: {
			1: {...p[1], values: getColors([1, 2, 4])},
			2: {...p[2], values: getSizes([40, 45, 50])},
		},
	},
	{
		folderId: 1,
		name:     'Алкашка семейная',
		props: {
			1: {...p[1], values: getColors([1, 3, 5])},
			2: {...p[2], values: getSizes([40, 42, 43, 50, 52])},
		}
	},
	{
		folderId: 1,
		name:     'Кепка семейная',
		props: {
			1: {...p[1], values: getColors([1, 3])},
			2: {...p[2], values: getSizes([40, 45, 50])},
		}
	},
	{
		folderId: 1,
		name:     'Шляпень какая-то',
		props: {
			1: {...p[1], values: getColors([2, 3, 4, 5])},
			2: {...p[2], values: getSizes([42])},
		}
	},
	// <--- 5
	{
		folderId: 1,
		name:     'Очки модные',
		props: {
			1: {...p[1], values: getColors([4, 5])},
			2: {...p[2], values: getSizes([41, 47])},
		}
	},
	{
		folderId: 1,
		name:     'Носки',
		props: {
			1: {...p[1], values: getColors([1, 2, 3, 4, 5])},
			2: {...p[2], values: getSizes([40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50])},
		}
	},
	{
		folderId: 1,
		name:     'Пуговица',
		props: {
			1: {...p[1], values: getColors([1, 2])},
		}
	},
	{
		folderId: 1,
		name:     'Штаны "Пифагор"',
		props: {
			1: {...p[1], values: getColors([1, 2, 3])},
			2: {...p[2], values: getSizes([48, 49, 50])},
		}
	},
	{
		folderId: 1,
		name:     'Штаны "Лобачевский"',
		props: {
			1: {...p[1], values: getColors([1])},
			2: {...p[2], values: getSizes([48, 49, 50])},
		}
	},
	// <--- 10
	{
		folderId: 1,
		name:     'Перчатки на 6 пальцев',
		props: {
			1: {...p[1], values: getColors([2])},
			2: {...p[2], values: getSizes([45])},
		}
	},
	{
		folderId: 1,
		name:     'Шорты',
		props: {
			1: {...p[1], values: getColors([1])},
			2: {...p[2], values: getSizes([45])},
		}
	},
	{
		folderId: 1,
		name:     'Намордник',
		props: {
			1: {...p[1], values: getColors([3, 4, 5])},
			2: {...p[2], values: getSizes([40, 43, 47, 50])},
		}
	},
	{
		folderId: 1,
		name:     'Случайный лутбокс',
		props: {}
	},
	{
		folderId: 1,
		name:     'Боевой пропуск на одежду',
		props: {}
	},
	// <--- 15
	//Мебель
	{
		folderId: 3,
		name:     'Кресло "Васян"',
		props: {
			1: {...p[1], values: getColors([1, 2])},
		}
	},
	{
		folderId: 4,
		name:     'Диван "Васян"',
		props: {
			1: {...p[1], values: getColors([1, 2])},
		}
	},
];



export const products: IProducts = {};



let id = 1;
for (let p of preProductsList) {
	products[id] ={
		id,
		...p,
		url: `/catalog/product/${id}/`,
	};
	id++;
}
