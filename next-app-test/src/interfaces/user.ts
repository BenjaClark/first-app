export interface IUser {
  id: string;
  person_id?: string;
  login?: string;
  rut: string;
  name: string;
  paternalLastName: string;
  maternalLastName: string;
  address: string;
  district: string;
  email: string;
  phone: string;
}

export const initDataUser = {
  id: "",
  person_id: "",
  login: "",
  rut: "",
  name: "",
  paternalLastName: "",
  maternalLastName: "",
  address: "",
  district: "",
  phone: "",
  email: "",
};
