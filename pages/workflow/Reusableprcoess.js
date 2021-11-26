import React, { useEffect ,useState,Fragment,Component} from "react";
import * as Survey from "survey-react";
import workflowSchema from './workflowshema';
import axios from "axios";
import {faGraduationCap,faLayerGroup,faSchool,faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "primereact/button";
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/router';
import { Dialog } from 'primereact/dialog';


function Reusableprocess () {
  
   useEffect(() => {
    Survey.StylesManager.applyTheme("bootstrap");

    
    Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
    options.request.setRequestHeader("Authorization", "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_KEY);
    options.request.setRequestHeader("apikey", process.env.NEXT_PUBLIC_SUPABASE_KEY);
  };

  }, []);
  
   var myCss = {
        matrixdynamic:{
          iconAdd:faLayerGroup,
          iconRemove: faLayerGroup,
        }
      };

const router = useRouter() 

 const survey = new Survey.Model(workflowSchema);
 
  const [productDialog, setProductDialog] = useState(false);
  const [surveyForm, setsurveyForm] = useState(null);


    const savedata = (data) => {
    console.log("responseaxios",data.valuesHash)
    var res_db = {"activity_name":data.valuesHash.activity_name,"workflow_process":data.valuesHash.workflow_process,"formdefinition_id":data.valuesHash.formdefinition_id};
   let res3= axios.post(process.env.NEXT_PUBLIC_SUPABASE_URL +"workflow_form_link", res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":process.env.NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+process.env.NEXT_PUBLIC_SUPABASE_KEY,

      },
      
    });
   
    res3.then(function(result) {
    
  });
    
  };

  var loadedImageLinks = [
 "https://awzskdvknmpuuhxditwu.supabase.in/storage/v1/object/public/mybucket/pace.png"
 ];
  
 const Groupvaluechanged = (sender,options) => {
     if(options.name === 'formdefinition_id') {
 var question = survey.getQuestionByName("question5");
    var choices = question.choices.splice(0, question.choices.length);
    for(var i=0; i<choices.length; ++i) {
        choices[i].imageLink = loadedImageLinks[i];
    }
    question.choices = choices;
     }
};

  return (
      <Fragment>
    <div className="surveyform">
      <h3 className="surveyheader">WorkFlow Process</h3>   
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
             onValueChanged={(sender,options) =>Groupvaluechanged(sender,options)}
            completeText="Create"
            showNavigationButtons={true}      
            onComplete={(data) =>savedata(data)}     
            model={survey}
            css={myCss}
            completedHtml ="Completed !!"
          />
        
        </div>
      </div>
    </div>
    </Fragment>
  )
}
export default Reusableprocess;