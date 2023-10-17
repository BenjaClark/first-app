import * as InvoiceCabModel from "../models/invoiceCab";
import * as InvoiceDetModel from "../models/invoiceDet";
import * as PersonModel from "../models/person";
import * as CompanyModel from "../models/company";
import * as CustomerModel from "../models/customer";

import createLogger from "../utils/logger";

const getAll = async (req: any, res: any) => {
  const result = await InvoiceCabModel.getAll();

  if (!result.success) {
    createLogger.error({
      model: "invoiceCab/getAll",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((invoice: any) => {
    return {
      id: invoice.id,
      number: invoice.number,
      customer_id: invoice.customer_id,
      date: invoice.date,
      quantity: invoice.quantity,
      product_id: invoice.product_id,
      price: invoice.price,
      subtotal: invoice.subtotal,
      tax: invoice.tax,
      total: invoice.total,
    };
  });
  createLogger.info({
    controller: "user/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await InvoiceCabModel.getById(id);

  if (!result.success) {
    createLogger.error({
      model: "invoiceCab/getById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  if (!result.data) {
    res
      .status(200)
      .json({ success: true, data: result.data, error: result.error });
    return;
  }

  const {
    number,
    customer_id,
    date,
    quantity,
    product_id,
    price,
    subtotal,
    tax,
    total,
  } = result.data;

  const data = {
    id,
    number,
    customer_id,
    date,
    quantity,
    product_id,
    price,
    subtotal,
    tax,
    total,
  };

  createLogger.info({
    controller: "invoideCab/getById",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getByCustomerRut = async (req: any, res: any) => {
  const { rut } = req.params;
  const result = await CustomerModel.getByRut(rut);

  if (!result.success) {
    createLogger.error({
      model: "customer/getByRut",
      error: result.error,
    });
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
  createLogger.info({
    controller: "invoice/getByCustomerRut",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const upsert = async (req: any, res: any) => {
  const {
    number,
    customer: {
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
    },
    date,
    detail,
    total,
  } = req.body;

  const resultGetByRut = await CustomerModel.getByRut(rut);

  if (!resultGetByRut.success) {
    createLogger.error({
      model: "customer/getByRut",
      error: resultGetByRut.error,
    });
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
      createLogger.error({
        model: "company/insert",
        error: resultInsertCompany.error,
      });
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertCompany.error });
      return;
    }

    const company_id = resultInsertCompany.data.id;

    const resultInsert = await CustomerModel.insert(
      type,
      null,
      resultInsertCompany.data.id
    );

    if (!resultInsert.success) {
      createLogger.error({
        model: "customer/insert",
        error: resultInsert.error,
      });
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
      createLogger.info({
        controller: "customer/upsert",
        message: "OK",
      });

      const customer_id = resultInsert.id;

      const resultInsertInvoiceCab = await InvoiceCabModel.insert(
        number,
        customer_id,
        "2023-10-16"
      );

      const resultInsertInvoiceDet = await InvoiceDetModel.insert;
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
      createLogger.error({
        model: "person/insert",
        error: resultInsertPerson.error,
      });
      res
        .status(500)
        .json({ success: false, data: null, error: resultInsertPerson.error });
      return;
    }

    const person_id = resultInsertPerson.data.id;

    const resultInsert = await CustomerModel.insert(
      type,
      resultInsertPerson.data.id,
      null
    );

    if (!resultInsert.success) {
      createLogger.error({
        model: "customer/insert",
        error: resultInsert.error,
      });
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
      createLogger.info({
        controller: "customer/upsert",
        message: "OK",
      });
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
      createLogger.error({
        model: "company/updateById",
        error: result.error,
      });
      res.status(500).json({ success: false, result, error: result.error });
      return;
    }

    const company_id = result.data.id;

    const resultGetByRut2 = await CustomerModel.getByRut(rut);

    if (!resultGetByRut2.data) {
      const resultInsert = await CustomerModel.insert(type, null, company_id);

      if (!resultInsert.success) {
        createLogger.error({
          model: "customer/insert",
          error: result.error,
        });
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
        activity,
        address,
        district,
        email,
        phone,
      };

      if (resultInsert.success) {
        createLogger.info({
          controller: "customer/upsert",
          message: "OK",
        });
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
      null,
      company_id
    );
    if (!resultUpdate.success) {
      createLogger.error({
        model: "customer/updateById",
        error: resultUpdate.error,
      });
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
      activity,
      address,
      district,
      email,
      phone,
    };

    createLogger.info({
      controller: "customer/upsert",
      message: "OK",
    });
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
      createLogger.error({
        model: "person/updateById",
        error: result.error,
      });
      res.status(500).json({ success: false, result, error: result.error });
      return;
    }

    const person_id = resultGetByRut.data.id;

    const resultGetByRut2 = await PersonModel.getByRut(rut);

    if (!resultGetByRut2.data) {
      const resultInsert = await CustomerModel.insert(type, person_id, null);

      if (!resultInsert.success) {
        createLogger.error({
          model: "customer/insert",
          error: resultInsert.error,
        });
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
      createLogger.info({
        controller: "customer/upsert",
        message: "OK",
      });
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
      null
    );
    if (!resultUpdate.success) {
      createLogger.error({
        model: "customer/updateById",
        error: resultUpdate.error,
      });
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
    createLogger.info({
      controller: "customer/upsert",
      message: "OK",
    });
    res.status(200).json({
      success: true,
      data: data,
      error: null,
    });
    return;
  }
  res.status(500).json({
    success: true,
    data: null,
    error: null,
  });
  return;
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await InvoiceCabModel.deleteById(id);

  if (!result.success) {
    createLogger.error({
      model: "user/deleteById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "user/deleteById",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: result.data + " registro(s) eliminado(s)",
    error: null,
  });
  return;
};

export { upsert, getByCustomerRut, getAll, deleteById, getById };
