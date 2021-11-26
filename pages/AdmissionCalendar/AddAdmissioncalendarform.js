import React, { useEffect ,Fragment,Component} from "react";


//import * as widgets from 'surveyjs-widgets';
import axios from "axios";
import {faGraduationCap,faLayerGroup,faSchool,faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "primereact/button";
import useSWR from 'swr';
import $ from 'jquery';
import select2Init from 'select2';
import 'select2/dist/css/select2.min.css';
import * as Survey from "survey-react";
import * as widgets from 'surveyjs-widgets';
import Admissioncalendar from './AddAdmissioncalendarformschema';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function AddAdmissioncalendarform () {

 useEffect(() => {
    Survey.StylesManager.applyTheme("bootstrap");
    widgets.select2(Survey);
    widgets.select2tagbox(Survey);
  }, []);
  
   var myCss = {
        matrixdynamic:{
          iconAdd:faLayerGroup,
          iconRemove: faLayerGroup,
        }
      };

  Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
    options.request.setRequestHeader("Authorization", "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_KEY);
    options.request.setRequestHeader("apikey", process.env.NEXT_PUBLIC_SUPABASE_KEY);
  };

  const survey = new Survey.Model(Admissioncalendar);
  
  const saveMySurvey = (data) => {
    console.log("responseaxios",data.valuesHash)
    //let dummydata={id:7,educationgroup_name:"mahe",country_registered:"356",addresses:[{name:"papu"}]}
   let res= axios.post(process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar", data.valuesHash, {
      headers: {
        "Content-Type": "application/json",
        "apikey":process.env.NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+process.env.NEXT_PUBLIC_SUPABASE_KEY,

      },
      
    });

   
    res.then(function(result) {
      //console.log("result----",result.data)
      //console.log("result----",result.status)
  });
    
  };

  return (
      <Fragment>
    <div className="surveyform">
      <h3 className="surveyheader">Admission Calendar</h3>   
      <Link href="/AdmissionCalendar/Admissioncalendarlist">  
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
            completedHtml ="Admission Calendar is Created!!"
            // showPreviewBeforeComplete = 'showAnsweredQuestions'
          />
          
        
        </div>
      </div>
    </div>
    </Fragment>
  )
}

export default AddAdmissioncalendarform;