import * as PersonModel from "../models/person";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await PersonModel.getByRut(rut);

  const data = {
    person_id: result.id,
    rut: result.rut,
    paternalLastName: result.paternallastname,
    maternalLastName: result.maternallastname,
    address: result.address,
    district: result.district,
    email: result.email,
    phone: result.phone,
  };
  if (!result.success) {
    res.status(500).json({ success: false, error: result.error });
    return;
  }
  res.status(200).json({ success: true, data: result, error: false });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await PersonModel.getById(id);

  const data = {
    person_id: result.id,
    rut: result.rut,
    paternalLastName: result.paternallastname,
    maternalLastName: result.maternallastname,
    address: result.address,
    district: result.district,
    email: result.email,
    phone: result.phone,
  };
  if (!result.success) {
    res.status(500).json({ success: false, error: result.error });
    return;
  }
  res.status(200).json({ success: true, data: result, error: false });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await PersonModel.getAll();

  if (!result.success) {
    res.status(500).json({ success: false, error: result.error });
    return;
  }
  res.status(200).json({ success: true, data: result, error: false });
  return;
};

const upsert = async (req: any, res: any) => {
  const {
    rut,
    paternalLastName,
    maternalLastName,
    address,
    district,
    email,
    phone,
  } = req.body;

  const resultGetByRut = await PersonModel.getByRut(rut);
  if (!resultGetByRut.data) {
    const result = await PersonModel.insert(
      rut,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone
    );

    if (!result.success) {
      res.status(500).json({ success: false, error: result.error });
      return;
    }

    res.status(200).json({ success: true, error: false });
    return;
  }

  if (resultGetByRut.data.id) {
    const result = await PersonModel.updateById(
      resultGetByRut.data.id,
      rut,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone
    );

    if (!result.success) {
      res.status(500).json({ success: false, error: result.error });
      return;
    }

    res.status(200).json({ success: true, error: false });
    return;
  }
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.body;
  const result = await PersonModel.deleteById(id);

  if (!result.success) {
    res.status(500).json({ success: false, error: result.error });
    return;
  }

  res.status(200).json({ success: true, error: false });
  return;
};

export { getByRut, getById, getAll, upsert, deleteById };
