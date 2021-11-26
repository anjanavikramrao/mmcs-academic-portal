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

  Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
    options.request.setRequestHeader("Authorization", "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_KEY);
    options.request.setRequestHeader("apikey", process.env.NEXT_PUBLIC_SUPABASE_KEY);
  };

  const WhenPageIsOpen = (data) => {
	var q = survey.getQuestionByName('eventgroup_id');
  q.choicesByUrl.url = process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_eventgroup?calendar_id=eq."+ router.query.caledarid;
  q.choicesByUrl.run();
};

  const Groupvaluechanged = (sender,options) => {
  if(options.name === 'eventgroup_id') {
	var q1 = survey.getQuestionByName('referenceevent');
  q1.choicesByUrl.url = process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_events?eventgroup_id=eq."+options.value;
  q1.choicesByUrl.run();
   }

   else if(options.name === 'referencepoint') {

        console.log("supa key",survey.data.referenceevent);
    
    if(options.value === 1) {
     
      const headers = {
      'apikey': process.env.NEXT_PUBLIC_SUPABASE_KEY
  };
    
    axios.get(process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_events?id=eq."+ survey.data.referenceevent +"&select=enddate", { headers })
    .then(res => {
   survey.setValue("eventdate", res.data[0].enddate);
   console.log("supa key",survey.getQuestionByName('referenceevent'));
}) 

    }
    else if(options.value === 2) {
    
      const headers = {
      'apikey': process.env.NEXT_PUBLIC_SUPABASE_KEY
  };
    
    axios.get(process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_events?id=eq."+ survey.data.referenceevent +"&select=startdate", { headers })
    .then(res => {
   survey.setValue("eventdate", res.data[0].startdate);
   console.log("supa key",res.data[0].startdate);
}) 
    }
  
   }
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
    console.log("responseaxios",data.valuesHash)
 
  var res_db = {"event_name":data.valuesHash.event_name,"eventgroup_id":data.valuesHash.eventgroup_id,"description":data.valuesHash.description,"referenceevent":data.valuesHash.referenceevent,"referencepoint":data.valuesHash.referencepoint,"offsetdays":data.valuesHash.offsetdays,"unit":data.valuesHash.unit,"eventduration":data.valuesHash.eventduration,"workingdays":data.valuesHash.workingdays,"fromdate":data.valuesHash.fromdate,"todate":data.valuesHash.todate,"orderevent":data.valuesHash.orderevent};
    console.log("responseaxios",res_db)
   let res= axios.patch(process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_events?id=eq."+data.valuesHash.id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+ process.env.NEXT_PUBLIC_SUPABASE_KEY,

   }});
  console.log("Url",res)
 }

  return (
      <Fragment>
    <div className="surveyform">
      <h3 className="surveyheader">Edit Event</h3>   
      <Link href={{
            pathname: "/AdmissionCalendar/CalendarEvent",
            query: {
              id: router.query.id
            },
          }}>  
             <Button icon="pi pi-angle-double-left" label="back to list" style = {{color:'#f7b422'}} className="p-button-link" />
          </Link>
      <div className="cardsurveyform">
        <div>
          <Survey.Survey
          showCompletedPage={true}
            onAfterRenderPage={(data) =>WhenPageIsOpen(data)}
            onAfterRenderQuestion={(data) =>WhenPageIsOpen(data)}     
            onValueChanged={(sender,options) =>Groupvaluechanged(sender,options)}
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