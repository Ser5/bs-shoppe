export interface IFolder {
	id:       number,
	parentId: number,
	code:     string,
	name:     string,
	url:      string,
	sort:     number,
};

export interface IFolders extends Record<number, IFolder> {}

export interface ITreeFolder extends IFolder {
	children: ITreeFolder[],
}

export interface ITreeFoldersList extends Array<ITreeFolder> {}



export interface IPropValue {
	id:     number,
	name:   string,
	color?: string,
};

export interface IPropValues extends Record<number, IPropValue> {}

export interface IPropValuesMap extends Record<number, number> {}



export interface IProp {
	id:   number,
	name: string,
};

export interface IProps extends Record<number, IProp> {}



export interface IProductPropsCollectionItem extends IProp {
	values: IPropValues,
}

export interface IProductPropsCollection extends Record<number, IProductPropsCollectionItem> {}



export interface IProduct {
	id:       number,
	folderId: number,
	name:     string,
	url:      string,
	props:    IProductPropsCollection,
};

export interface IProducts extends Record<number, IProduct> {}



export interface IOffer {
	id:        number,
	productId: number,
	name:      string,
	props:     IPropValuesMap,
	price:     number,
};

export interface IOffers extends Record<number, IOffer> {}

export type TOfferSearchParams = [number, IPropValuesMap];



export interface IBasket extends Record<number, number> {}

export interface IBasketTotal {
	count: number,
	price: number,
}

export interface IBasketFullDataItem {
	offer: IOffer,
	count: number,
	price: number,
}

export interface IBasketFullDataItemsList extends Array<IBasketFullDataItem> {}

export interface IBasketFullData {
	total: IBasketTotal,
	items: IBasketFullDataItemsList,
}



export interface IFavorites extends Record<number, true> {}



export interface INavChainItem {
	url:  string,
	text: string,
}

export interface INavChainItemsList extends Array<INavChainItem> {}



export interface IPageData {
	folders?:    IFolders,
	products?:   IProducts,
	offers?:     IOffers,
	props?:      IProps,
	propValues?: IPropValues,
	favorites?:  IFavorites,
	basket?:     IBasket,
}
