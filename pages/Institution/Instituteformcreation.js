import React from "react";
import dynamic from "next/dynamic";
import InstitutecreateJSON from '../../constants/schemas/Instituteschema.json';
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
 const Institutecreate = (props) => {
  const { supabase } = props;
  const [surveyJson, setSurveyJson] = React.useState({});

  const loadSurveyData = async () => {
    const originalJson = {...InstitutecreateJSON};
    const [eduGroups, uniGroups, instiGroups] = await Promise.all([
      supabase.from("education_group").select("educationgroup_name"),
      supabase.from("university").select("name"),
      supabase.from("institution_group").select("institutiongroup_name")
    ]);
    originalJson.pages[0].elements[0].elements[0].choices = eduGroups.data.map(a => a.educationgroup_name);
    originalJson.pages[0].elements[0].elements[2].choices = uniGroups.data.map(a => a.name);
    originalJson.pages[0].elements[0].elements[3].choices = instiGroups.data.map(a => a.institutiongroup_name);
    
    setSurveyJson(originalJson);
  };

  const saveMySurvey = async (data) => {
    let createdata = {institution_name:data.valuesHash.institution_name,education_group:"4",university:"2",institution_group:"4",institutiontype:"1",language:"en01"};
    const {error} = await supabase.from("campusinstitution").insert(createdata);
    if(error) {
      throw error;
    }
  };

  React.useEffect(() => {
    loadSurveyData();
  }, []);

  return (
    <div className="surveyform">
      
      <h3 className="surveyheader">Add Campus Institute</h3>
      <div className="cardsurveyform">
        <Survey
           showCompletedPage={true}
           completeText="Create"
           showNavigationButtons={true}
           onComplete={saveMySurvey}
           data={surveyJson}
           completedHtml ="Campus Institute is Created!!"
          />
      </div>
    </div>
  )
}

export default Institutecreate;
