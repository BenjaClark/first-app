"use client";

import { useRouter } from "next/navigation";

import { ContentCell, ContentRow } from "@/components/layout/Content";
import Image from "@/components/ui/Image";
import InputText from "@/components/ui/InputText";
import Button from "@/components/ui/Button";
import Link from "@/components/ui/Link/Link";

const Login = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/welcome");
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
        />
        <InputText
          label="Contraseña"
          type="password"
          placeholder="**********"
          width="300px"
        />
        <Button label="Ingresar" onClick={handleClick} />

        <Link label="Olvidé mi contraseña" />
      </ContentCell>
    </ContentCell>
  );
};

export default Login;
