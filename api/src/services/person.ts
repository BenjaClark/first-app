import * as PersonModel from "../models/person";

const upsert = async (values: any) => {
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
  } = values;

  const resultGetByRut = await PersonModel.getByRut(rut);

  if (!resultGetByRut.success) {
    return { success: false, data: null, error: resultGetByRut.error };
  }

  if (!resultGetByRut.data) {
    const resultInsert = await PersonModel.insert(
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone
    );

    if (!resultInsert.success) {
      return { success: false, data: null, error: resultInsert.error };
    }

    const data = {
      id: resultInsert.data.id,
      rut: resultInsert.data.rut,
      name: resultInsert.data.name,
      paternalLastName: resultInsert.data.paternallastname,
      maternalLastName: resultInsert.data.maternallastname,
      address: resultInsert.data.address,
      district: resultInsert.data.district,
      email: resultInsert.data.email,
      phone: resultInsert.data.phone,
    };
    return { success: true, data, error: null };
  }

  const resultUpdate = await PersonModel.updateById(
    resultGetByRut.data.id,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone
  );

  if (!resultUpdate.success) {
    return { success: false, data: null, error: resultUpdate.error };
  }

  const data = {
    id: resultUpdate.data.id,
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
  };

  return { success: true, data, error: null };
};

export { upsert };