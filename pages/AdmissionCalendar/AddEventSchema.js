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
                  valueName: "id",
                  titleName:"eg_name",
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
          value:1,
          text: "End Date"
         },
         {
           value:2,
          text: "Start Date"
         },
       ]
      },
      {
       type: "text",
       name: "eventdate",
       startWithNewLine: false,
       "readOnly": true,
       title: "Event date",    
       hideNumber: true
      },
      {
       type: "text",
       name: "offsetdays",
       "visibleIf": "{referenceevent} notempty",
       title: "Offset",
       hideNumber: true,
       inputType: "number",
       startWithNewLine: true,
      },
      {
       type: "dropdown",
       name: "unit",
       "visibleIf": "{referenceevent} notempty",
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
       "visibleIf": "{referenceevent} notempty",
       title: "Event Duration (in days)",
       hideNumber: true,
       inputType: "number",
       startWithNewLine: true,
      },
      {
       type: "checkbox",
       name: "workingdays",
       "visibleIf": "{referenceevent} notempty",
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
      type : "text",
      name : "startdate",
       "visibleIf": "{referenceevent} empty",
      startWithNewLine : true,
      hideNumber : true,
      title : "Start Date",
      inputType : "date"
    },
    {
      type : "text",
      name : "enddate",
       "visibleIf": "{referenceevent} empty",
      startWithNewLine : false,
      title : "End date",
      hideNumber : true,
      inputType : "date"
    },
      {
          name: "fromdate",
          type: "expression",
          "visibleIf": "{referenceevent} notempty",
          expression: "addDate({eventdate}, {offsetdays},{unit})",
          startWithNewLine: true,
          title: "From Date",
          hideNumber: true,
      },
      {
        name: "todate",
        type: "expression",
        "visibleIf": "{referenceevent} notempty",
        expression: "addMonths({fromdate}, {eventduration})",
        startWithNewLine: false,
        title: "To Date",
        hideNumber: true,
      },
      
     ]
 
  }
 ]
};
  export default AddEventcreation;
