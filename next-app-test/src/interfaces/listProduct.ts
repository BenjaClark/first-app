export interface IProduct {
  id?: string;
  code: string;
  name: string;
  price: string;
}

export interface IListProduct {
  listProduct: IProduct[];
}
