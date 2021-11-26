import React, { useEffect ,Fragment,Component} from "react";
import * as Survey from "survey-react";
import Academiccalendar from './AddAcademiccalendarformschema';
import axios from "axios";
import {faGraduationCap,faLayerGroup,faSchool,faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Button } from "primereact/button";
import useSWR from 'swr';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Toast } from 'primereact/toast';
import { useRouter } from 'next/router';


function CalendarEdit () {
  
  useEffect(() => {
    Survey
    .StylesManager
    .applyTheme("bootstrap");
  }, []);
  
   var myCss = {
        matrixdynamic:{
          iconAdd:faLayerGroup,
          iconRemove: faLayerGroup,
        }
      };

   const router = useRouter() 

  const survey = new Survey.Model(Academiccalendar);
  var res = { currentPageNo: 1, data: {"id":router.query.id,"name":router.query.name,"calendaryear":router.query.calendaryear,"calendarsession":router.query.calendarsession,"calendartype":router.query.calendartype,"calendaravailablefor":router.query.calendaravailablefor,"calendardeviation":router.query.calendardeviation,"calendardescription":router.query.calendardescription,"specialinstructions":router.query.specialinstructions}};
  survey.currentPageNo = res.currentPageNo;
  survey.data = res.data;

  const showSticky= () => {
        toast.current.show({severity: 'info', summary: 'Academic Calendar', detail: 'Updated', sticky: true});
    }
  
 const editProduct = (rowdata) => {  
     var res = { currentPageNo: 1, data: {"id":router.query.id,"name":router.query.name,"calendaryear":router.query.calendaryear,"calendarsession":router.query.calendarsession,"calendartype":router.query.calendartype,"calendaravailablefor":router.query.calendaravailablefor,"calendardeviation":router.query.calendardeviation,"calendardescription":router.query.calendardescription,"specialinstructions":router.query.specialinstructions}};
      console.log("=====res_db",res_db)
     const survey = new Survey.Model(Academiccalendar);
     survey.currentPageNo = res.currentPageNo;
     survey.data = res.data;
     setsurveyForm(<Survey.Survey
      showCompletedPage={false} 
      completeText="Update"
      showNavigationButtons={true}
      onComplete={(data) => {
        editproductdatatable(data)
        showSticky()
      }}
      model={survey}
    />)   
 }
 const editproductdatatable=(data)=>{
    const NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
    console.log("responseaxios",data.valuesHash)
 
  //  var res_db = {"name":data.valuesHash.name,"calendaryear":data.valuesHash.calendaryear,"calendarsession":data.valuesHash.calendarsession,"calendartype":data.valuesHash.calendartype,"calendaravailablefor":data.valuesHash.calendaravailablefor,"calendardeviation":data.valuesHash.calendardeviation,"calendardescription":data.valuesHash.calendardescription,"specialinstructions":data.valuesHash.specialinstructions};
    var res_db = {"name":data.valuesHash.name,"calendaryear":data.valuesHash.calendaryear,"calendarsession":data.valuesHash.calendarsession,"calendartype":data.valuesHash.calendartype,"calendaravailablefor":data.valuesHash.calendaravailablefor,"calendardescription":data.valuesHash.calendardescription,"specialinstructions":data.valuesHash.specialinstructions};
    console.log("responseaxios",res_db)
   let res= axios.patch("https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/academiccalendar?id=eq."+data.valuesHash.id,res_db, {
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
      <h3 className="surveyheader">Academic Calendar</h3>   
      <Link href="/AcademicCalendar/Academiccalendarlist">  
             <Button icon="pi pi-angle-double-left" label="back to list" style = {{color:'#f7b422'}} className="p-button-link" />
          </Link>
      <div className="cardsurveyform">
        <div>
          <Survey.Survey
            showCompletedPage={true}
            completeText="Update"
            showNavigationButtons={true}
            onComplete={(data) =>editproductdatatable(data)}
           

            model={survey}
            css={myCss}
            completedHtml ="Updated!"
            // showPreviewBeforeComplete = 'showAnsweredQuestions'
          />
        
        </div>
      </div>
    </div>
    </Fragment>
  )
}
export default CalendarEdit;