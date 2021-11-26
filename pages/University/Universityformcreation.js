import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "primereact/button";
import UniversitycreationJSON from "../../constants/schemas/Universitycreationschema.json";

const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});

const Universityformcreation = (props) => {
  const { supabase } = props;
  const [surveyJson, setSurvey] = React.useState({});

  const loadSurveyData = async () => {
    const orginalJson = {...UniversitycreationJSON};
    const {data, error }= await supabase.from("education_group").select("id, educationgroup_name");
    if(error) {
      console.log("Error in loading survey API");
    }
    let eduGroups = data.map(data => {
      return {value: data.id, text: data.educationgroup_name};
    });
    orginalJson.pages[0].elements[0].elements[0].choices = eduGroups;
    setSurvey(orginalJson);
  };

  React.useEffect(() => {
    loadSurveyData();
  }, []);

  const saveMySurvey = async (data) => {
    {console.log("university data insert",data.valuesHash)}
    delete data.valuesHash.pages;
    const {_, error} = await supabase.from("university").insert(data.valuesHash);
    if(error) {
      throw error;
    };
  };

  return (
    <React.Fragment>
       <div className="surveyform">
       <Link href="/University/Universitylist">  
             <Button icon="pi pi-angle-double-left" label="Back to list" style = {{color:'#f7b422'}} className="p-button-link" />
          </Link>
          <h3 className="surveyheader">Add University</h3>
          <div className="cardsurveyform">
            <Survey
              showCompletedPage={true}
              completeText="Create"
              showNavigationButtons={true}
              onComplete={(data) =>saveMySurvey(data)}
              data={surveyJson}
              completedHtml ="University is Created!!"
            />
          </div>
        </div>
    </React.Fragment>
  )
}

export default Universityformcreation;