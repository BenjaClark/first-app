export interface ICompany {
  id?: string;
  rut: string;
  fantasyName: string;
  name: string;
  activity: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

export interface IListCompany {
  listCustomer: ICompany[];
}
