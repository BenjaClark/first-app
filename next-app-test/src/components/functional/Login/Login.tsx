"use client";

import { useRouter } from "next/navigation";
import { ContentCell, ContentRow } from "@/components/layout/Content";
import Image from "@/components/ui/Image";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link/Link";
import { useEffect, useState } from "react";
import { useFloatingBar, useUser } from "@/store/hooks";

const initData = {
  email: { value: "", isValid: true },
  password: { value: "", isValid: true },
};

const Login = () => {
  const { validate, user } = useUser();
  const [form, setForm] = useState(initData);
  const { setName } = useFloatingBar();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: { value: e.target.value, isValid: true },
    });
  };

  const handleClick = () => {
    const email = form.email.value;
    const password = form.password.value;
    validate(email, password);
  };

  useEffect(() => {
    if (user.rut !== "") {
      router.push("/welcome");
      setName(user.name);
    }
  }, [user]);

  const router = useRouter();

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
