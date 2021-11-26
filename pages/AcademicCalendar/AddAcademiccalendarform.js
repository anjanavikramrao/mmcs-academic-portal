import React, { useEffect ,Fragment,Component} from "react";
import * as Survey from "survey-react";
import Academiccalendar from './AddAcademiccalendarformschema';
//import * as widgets from 'surveyjs-widgets';
import axios from "axios";
import {faGraduationCap,faLayerGroup,faSchool,faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "primereact/button";
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class AddAcademiccalendarform extends Component {
  componentWillMount() {    
    Survey
    .StylesManager
    .applyTheme("bootstrap");
  }
  
    render() { 
      
      var myCss = {
        matrixdynamic:{
          iconAdd:faLayerGroup,
          iconRemove: faLayerGroup,
        }
      };

  const survey = new Survey.Model(Academiccalendar);
  
  const saveMySurvey = (data) => {
    const NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
    console.log("responseaxios",data.valuesHash)
    //let dummydata={id:7,educationgroup_name:"mahe",country_registered:"356",addresses:[{name:"papu"}]}
   let res= axios.post("https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/academiccalendar", data.valuesHash, {
      headers: {
        "Content-Type": "application/json",
        "apikey":NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+NEXT_PUBLIC_SUPABASE_KEY,

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
      <h3 className="surveyheader">Academic Calendar</h3>   
      <Link href="/AcademicCalendar/Academiccalendarlist">  
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
            completedHtml ="Academic Calendar is Created!!"
            // showPreviewBeforeComplete = 'showAnsweredQuestions'
          />
          
        
        </div>
      </div>
    </div>
    </Fragment>
  )
}

  }