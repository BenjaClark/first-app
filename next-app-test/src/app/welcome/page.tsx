import { ContentCell, ContentRow } from "@/components/layout/Content";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import Image from "@/components/ui/Image";
import Screen from "@/components/layout/Screen";
import Link from "@/components/ui/Link/Link";

import * as React from "react";
import Menu from "@/components/ui/Menu";
import NavBar from "@/components/ui/NavBar";

export default function Welcome() {
  return (
    <ContentCell>
      <ContentRow>
        <NavBar />
      </ContentRow>

      <Screen valign="center" halign="center" height="calc(100vh - 50px)">
        <Image src="/images/Logo.png" alt="Logo" width={736} height={505} />
      </Screen>
    </ContentCell>
  );
}
