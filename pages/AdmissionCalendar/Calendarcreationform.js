import React, { useEffect ,Fragment} from "react";
import dynamic from "next/dynamic";
const AddAdmissioncalendarform = dynamic(() => import("./AddAdmissioncalendarform"), {
  ssr: false,
});

export default function Calendarcreationform () {
  return (
      <Fragment>
   <AddAdmissioncalendarform/>
    </Fragment>
  )
}


