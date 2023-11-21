export interface ICustomer {
  id?: string;
  type: string;
  rut: string;
  name: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

export interface IListCustomer {
  listCustomer: ICustomer[];
}
