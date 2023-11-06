import * as React from "react";

import { ContentCell, ContentRow } from "@/components/layout/Content";
import Image from "@/components/ui/Image";
import Option from "@/components/layout/Option";

const Welcome = () => {
  return (
    <Option>
      <ContentCell>
        <Image src="/images/Logo.png" alt="Logo" width={736} height={505} />
      </ContentCell>
    </Option>
  );
};

export default Welcome;
