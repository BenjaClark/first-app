import * as CustomerModel from "../models/customer";

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await CustomerModel.getByRut(rut);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
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

  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await CustomerModel.getById(id);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const { person_id, login, hash } = result.data;

  const data = {
    id,
    person_id,
    login,
    hash,
  };

  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await CustomerModel.getAll();

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((user: any) => {
    return {
      id: user.id,
      person_id: user.person_id,
      login: user.email,
      hash: user.hash,
    };
  });

  res.status(200).json({ success: true, data, error: null });
  return;
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await CustomerModel.deleteById(id);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  res
    .status(200)
    .json({ success: true, data: "Eliminado correctamente", error: null });
  return;
};

const upsert = async (req: any, res: any) => {
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
  } = req.body;

  const resultGetByRut = await CustomerModel.getByRut(rut);

  if (!resultGetByRut.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultGetByRut.error });
    return;
  }

  if (!resultGetByRut.data && type === "C") {
    //AQUI VA EL UPSERT DE COMPANY
    const resultInsertCompany = await CustomerModel.insertCompany(
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
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertCompany.error });
      return;
    }

    const data = {
      id: resultInsertCompany.data.id,
      rut,
      fantasyName,
      name,
      activity,
      address,
      district,
      email,
      phone,
    };

  }

  const resultGetByRut2 = await CustomerModel.getByRut(rut)

  const resultUpdateCompanyById = await CustomerModel.updateCompanyById(
    resultGetByRut2.data.id,
    rut,
    fantasyName,
    name,
    activity,
    address,
    district,
    email,
    phone
  );

  if (!resultUpdateCompanyById.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultUpdateCompanyById.error });
    return;
  }

  const resultInsertCustomer = await CustomerModel.insertCustomer(
    type,
    "",
    resultGetByRut.data.id
  );

  if (!resultInsertCustomer.success) {
    res.status(500).json({
      success: false,
      data: null,
      error: resultInsertCustomer.error,
    });
    return;
  }

  if (resultInsertCustomer.success) {
    res.status(200).json({
      success: true,
      data: "Customer y Company insertados",
      error: null,
    });
    return;
  }

  if (!resultGetByRut.data && type === "P") {
    //AQUI VA EL UPSERT DE PERSON
    const resultInsertPerson = await CustomerModel.insertPerson(
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
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertPerson.error });
      return;
    }

    const data = {
      id: resultInsertPerson.data.id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    };

    res.status(200).json({ success: true, data, error: null });
    return;
  }

  const resultUpdatePersonById = await CustomerModel.updatePersonById(
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

  if (!resultUpdatePersonById.success) {
    res.status(500).json({ success: false, data: null , error: resultUpdatePersonById.error });
    return;
  }

  const resultInsertCustomer2 = await CustomerModel.insertCustomer(
    type,
    resultGetByRut.data.id,
    ""
  );

  if (!resultInsertCustomer2.success) {
    res.status(500).json({
      success: false,
      data: null,
      error: resultInsertCustomer2.error,
    });
    return;
  }

  if (resultInsertCustomer2.success) {
    res.status(200).json({
      success: true,
      data: "Customer y Person insertados",
      error: null,
    });
    return;
  }

  if (resultGetByRut.data && type === "C") {
    //AQUI VA EL UPSERT DE COMPANY
    const resultInsertCompany = await CustomerModel.insertCompany(
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
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertCompany.error });
      return;
    }

    const data = {
      id: resultInsertCompany.data.id,
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

  const resultUpdateCompanyById3 = await CustomerModel.updateCompanyById(
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

  if (!resultUpdateCompanyById3.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultUpdateCompanyById3.error });
    return;
  }

  const resultGetCustomerById = await CustomerModel.getCustomerById(
    resultGetByRut.id
  );

  if (!resultGetCustomerById.data) {
    const result = await CustomerModel.insertCustomer(
      type,
      "",
      resultGetByRut.data.id
    );

    if (!result.success) {
      res.status(500).json({ success: false, data: null, error: result.error });
      return;
    }

    res
      .status(200)
      .json({ success: true, data: "Customer insertado", error: null });
    return;
  }

  const resultUpdateCompanyById2 = await CustomerModel.updateCompanyById(
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

  if (!resultUpdateCompanyById2.success) {
    res
      .status(500)
      .json({ success: false, data: null, error: resultUpdateCompanyById2.error });
    return;
  }
  if (resultUpdateCompanyById2.success) {
  res
    .status(200)
    .json({ success: true, data: "Customer actualizado", error: null });
  return;
  }

  if (resultGetByRut.data && type === "P") {
    //AQUI VA EL UPSERT DE PERSON
    const resultInsertPerson = await CustomerModel.insertPerson(
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
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertPerson.error });
      return;
    }

    const data = {
      id: resultInsertPerson.data.id,
      rut,
      name,
      paternalLastName,
      maternalLastName,
      address,
      district,
      email,
      phone,
    };

    res.status(200).json({ success: true, data, error: null });
    return;
  }

  const resultUpdateById = await CustomerModel.updateById(
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

  if (!resultUpdateById.success) {
    res.status(500).json({ success: false, data: null, error: resultUpdateById.error });
    return;
  }

  const resultInsertCustomerPerson2 = await CustomerModel.insertCustomer(
    type,
    resultGetByRut.data.id,
    ""
  );

  if (!resultInsertCustomerPerson2.success) {
    res.status(500).json({
      success: false,
      data: null,
      error: resultInsertCustomerPerson2.error,
    });
    return;
  }

  if (resultInsertCustomerPerson2.success) {
    res.status(200).json({
      success: true,
      data: "Customer y Person insertados",
      error: null,
    });
    return;
  }
  
  
} 


export { upsert, getByRut, getAll, deleteById, getById };
