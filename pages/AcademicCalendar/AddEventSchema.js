const AddEventcreation = {
  pages: [
    {
     name: "Event",
     elements: [
      {
        type: "dropdown",
        name: "eventgroup_id",
        title: "Event Group",
        hideNumber: true,
        choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/event_group",                   
                   valueName: "id",
                   titleName:"eventgroup_name",
                  
               }
       },
      {
       type: "text",
       name: "orderevent",
       startWithNewLine: false,
       title: "Order",
       hideNumber: true
      },
      {
       type: "text",
       name: "event_name",
       startWithNewLine: false,
       title: "Event Name",
       hideNumber: true
      },
      {
       type: "comment",
       name: "description",
       title: "Description",
       hideNumber: true,
       startWithNewLine: true,
      },
      {
       type: "dropdown",
       name: "referenceevent",
       title: "Reference Event",
       hideNumber: true,
       startWithNewLine: true,
      choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/academic_calendar_events",                   
                   valueName: "id",
                   titleName:"event_name",
                  
               }
      },
      {
       type: "dropdown",
       name: "referencepoint",
       startWithNewLine: false,
       title: "Reference Point",
       hideNumber: true,
       choices: [
        {
          value: "2021-08-21",
          text: "End Date"
         },
         {
          value: "2021-08-25",
          text: "Start Date"
         },
       ]
      },
      {
       type: "text",
       name: "offsetdays",
       title: "Offset",
       hideNumber: true,
       inputType: "number",
       startWithNewLine: true,
      },
      {
       type: "dropdown",
       name: "unit",
       startWithNewLine: false,
       title: "Unit",
       hideNumber: true,
       choices: [
        {
         value: "Days",
         text: "Days"
        },
        {
         value: "Week",
         text: "Week"
        },
        {
          value: "Months",
          text: "Months"
         }
       ]
      },
      {
       type: "text",
       name: "eventduration",
       title: "Event Duration (in days)",
       hideNumber: true,
       inputType: "number",
       startWithNewLine: true,
      },
      {
       type: "checkbox",
       name: "workingdays",
       startWithNewLine: false,
       title: ".",
       titleLocation: "top",
       hideNumber: true,
       choices: [
        {
         value: "Take only working days",
         text: "Take only working days"
        }
       ]
      },
      {
          name: "fromdate",
          type: "expression",
          expression: "addDate({referencepoint}, {offsetdays},{unit})",
          startWithNewLine: true,
          title: "From Date",
          hideNumber: true,
      },
      {
        name: "todate",
        type: "expression",
        expression: "addMonths({fromdate}, {eventduration})",
        startWithNewLine: false,
        title: "To Date",
        hideNumber: true,
      }
     ]
 
  }
 ]
};
  export default AddEventcreation;
