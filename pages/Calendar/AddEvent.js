import React, {Fragment} from "react";
import dynamic from "next/dynamic";

const AddEvent = dynamic(() => import("../../components/Forms/AddEvent"), {
  ssr: false,
});

export default function AddEventcreate () {
  return (
      <Fragment>
        <AddEvent/>
    </Fragment>
  )
}