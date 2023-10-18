import * as CompanyModel from "../models/company";

const upsert = async (values: any) => {
  const { rut, fantasyName, name, activity, address, district, email, phone } =
    values;

  const resultGetByRut = await CompanyModel.getByRut(rut);

  if (!resultGetByRut.success) {
    return { success: false, data: null, error: resultGetByRut.error };
  }

  if (!resultGetByRut.data) {
    const resultInsert = await CompanyModel.insert(
      rut,
      fantasyName,
      name,
      activity,
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
      rut,
      fantasyName,
      name,
      activity,
      address,
      district,
      email,
      phone,
    };

    return { success: true, data, error: resultInsert.error };
  }

  const resultUpdate = await CompanyModel.updateById(
    resultGetByRut.data.id,
    rut,
    fantasyName,
    name,
    activity,
    address,
    district,
    email,
    phone
  );

  if (!resultUpdate.success) {
    return { success: false, data: null, error: resultUpdate.error };
  }

  const data = {
    id: resultGetByRut.data.id,
    rut,
    fantasyName,
    name,
    activity,
    address,
    district,
    email,
    phone,
  };

  return { success: true, data, error: resultUpdate.error };
};

export { upsert };
