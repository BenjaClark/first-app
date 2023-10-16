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

      return {success: false, data: null, error: resultGetByRut.error};
    }
  
    if (!resultGetByRut.data) {
      const result = await PersonModel.insert(
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
        return {success: false, data: null, error: result.error};
      }
  
      const data = {
        id: result.data.id,
        rut,
        name,
        paternalLastName,
        maternalLastName,
        address,
        district,
        email,
        phone,
      };
      return {success: true, data, error: null};
    }
  
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
        return {success: false, data: null, error: result.error};
    }
  
    const data = {
      id: resultGetByRut.data.id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    };
  
    return {success: false, data, error: null};
  };

  export {upsert};