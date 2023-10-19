import * as ProductModel from "../models/product";

const upsert = async (
  product: any
): Promise<{
  success: boolean;
  data: {
    id: string;
    code: number;
    name: string;
    price: number;
  } | null;
  error: any;
}> => {
  const { code, name, price } = product;

  const resultGetByCode = await ProductModel.getByCode(code);

  if (!resultGetByCode.success) {
    return { success: false, data: null, error: resultGetByCode.error };
  }

  if (!resultGetByCode.data) {
    const result = await ProductModel.insert(code, name, price);

    if (!result.success) {
      return { success: false, data: null, error: result.error };
    }

    const data = {
      id: result.data.id,
      code,
      name,
      price,
    };

    return { success: true, data, error: null };
  }

  const result = await ProductModel.updateById(
    resultGetByCode.data.id,
    code,
    name,
    price
  );

  if (!result.success) {
    return { success: false, data: null, error: result.error };
  }

  const data = {
    id: resultGetByCode.data.id,
    code,
    name,
    price,
  };
  return { success: true, data, error: null };
};

export { upsert };
