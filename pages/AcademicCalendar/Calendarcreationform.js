import React from "react";
import dynamic from "next/dynamic";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import Academiccalendar from "../../constants/schemas/AddAcademiccalendarformschema.json";

const Calendarcreationform = (props) => {
  const { supabase } = props;
  const [surveyJson, setSurveyJson] = React.useState({});

  React.useEffect(() => {
    const originalJson = {...Academiccalendar};
    setSurveyJson(originalJson);
  }, []);

  const saveMySurvey = async (data) => {
    const {error} = await supabase.from("academiccalendar").insert(data.valuesHash);
    if(error) {
      throw error;
    }
  };

  return (
    <React.Fragment>
      <div className="surveyform">
        
        <h3 className="surveyheader">Add Academic Calendar</h3>
        <div className="cardsurveyform">
          <div>
          
            <Survey
              showCompletedPage={true}
              completeText="Create"
              showNavigationButtons={true}
              onComplete={saveMySurvey}
              data={surveyJson}
              completedHtml ="Academic Calendar is Created!!"
            />
            
          </div>
        </div>
      </div>
    </React.Fragment>
  )
};
export default Calendarcreationform;
