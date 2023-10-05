import * as CustomerModel from "../models/customer";
import * as CompanyModel from "../models/company";
import * as PersonModel from "../models/person";

const getAll = async (req: any, res: any) => {
  const result = await CustomerModel.getAll();

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((customer: any) => {
    return {
      id: customer.id,
      type: customer.type,
      rut: customer.rut,
      name: customer.name,
      address: customer.address,
      district: customer.district,
      email: customer.email,
      phone: customer.phone,
    };
  });

  res.status(200).json({ success: true, data, error: null });
  return;
};

const getByRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await CustomerModel.getByRut(rut);

  if (!result.success) {
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  if (!result.data) {
    res
      .status(200)
      .json({ success: true, data: result.data, error: result.error });
    return;
  }

  const { id, type, name, address, district, email, phone } = result.data;

  const data = {
    id,
    type,
    rut,
    name,
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
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertCompany.error });
      return;
    }

    const company_id = resultInsertCompany.data.id;

    const resultInsert = await CustomerModel.insert(
      type,
      resultInsertCompany.data.id,
      resultInsertCompany.data.id
    );

    if (!resultInsert.success) {
      res.status(500).json({
        success: false,
        data: null,
        error: resultInsert.error,
      });
      return;
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
      res.status(200).json({
        success: true,
        data,
        error: null,
      });
      return;
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
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertPerson.error });
      return;
    }

    const person_id = resultInsertPerson.data.id;

    const resultInsert = await CustomerModel.insert(
      type,
      resultInsertPerson.data.id,
      resultInsertPerson.data.id
    );

    if (!resultInsert.success) {
      res.status(500).json({
        success: false,
        data: null,
        error: resultInsert.error,
      });
      return;
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
      res.status(200).json({
        success: true,
        data,
        error: null,
      });
      return;
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
      res.status(500).json({ success: false, result, error: result.error });
      return;
    }

    const company_id = result.data.id;

    const resultGetByRut2 = await CustomerModel.getByRut(rut);

    if (!resultGetByRut2.data) {
      const resultInsert = await CustomerModel.insert(
        type,
        company_id,
        company_id
      );

      if (!resultInsert.success) {
        res.status(500).json({
          success: false,
          data: null,
          error: resultInsert.error,
        });
        return;
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
        res.status(200).json({
          success: true,
          data,
          error: null,
        });
        return;
      }
    }

    const resultUpdate = await CustomerModel.updateById(
      resultGetByRut2.data.id,
      company_id,
      company_id
    );
    if (!resultUpdate.success) {
      res.status(500).json({
        success: false,
        data: null,
        error: resultUpdate.error,
      });
      return;
    }

    const data = {
      id: resultGetByRut2.data.id,
      type,
      company_id,
      rut,
      name,
      fantasyName,
      address,
      district,
      email,
      phone,
    };

    res.status(200).json({
      success: true,
      data: data,
      error: null,
    });
    return;
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
      res.status(500).json({ success: false, result, error: result.error });
      return;
    }

    const person_id = result.data.id;

    const resultGetByRut2 = await PersonModel.getByRut(rut);

    if (!resultGetByRut2.data) {
      const resultInsert = await CustomerModel.insert(
        type,
        person_id,
        person_id
      );

      if (!resultInsert.success) {
        res.status(500).json({
          success: false,
          data: null,
          error: resultInsert.error,
        });
        return;
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

      if (resultInsert.success) {
        res.status(200).json({
          success: true,
          data,
          error: null,
        });
        return;
      }
    }

    const resultUpdate = await CustomerModel.updateById(
      resultGetByRut2.data.id,
      person_id,
      person_id
    );
    if (!resultUpdate.success) {
      res.status(500).json({
        success: false,
        data: null,
        error: resultUpdate.error,
      });
      return;
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

    res.status(200).json({
      success: true,
      data: data,
      error: null,
    });
    return;
  }
};

export { getAll, getByRut, deleteById, upsert };
