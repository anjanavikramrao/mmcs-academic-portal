const Admissioncalendar ={
  "pages": [
   {
    "name": "page1",
    
      "elements": [     
       {
        "type": "text",
        "name": "name",
        "title": "Calendar Name",
         isRequired:"true",
        "placeHolder": "Placeholder"
       },
       {
        type: "dropdown",
        name: "calendaryear",
        title: "Academic Year",
        startWithNewLine: false,
        choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/calendar_year",                   
                   valueName: "description",
                  
               }
       },
       {
        type: "dropdown",
        name: "calendarsession",
        title: "Academic Session",
        startWithNewLine: false,
        choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/calendar_session",                   
                   valueName: "description",                
               }
       },
       {
        type: "dropdown",
        name: "calendartype",
        title: "Calendar Type",
        startWithNewLine: false,
        choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/calendar_type",                   
                   valueName: "description",                
               }
       },
      {
        type: "tagbox",
        name: "calendaravailablefor",
        title: "Calendar Available For",
        startWithNewLine: false,
        choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/calendar_available",                   
                   valueName: "description",                
               }
       },
      {
        type: "checkbox",
        name: "calendardeviation",
        title: ".",
        startWithNewLine: false,
        //  "titleLocation": "hidden",
        "choices": [
          {
           "value": "item1",
           "text": "Calendar Deviation To Be Recorded?"
          }
         ]
    },
    {
      type: "comment",
      name: "calendardescription",
      title: "Calendar Description",
      startWithNewLine: true,
      //width:"500px",
  },
  {
    type: "comment",
    name: "specialinstructions",
    title: "Special Instructions",
    startWithNewLine: false,
},
        ],
       }
      ],
      "showQuestionNumbers": "off",
 }
  export default Admissioncalendar;
