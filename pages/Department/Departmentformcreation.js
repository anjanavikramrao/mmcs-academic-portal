import React from "react";
import dynamic from "next/dynamic";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import Departmentcreation from '../../constants/schemas/Departmentschema.json';
const Departmentformcreation = (props) => {
  const { supabase } = props;
  const [surveyJson, setSurveyJson] = React.useState({});

  const loadSurveyData = async () => {
    const originalJson = {...Departmentcreation};
    const [eduGroups, uniGroups, campusInstiGroups] = await Promise.all([
      supabase.from("education_group").select("educationgroup_name"),
      supabase.from("university").select("name"),
      supabase.from("campusinstitution").select("institution_name")
    ]);
    originalJson.pages[0].elements[0].choices = eduGroups.data.map(a => a.educationgroup_name);
    originalJson.pages[0].elements[2].choices = uniGroups.data.map(a => a.name);
    originalJson.pages[0].elements[3].choices = campusInstiGroups.data.map(a => a.institution_name);
    setSurveyJson(originalJson);
  };

  React.useEffect(() => {
    loadSurveyData();
  }, []);

  const saveMySurvey = async (data) => {
    let createdata = {department_name:data.valuesHash.department_name,education_group:"4",university:"2",institution:"1",campusinstitution:"1",language:"en01"}
    const {error} = await supabase.from("department").insert(createdata);
    if(error) {
      throw error;
    }
  };

  return (
  <div className="surveyform">
      
    <h3 className="surveyheader">Add Department</h3>
    <div className="cardsurveyform">
      <div>
        <h4 className="surveytitle">Basic Details</h4> 
        <Survey
           showCompletedPage={true}
          completeText="Create"
          showNavigationButtons={true}
          onComplete={saveMySurvey}
          data={surveyJson}
          completedHtml ="Department is Created!!"
        />
      </div>
    </div>
  </div>
  )
}

export default Departmentformcreation;