import React, {Fragment} from "react";
import dynamic from "next/dynamic";
const Subjectgroupform = dynamic(() => import("../../components/Forms/Subjectgroupform"), {
  ssr: false,
});

export default function Subjectcreate () {
  return (
      <Fragment>
   <Subjectgroupform/>
    </Fragment>
  )
}


