import * as PersonModel from "../models/person";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await PersonModel.getByRut(rut);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const { id, name, paternallastname, maternallastname, address, district, email, phone } = result.data;

  const data = {
    id,
    rut,
    name,
    paternalLastName: paternallastname,
    maternalLastName: maternallastname,
    address,
    district,
    email,
    phone,
  };
  
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await PersonModel.getById(id);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const { rut, name, paternallastname, maternallastname, address, district, email, phone } = result.data;

  const data = {
    id,
    rut,
    name,
    paternalLastName: paternallastname,
    maternalLastName: maternallastname,
    address,
    district,
    email,
    phone,
  };
  
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await PersonModel.getAll();

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

const data = result.data.map((person: any) => {
  return {
    rut: person.rut,
    name: person.name,
    paternalLastName: person.paternallastname,
    maternalLastName: person.maternallastname,
    address: person.address,
    district: person.district,
    email: person.email,
    phone: person.phone,
  };

});

  res.status(200).json({ success: true, data, error: null });
  return;
};

const upsert = async (req: any, res: any) => {
  const {
    rut,
    name,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
  } = req.body;

  const resultGetByRut = await PersonModel.getByRut(rut);

  if (!resultGetByRut.success) {
    res.status(500).json({ success: false, data: null, error: resultGetByRut.error });
    return;
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
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res.status(200).json({ success: true, data: "Insertado correctamente", error: null });
    return;
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
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res.status(200).json({ success: true, data: "Editado correctamente", error: null });
    return;
  }


const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await PersonModel.deleteById(id);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  res.status(200).json({ success: true, data: "Eliminado correctamente", error: null });
  return;
};

export { getByRut, getById, getAll, upsert, deleteById };
