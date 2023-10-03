import * as CompanyModel from "../models/company";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await CompanyModel.getByRut(rut);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const { id, fantasyname, name, activity, address, district, email, phone } =
    result.data;

  const data = {
    id,
    rut,
    fantasyName: fantasyname,
    name,
    activity,
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
  const result = await CompanyModel.getById(id);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const { fantasyname, name, activity, address, district, email, phone } =
    result.data;

  const data = {
    id,
    fantasyname,
    name,
    activity,
    address,
    district,
    email,
    phone,
  };

  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await CompanyModel.getAll();

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((company: any) => {
    return {
      id: company.id,
      rut: company.rut,
      fantasyName: company.fantasyName,
      name: company.name,
      activity: company.activity,
      address: company.address,
      district: company.district,
      email: company.email,
      phone: company.phone,
    };
  });

  res.status(200).json({ success: true, data, error: null });
  return;
};

const upsert = async (req: any, res: any) => {
  const { rut, fantasyName, name, activity, address, district, email, phone } =
    req.body;

  const resultGetByRut = await CompanyModel.getByRut(rut);

  if (!resultGetByRut.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByRut.error });
    return;
  }

  if (!resultGetByRut.data) {
    const result = await CompanyModel.insert(
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
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    const data = {
      id: result.data.id,
      rut,
      fantasyName,
      name,
      activity,
      address,
      district,
      email,
      phone,
    };

    res.status(200).json({ success: true, data, error: null });
    return;
  }

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
    res.status(500).json({ success: false, result, error: result.error });
    return;
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

  res.status(200).json({ success: true, data, error: null });
  return;
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await CompanyModel.deleteById(id);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  res
    .status(200)
    .json({ success: true, data: "Eliminado correctamente", error: null });
  return;
};

export { getByRut, getById, getAll, deleteById, upsert };
