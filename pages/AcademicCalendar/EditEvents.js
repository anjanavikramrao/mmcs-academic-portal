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


function EditEvents () {
  
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
 
        var res = { currentPageNo: 1, data: {"id":router.query.id,"event_name":router.query.eventname,"eventgroup_id":router.query.eventgroupid,
        "description":router.query.descriptionevent,"referenceevent":router.query.reference_event,"referencepoint":router.query.reference_point,
        "offsetdays":router.query.offset_days,"unit":router.query.unitevent,"eventduration":router.query.event_duration,"workingdays":router.query.working_days,
        "fromdate":router.query.from_date,
        "todate":router.query.to_date,"orderevent":router.query.orderevent}};
     console.log(res.data)
  survey.currentPageNo = res.currentPageNo;
  survey.data = res.data;

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
  
    const editProduct = (rowdata) => {  
     var res = { currentPageNo: 1, data: {"id":router.query.id,"event_name":router.query.eventname,"eventgroup_id":router.query.eventgroupid,
        "description":router.query.descriptionevent,"referenceevent":rowdrouter.queryata.reference_event,"referencepoint":router.query.reference_point,
        "offsetdays":router.query.offset_days,"unit":router.query.unitevent,"eventduration":router.query.event_duration,"workingdays":router.query.working_days,
        "fromdate":router.query.from_date,
        "todate":router.query.to_date,"orderevent":router.query.orderevent}};
      console.log("=====res_db",res_db)
     const survey = new Survey.Model(AddEventschema);
     survey.currentPageNo = res.currentPageNo;
     survey.data = res.data;
     setsurveyForm(<Survey.Survey
      showCompletedPage={false} 
      completeText="Update"
      showNavigationButtons={true}
      onComplete={(data) => {
        editproductdatatable(data)
        
      }}
      model={survey}
    />)   
 }
 const editproductdatatable=(data)=>{
    const NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
    console.log("responseaxios",data.valuesHash)
 
  var res_db = {"event_name":data.valuesHash.event_name,"eventgroup_id":data.valuesHash.eventgroup_id,"description":data.valuesHash.description,"referenceevent":data.valuesHash.referenceevent,"referencepoint":data.valuesHash.referencepoint,"offsetdays":data.valuesHash.offsetdays,"unit":data.valuesHash.unit,"eventduration":data.valuesHash.eventduration,"workingdays":data.valuesHash.workingdays,"fromdate":data.valuesHash.fromdate,"todate":data.valuesHash.todate,"orderevent":data.valuesHash.orderevent};
    console.log("responseaxios",res_db)
   let res= axios.patch("https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/academic_calendar_events?id=eq."+data.valuesHash.id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+NEXT_PUBLIC_SUPABASE_KEY,

   }});
  console.log("Url",res)
 }

  return (
      <Fragment>
    <div className="surveyform">
      <h3 className="surveyheader">Edit Event</h3>   
      <Link href="/AcademicCalendar/CalendarEvent">  
             <Button icon="pi pi-angle-double-left" label="back to list" style = {{color:'#f7b422'}} className="p-button-link" />
          </Link>
      <div className="cardsurveyform">
        <div>
          <Survey.Survey
            showCompletedPage={true}
            completeText="Update"
            showNavigationButtons={true}
            onComplete={(data) =>saveMySurvey(data)}
           
            model={survey}
            css={myCss}
            completedHtml ="Updated!!"
            // showPreviewBeforeComplete = 'showAnsweredQuestions'
          />
        
        </div>
      </div>
    </div>
    </Fragment>
  )
}
export default EditEvents;