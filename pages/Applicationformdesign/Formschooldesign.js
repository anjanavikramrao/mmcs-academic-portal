import React from "react";
import surveyJson from "../../constants/schemas/Formschoolschema.json";
import dynamic from "next/dynamic";

const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});

export default function Formexecutiveprogram () {
  return (
    <div className="surveyform">
      <h3 className="surveyheader">School Of Design</h3>
      <div className="card">
        <Survey
            showCompletedPage={true}
            completeText="Create"
            showNavigationButtons={true}
            onComplete={(data) => console.log(data.valuesHash)}
            data={surveyJson}
          />
      </div>
  </div>
  )
}
