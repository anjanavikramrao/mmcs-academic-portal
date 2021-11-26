import React from "react";
import * as Survey from "survey-react";
import "survey-react/survey.min.css";
//import 'select2/dist/css/select2.min.css';
import 'select2';
import * as widgets from 'surveyjs-widgets';

Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
  options.request.setRequestHeader("Authorization", "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  options.request.setRequestHeader("apikey", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

const SurveyComponent = (props) => {
  React.useEffect(() => {
    Survey.StylesManager.applyTheme("bootstrap")
    // widgets.select2(Survey);
    // widgets.select2tagbox(Survey);
  }, []);
  const { data, populateData } = props;

  const [survey, setSurvey] = React.useState(new Survey.Model({...data}));

  React.useEffect(() => {
    if(!data) {
      console.log("SurveyJs not yet initialised");
    } else {
      console.log("SurveyJs is initialised");
      if(populateData) {
        for(let i in populateData) {
          survey[i] = populateData[i];
        };
      }
      setSurvey(survey);
    }
  }, [data, populateData]);

  return (
    <div className="surveyform">
      <div className="cardsurveyform">
        <Survey.Survey model={survey} {...props}/>
      </div>
    </div>
  )
};
export default SurveyComponent;