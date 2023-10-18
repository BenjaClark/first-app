import * as CustomerModel from "../models/customer";
import * as CompanyModel from "../models/company";
import * as PersonModel from "../models/person";

const upsert = async (values: any) => {
  const {
    type,
    rut,
    fantasyName,
    name,
    activity,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
  } = values;

  const resultGetByRut = await CustomerModel.getByRut(rut);

  if (!resultGetByRut.success) {
    return { success: false, data: null, error: resultGetByRut.error };
  }

  if (!resultGetByRut.data && type === "C") {
    const resultInsertCompany = await CompanyModel.insert(
      rut,
      fantasyName,
      name,
      activity,
      address,
      district,
      email,
      phone
    );

    if (!resultInsertCompany.success) {
      return { success: false, data: null, error: resultInsertCompany.error };
    }

    const company_id = resultInsertCompany.data.id;

    const resultInsert = await CustomerModel.insert(
      type,
      null,
      resultInsertCompany.data.id
    );

    if (!resultInsert.success) {
      return { success: false, data: null, error: resultInsert.error };
    }

    const data = {
      id: resultInsert.data.id,
      type,
      company_id: company_id,
      rut,
      name,
      fantasyName,
      address,
      district,
      email,
      phone,
    };

    if (resultInsert.success) {
      return { success: true, data, error: null };
    }
  }

  if (!resultGetByRut.data && type === "P") {
    const resultInsertPerson = await PersonModel.insert(
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone
    );

    if (!resultInsertPerson.success) {
      return { success: false, data: null, error: resultInsertPerson.error };
    }

    const person_id = resultInsertPerson.data.id;

    const resultInsert = await CustomerModel.insert(
      type,
      resultInsertPerson.data.id,
      null
    );

    if (!resultInsert.success) {
      return { success: false, data: null, error: resultInsert.error };
    }

    const data = {
      id: resultInsert.data.id,
      type,
      person_id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    };

    if (resultInsert.success) {
      return { success: true, data, error: null };
    }
  }

  if (resultGetByRut.data && type === "C") {
    const result = await CompanyModel.updateById(
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

    if (!result.success) {
      return { success: false, data: null, error: result.error };
    }

    const company_id = result.data.id;

    const resultGetByRut2 = await CustomerModel.getByRut(rut);

    if (!resultGetByRut2.data) {
      const resultInsert = await CustomerModel.insert(type, null, company_id);

      if (!resultInsert.success) {
        return { success: false, data: null, error: resultInsert.error };
      }

      const data = {
        id: resultInsert.data.id,
        type,
        company_id: company_id,
        rut,
        name,
        fantasyName,
        activity,
        address,
        district,
        email,
        phone,
      };

      if (resultInsert.success) {
        return { success: true, data, error: null };
      }
    }

    const resultUpdate = await CustomerModel.updateById(
      resultGetByRut2.data.id,
      null,
      company_id
    );
    if (!resultUpdate.success) {
      return { success: false, data: null, error: resultUpdate.error };
    }

    const data = {
      id: resultGetByRut2.data.id,
      type,
      company_id,
      rut,
      name,
      fantasyName,
      activity,
      address,
      district,
      email,
      phone,
    };

    return { success: true, data, error: null };
  }

  if (resultGetByRut.data && type === "P") {
    const result = await PersonModel.updateById(
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

    if (!result.success) {
      return { success: false, data: null, error: result.error };
    }

    const person_id = resultGetByRut.data.id;

    const resultGetByRut2 = await PersonModel.getByRut(rut);

    if (!resultGetByRut2.data) {
      const resultInsert = await CustomerModel.insert(type, person_id, null);

      if (!resultInsert.success) {
        return { success: false, data: null, error: resultInsert.error };
      }

      const data = {
        id: resultInsert.data.id,
        type,
        person_id,
        rut,
        name,
        address,
        district,
        email,
        phone,
      };

      return { success: true, data, error: null };
    }

    const resultUpdate = await CustomerModel.updateById(
      resultGetByRut2.data.id,
      person_id,
      null
    );

    if (!resultUpdate.success) {
      return { success: false, data: null, error: resultUpdate.error };
    }

    const data = {
      id: resultGetByRut2.data.id,
      type,
      person_id,
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
  }

  return { success: false, data: null, error: resultGetByRut.error };
};

export { upsert };
