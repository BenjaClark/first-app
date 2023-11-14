"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { ContentCell, ContentRow } from "@/components/layout/Content";
import Image from "@/components/ui/Image";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link/Link";
import { useState } from "react";

const initData = {
  email: { value: "", isValid: true },
  password: { value: "", isValid: true },
};

const Login = () => {
  const [form, setForm] = useState(initData);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isValid: true },
    });
  };

  const router = useRouter();

  const handleClick = () => {
    axios
      .post("http://localhost:3001/api/user/validate/", {
        login: form.email.value,
        password: form.password.value,
      })
      .then(function (response) {
        console.log(response);
        if (response.data.isValid) {
          alert("Inicio de sesión exitoso");
          router.push("/welcome");
        } else {
          console.log("Credenciales inválidas");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("Credenciales inválidas");
      });
  };

  return (
    <ContentCell gap="65px">
      <Image src="/images/Logo.png" alt="Logo" width={300} height={205} />

      <ContentCell gap="10px">
        <InputText
          label="Correo electrónico"
          type="text"
          placeholder="claudio@matus.cl"
          width="300px"
          onChange={handleOnChange}
          value={form.email.value}
          name="email"
        />
        <InputText
          label="Contraseña"
          type="password"
          placeholder="**********"
          width="300px"
          onChange={handleOnChange}
          value={form.password.value}
          name="password"
        />
        <Button label="Ingresar" onClick={handleClick} />

        <Link label="Olvidé mi contraseña" />
      </ContentCell>
    </ContentCell>
  );
};

export default Login;
