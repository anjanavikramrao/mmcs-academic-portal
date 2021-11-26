import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { Button } from "primereact/button";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import Educationgroup_creation from '../../constants/schemas/AddEducationgroupschema.json';

const loadSurvey = async (props) => {
  const orginalJson = {...Educationgroup_creation};
  const { supabase } = props;
  let apiResult = await Promise.all([
    await supabase.from("education_group").select("id, educationgroup_name"),
    await supabase.from("language").select("code, description")
  ]);
  let eduGroups = apiResult[0]?.data?.map(data => {
    return {value: data.id, text: data.educationgroup_name};
  });
  let languages = apiResult[1].data.map(data => {
    return {value: data.code, text: data.description};
  });
  orginalJson.pages[0].elements[0].elements[2].choices = eduGroups;
  orginalJson.pages[0].elements[0].elements[4].choices = languages;
  return orginalJson;
};

const Educationgroupformcreation = (props) => {
  const [surveyJson, setSurveyJson] = React.useState({});
  const { supabase } = props;
  React.useEffect(async () => {
    let json = await loadSurvey(props);
    setSurveyJson(json);
  }, []);

  const addData = async (data) => {
    console.log("===educationgroup creation data",data.valuesHash)
    delete data.addresses;
    delete data.valuesHash.pages;
    data.language = data.language || "";
    const {_, error } = await supabase.from("education_group").insert(data.valuesHash);
    console.log(error, "error");
  }

  return (
    <React.Fragment>
      <div className="surveyform">
      <Link href="/EducationGroup/Educationgrouplist">  
             <Button icon="pi pi-angle-double-left" label="Back to list" style = {{color:'#f7b422'}} className="p-button-link" />
          </Link>
        <h3 className="surveyheader">Add Education Group</h3>
        <div className="cardsurveyform">
          <div>
            <Survey
              data={surveyJson}
              showCompletedPage={true}
              completeText="Create"
              showNavigationButtons={true}
              onComplete={addData}
              completedHtml ="Education Group is Created!!"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};
export default Educationgroupformcreation;
