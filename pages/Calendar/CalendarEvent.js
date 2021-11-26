import React, {Fragment} from "react";
import dynamic from "next/dynamic";

const CalendarEvent = dynamic(() => import("../../components/Forms/CalendarEvent"), {
  ssr: false,
});


export default function CalendarEventcreate () {
  return (
       <React.Fragment>
        <CalendarEvent/>
     </React.Fragment>
  )
}