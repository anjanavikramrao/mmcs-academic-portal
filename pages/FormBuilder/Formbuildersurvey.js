import React from "react";

import * as SurveyJSCreator from "survey-creator";

import dynamic from "next/dynamic";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});

import { Dialog } from 'primereact/dialog';

const SurveyCreatorcomponent = (props) => {
    const [displayBasic, setDisplayBasic] = React.useState(false);
    const surveyJSON = {
        "pages": [
          {
            "name": "page1",
            "elements": [
              {
                "type": "text",
                "name": "form_id",
                "title": "Form ID",
                "hideNumber": true
              },
              {
                "type": "text",
                "name": "form_name",
                "title": "Form Name",
                "hideNumber": true,
                startWithNewLine: false,
              },
              {
                "type": "comment",
                "name": "description",
                "title": "Form Description",
                "hideNumber": true
              },
              {
                "type": "text",
                "name": "created_by",
                "title": "Created By",
                "hideNumber": true
              },
              {
                "type": "text",
                "name": "version",
                "title": "Version",
                "hideNumber": true,
                startWithNewLine: false,
              }
            ]
          }
        ]
    };
    let surveyCreator;

    React.useEffect(() => {
        SurveyJSCreator.localization.getLocale("").ed.designer = "Form Builder";
        SurveyJSCreator.localization.getLocale("").ed.testSurvey = "Preview Form";
        SurveyJSCreator.localization.getLocale("").ed.settings = "Form Settings";
        SurveyJSCreator.localization.getLocale("").ed.saveSurvey = "Save Form";

        let options = {
            showEmbededSurveyTab: false,
            showMyCustomTab: false
        };
        surveyCreator = new SurveyJSCreator.SurveyCreator(null, options);
        surveyCreator.saveSurveyFunc = () => setDisplayBasic(true);
        surveyCreator.placeholderHtml = `
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center;">
                <div style="font-size: 20px; max-width: 210px;">
                    Drag and drop a field to start designing your form
                </div>
            </div>
        `;
        surveyCreator.render("surveyCreatorContainer");
    }, []);

    const saveMyDialog = (data) => {
        setDisplayBasic(false);
        const form_data = {
            "additional_detail":data.valuesHash,
            "form_schema":surveyCreator.JSON
          }
        console.log("form data", form_data);
    };
    return (
        <div>
          <div className="surveyform">
            <h3 className="surveyheader">Form Builder</h3>
            <div id="surveyCreatorContainer" />
          </div>
          <Dialog header="Form Details" visible={displayBasic} style={{ width: '50vw' }} onHide={() => setDisplayBasic(false)}>
            <div className="surveyform">
              <Survey
                showCompletedPage={false}
                completeText="Create Form"
                showNavigationButtons={true}
                onComplete={saveMyDialog}
                data={surveyJSON}
              />
            </div>
          </Dialog>
  
        </div>
  
      );
};
export default SurveyCreatorcomponent;
