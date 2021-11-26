import React from "react";
import dynamic from "next/dynamic";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import InstitutionGroupCreation from '../../constants/schemas/InstitutionGroupschema.json';

const Institutiongroupcreation = (props) => {
  const { supabase } = props;
  const [surveyJson, setSurveyJson] = React.useState({});

  const loadSurveyData = async () => {
    const originalJson = {...InstitutionGroupCreation}
    const [ eduData, uniData ] = await Promise.all([
      supabase.from("education_group").select(),
      supabase.from("university").select()
    ]);
    if(eduData.error || uniData.error) {
      console.log("Error in fetching data");
    }
    let eduGroups = eduData.data.map(data => {
      return {value: data.id, text: data.educationgroup_name};
    });
    let uniGroups = uniData.data.map(data => {
      return {value: data.id, text: data.name};
    });
    originalJson.pages[0].elements[0].choices = eduGroups;
    originalJson.pages[0].elements[1].choices = uniGroups;
    setSurveyJson(originalJson);
  };

  React.useEffect(() => {
    loadSurveyData();
  }, []);

  const saveMySurvey = async (surveyData) => {
    const createdata = {institutiongroup_name:surveyData.valuesHash.institutiongroup_name,education_group:"4",university:"2",group_type:"1",country_registered:"India",currency:"INR",language:"en01"}
    const {data, error } = await supabase.from("institution_group").insert(createdata);
    if(error) {
      throw error;
    }
  };

  return (
  <div className="surveyform">
      
      <h3 className="surveyheader">Add Institution Group</h3>
      <div className="cardsurveyform">
        <div>
           <h4 className="surveytitle">Basic Details</h4> 
          <Survey
            showCompletedPage={true}
            completeText="Create"
            showNavigationButtons={true}
            onComplete={saveMySurvey}
            data={surveyJson}
            completedHtml ="Institution Group is Created!!"
          />
        </div>
      </div>
    </div>
  )
}

export default Institutiongroupcreation;
