import { ContentCell, ContentRow } from "@/components/layout/Content";
import InputText from "@/components/ui/InputText";
import { Fragment } from "react";

export default function Home() {
  return( 
  <Fragment>


<ContentCell gap="10px">
  <InputText label= "Login" type= "text" placeholder="claudio@matus.cl"/>
  <InputText label= "Password" type= "password" placeholder="**********"/>
</ContentCell>

  </Fragment>
  );
}
