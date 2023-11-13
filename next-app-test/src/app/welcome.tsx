import { ContentCell, ContentRow } from "@/components/layout/Content";
import Button from "@/components/ui/Button";
import InputText from "@/components/ui/InputText";
import Image from "@/components/ui/Image";
import Screen from "@/components/layout/Screen";
import Link from "@/components/ui/Link/Link";

export default function Home() {
  return (
    <Screen valign="center" halign="center">
      <ContentCell gap="65px">
        <Image src="/images/Logo.png" alt="Logo" width={300} height={205} />

        <ContentCell gap="10px">
          <InputText
            label="Login"
            type="text"
            placeholder="claudio@matus.cl"
            width="300px"
          />
          <InputText
            label="Password"
            type="password"
            placeholder="**********"
            width="300px"
          />
          <Button />

          <Link />
        </ContentCell>
      </ContentCell>
    </Screen>
  );
}
