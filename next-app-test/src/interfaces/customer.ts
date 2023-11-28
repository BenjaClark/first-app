export interface ICustomer {
  id: string;
  type: string;
  rut: string;
  fantasyName: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  activity: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

export const initDataCustomer = {
  id: "",
  type: "",
  person_id: "",
  company_id: "",
  rut: "",
  fantasyName: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  activity: "",
  address: "",
  district: "",
  email: "",
  phone: "",
};
