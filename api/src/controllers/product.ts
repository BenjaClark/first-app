import * as ProductModel from "../models/product";
import * as ProductService from "../services/product";

import createLogger from "../utils/logger";

const getByCode = async (req: any, res: any) => {
  const { code } = req.params;
  const result = await ProductModel.getByCode(code);

  if (!result.success) {
    createLogger.error({
      model: "product/getByCode",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  if (!result.data) {
    res.status(200).json({ success: true, data: result.data, error: null });
    return;
  }

  const { id, name, price } = result.data;

  const data = {
    id,
    code,
    name,
    price,
  };

  createLogger.info({
    controller: "product/getByCode",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await ProductModel.getById(id);

  if (!result.success) {
    createLogger.error({
      model: "product/getById",
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

  const { code, name, price } = result.data;

  const data = {
    id,
    code,
    name,
    price,
  };
  createLogger.info({
    controller: "product/getById",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const getAll = async (req: any, res: any) => {
  const result = await ProductModel.getAll();

  if (!result.success) {
    createLogger.error({
      model: "product/getAll",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }

  const data = result.data.map((product: any) => {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      price: product.price,
    };
  });
  createLogger.info({
    controller: "product/getAll",
    message: "OK",
  });
  res.status(200).json({ success: true, data, error: null });
  return;
};

const upsert = async (req: any, res: any) => {
  const productResult = await ProductService.upsert(req.body);

  if (!productResult.success) {
    createLogger.error({
      controller: "product/upsert",
      error: productResult.error,
    });

    return res
      .status(500)
      .json({ success: false, data: null, error: productResult.error });
  }
  return res
    .status(200)
    .json({ success: true, data: productResult.data, error: null });
};

const deleteById = async (req: any, res: any) => {
  const { id } = req.params;
  const result = await ProductModel.deleteById(id);

  if (!result.success) {
    createLogger.error({
      model: "product/deleteById",
      error: result.error,
    });
    res.status(500).json({ success: false, data: null, error: result.error });
    return;
  }
  createLogger.info({
    controller: "product/deteleById",
    message: "OK",
  });
  res.status(200).json({
    success: true,
    data: result.data + " registro(s) eliminado(s)",
    error: null,
  });
  return;
};

export { getByCode, getById, getAll, deleteById, upsert };
