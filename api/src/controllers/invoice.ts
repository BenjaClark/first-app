import * as InvoiceCabModel from "../models/invoiceCab";
import * as InvoiceDetModel from "../models/invoiceDet";
import * as InvoiceTotModel from "../models/invoiceTot";
import * as CustomerModel from "../models/customer";
import * as CustomerService from "../services/customer";
import * as ProductService from "../services/product";

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
  const { number, customer, date, detail } = req.body;
  const customerResult = await CustomerService.upsert(req.body.customer);

  if (!customerResult.success) {
    createLogger.error({
      controller: "customer/upsert",
      error: customerResult.error,
    });

    return res
      .status(500)
      .json({ success: false, data: null, error: customerResult.error });
  }

  const customer_id = customerResult.data?.id;

  const resultInsertInvoiceCab = await InvoiceCabModel.insert(
    number,
    customer_id,
    date
  );

  if (!resultInsertInvoiceCab.success) {
    createLogger.error({
      controller: "invoice/insert",
      error: resultInsertInvoiceCab.error,
    });

    return res.status(500).json({
      success: false,
      data: null,
      error: resultInsertInvoiceCab.error,
    });
  }

  const invoiceCab_id = resultInsertInvoiceCab.data.id;

  let productDetailSummary = { rows: 0, productError: 0, invoiceDetError: 0 };

  const resultPromise = await Promise.all(
    detail.map(async (item: any) => {
      const { product, quantity } = item;

      const resultProduct = await ProductService.upsert(product);

      if (!resultProduct.success) {
        createLogger.error({
          service: "product/upsert",
          error: resultProduct.error,
        });

        productDetailSummary = {
          ...productDetailSummary,
          productError: productDetailSummary.productError + 1,
        };
      }

      const { id: product_id, price } = resultProduct.data || {
        id: "",
        product_id: "",
        price: 0,
      };

      const resultInvoiceDet = await InvoiceDetModel.insert(
        invoiceCab_id,
        quantity,
        product_id,
        price
      );

      console.log(invoiceCab_id,
        quantity,
        product_id,
        price)

      if (!resultInvoiceDet.success) {
        createLogger.error({
          model: "invoiceDet/insert",
          error: resultProduct.error,
        });

        productDetailSummary = {
          ...productDetailSummary,
          productError: productDetailSummary.productError + 1,
        };
      }

      const itemSubtotal = quantity * price;
      return {
        subtotal: itemSubtotal,
        tax: itemSubtotal * (19 / 100),
        total: itemSubtotal * 1.19,
      };
    })
  );

  const { subtotal, tax, total } = resultPromise.reduce(
    (accumulator, item) => {
      if (item) {
        accumulator.subtotal += item.subtotal;
        accumulator.tax += item.tax;
        accumulator.total += item.total;
      }
      return accumulator;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  const resultInsertInvoiceTot = await InvoiceTotModel.insert(
    resultInsertInvoiceCab.data.id,
    subtotal,
    tax,
    total
  );

  if (!resultInsertInvoiceTot.success) {
    productDetailSummary = {
      ...productDetailSummary,
      productError: productDetailSummary.productError + 1,
    };
  }

  const data = {
    number,
    customer,
    date,
    detail,
    subtotal,
    tax,
    total,
  };
  return res.status(200).json(data);
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
