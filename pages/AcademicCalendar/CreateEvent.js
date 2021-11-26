import React, { useEffect ,Fragment,Component} from "react";
import * as Survey from "survey-react";
import CreateEventSchema from './AddEventSchema';
import axios from "axios";
import {faGraduationCap,faLayerGroup,faSchool,faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "primereact/button";
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router';


function CreateEvent () {
  
   useEffect(() => {
    Survey.StylesManager.applyTheme("bootstrap");
  }, []);
  
   var myCss = {
        matrixdynamic:{
          iconAdd:faLayerGroup,
          iconRemove: faLayerGroup,
        }
      };

const router = useRouter() 
  const survey = new Survey.Model(CreateEventSchema);

    var apikey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
  Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
    options.request.setRequestHeader("Authorization", "Bearer " + apikey);
    options.request.setRequestHeader("apikey", apikey);
  };

  var addMonths = function (params) {
  console.log("params",params)
  if(params.length < 1 || !params[0]) return undefined;
  var res = new Date(params[0]);
  if(params.length < 2) return;
  res.setDate(res.getDate() + params[1]);
  return res;
};

var addDate = function (params) {
   console.log("params",params)
  if(params.length < 1 || !params[0]) return undefined;
  var res = new Date(params[0]);
 // if(params.length < 2) return;

  if (params[2] == 'Days') {
      res.setDate(res.getDate()+params[1]);  
  }
else if(params[2] == 'Months'){
res.setMonth(res.getMonth() + params[1]);
}
  // console.log("getresponse events expression",res.getDate())
  return res;
};
//Register the custom function
Survey
  .FunctionFactory
  .Instance
  .register("addMonths", addMonths); 
  Survey
  .FunctionFactory
  .Instance
  .register("addDate", addDate); 
  
  const saveMySurvey = (data) => {
    const NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
   console.log("Savedata",data.valuesHash)
  
    // var eventcreationreq={eventname:data.valuesHash.eventname,fromdate:data.valuesHash.fromdate,todate:data.valuesHash.todate,eventduration:data.valuesHash.eventduration}
    let res = axios.post("https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/academic_calendar_events", data.valuesHash ,
      {     
        headers: {
           "Prefer" : "return=representation",
          "Content-Type": "application/json",
          apikey: NEXT_PUBLIC_SUPABASE_KEY,
          Authorization: "Bearer " + NEXT_PUBLIC_SUPABASE_KEY,
         
        },
        
      }
      
    );
    console.log("responseaxios", res);
    res.then(function (result) {

      let sCalendarid = result.data
      var res_db = {"calendarid": router.query.id};
       let res10= axios.patch("https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/academic_calendar_events?id=eq."+sCalendarid[0].id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+NEXT_PUBLIC_SUPABASE_KEY,

   }});
     
       console.log("result----", sCalendarid[0].id);
    });
  };

  return (
      <Fragment>
    <div className="surveyform">
      <h3 className="surveyheader">Create Event</h3>   
      <Link href="/AcademicCalendar/CalendarEvent">  
             <Button icon="pi pi-angle-double-left" label="back to list" style = {{color:'#f7b422'}} className="p-button-link" />
          </Link>
      <div className="cardsurveyform">
        <div>
          <Survey.Survey
            showCompletedPage={true}
            completeText="Create"
            showNavigationButtons={true}
            onComplete={(data) =>saveMySurvey(data)}
           
            model={survey}
            css={myCss}
            completedHtml ="New Event Created!!"
            // showPreviewBeforeComplete = 'showAnsweredQuestions'
          />
        
        </div>
      </div>
    </div>
    </Fragment>
  )
}
export default CreateEvent;