import * as PersonModel from "../models/person";
import * as PersonService from "../services/person";
import createLogger from "../utils/logger";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await PersonModel.getByRut(rut);

  if (!result.success) {
    createLogger.error({
      model: "person/getByRut",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  if (!result.data) {
    res.status(200).json({ success: true, data: result.data, error: null });
    return;
  }

  const {
    id,
    name,
    paternallastname,
    maternallastname,
    address,
    district,
    email,
    phone,
  } = result.data;

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
  createLogger.info({
    controller: "person/getByRut",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await PersonModel.getById(id);

  if (!result.success) {
    createLogger.error({
      model: "person/getById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  if (!result.data) {
    res.status(200).json({ success: true, data: result.data, error: null });
    return;
  }

  const {
    rut,
    name,
    paternallastname,
    maternallastname,
    address,
    district,
    email,
    phone,
  } = result.data;

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
  createLogger.info({
    controller: "person/getById",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await PersonModel.getAll();

  if (!result.success) {
    createLogger.error({
      model: "person/getAll",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((person: any) => {
    return {
      id: person.id,
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
  createLogger.info({
    controller: "person/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const upsert = async (req: any, res: any) => {
  const personResult = await PersonService.upsert(req.body);

  if (!personResult.success) {
    createLogger.error({
      controller: "person/upsert",
      error: personResult.error,
    });

    return res
      .status(500)
      .json({ success: false, data: null, error: personResult.error });
  }
  return res
    .status(200)
    .json({ success: true, data: personResult.data, error: null });
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await PersonModel.deleteById(id);

  if (!result.success) {
    createLogger.error({
      model: "person/deleteById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "person/deleteById",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: result.data + " registro(s) eliminado(s)",
    error: null,
  });
  return;
};

export { getByRut, getById, getAll, upsert, deleteById };
