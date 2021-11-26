const workflowshema = {

 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "text",
     name: "activity_name",
     title: "Process name",
     hideNumber: true
    },
    
    {
     type: "dropdown",
     name: "formdefinition_id",
     title: "Applicable Process Form",
      startWithNewLine: false,
     hideNumber: true,
     choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/form_definition?select=*",                   
                   valueName: "form_id",
                   titleName:"form_name",         
               }
    },
    {
     type: "dropdown",
     name: "workflow_process",
     title: "Select Workflow",
      startWithNewLine: false,
     hideNumber: true,
     choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/workflow_process?select=*",                   
                   valueName: "id",
                    titleName:"workflow_name",         
               }
    },
     {
     type: "imagepicker",
     name: "question5",
     imageFit: "fill",
     imageHeight: 300,
     imageWidth: 600,
     "choices": [
                  {
                    "value": "pace"
                }
            ]
    }
   ]
  }
 ]
};
  export default workflowshema;
