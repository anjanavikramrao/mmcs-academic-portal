import React, {Fragment} from "react";
import dynamic from "next/dynamic";
const CampusInternational = dynamic(() => import("../../components/Forms/CampusInternational"), {
  ssr: false,
});

export default function CampusInternationalcreate () {
  return (
      <Fragment>
   <CampusInternational/>
    </Fragment>
  )
}


