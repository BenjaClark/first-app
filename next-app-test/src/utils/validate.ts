import { unFormatRut } from "./format";
import { emailRegEx, phoneRegEx, rutRegEx } from "./regex";

const rutValidate = (rut: string) => {
  if (rut.length < 8) return false;

  const rutClean = rut.replace(/[^0-9kK]/g, "");

  if (rutClean.length < 2) return false;

  const bodyRut = rutClean.slice(0, -1);
  const dv = rutClean.slice(-1).toUpperCase();

  if (!bodyRut.replace(/[^0-9]/g, "")) return false;

  return calcularDV(bodyRut) == dv;
};

const calcularDV = (bodyRut: any) => {
  let s = 1;
  let m = 0;

  for (; bodyRut; bodyRut = Math.floor(bodyRut / 10))
    s = (s + (bodyRut % 10) * (9 - (m++ % 6))) % 11;

  return s ? s - 1 : "K";
};

const isValidRut = (rut: string) => {
  if (
    (rutRegEx.test(unFormatRut(rut)) &&
      unFormatRut(rut).length > 7 &&
      rutValidate(unFormatRut(rut))) ||
    rut === ""
  ) {
    return true;
  } else {
    return false;
  }
};

const isValidEmail = (email: string) => {
  if (email.length > 200) return false;
  if (email === "") return false;

  if (emailRegEx.test(email)) {
    return true;
  } else {
    return false;
  }
};

const isValidPhone = (phone: string) => {
  if (phone.length > 9) return false;
  if (phone === "") return false;

  if (phoneRegEx.test(phone)) {
    return true;
  } else {
    return false;
  }
};

export { isValidRut, isValidEmail, isValidPhone };
