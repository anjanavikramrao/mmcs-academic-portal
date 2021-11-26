const Academiccalendar ={
  "pages": [
   {
    "name": "page1",
    
      "elements": [
        // {
        //   "type": "dropdown",
        //   "name": "university",
        //   "title": "University",
        //   "width":"550px",
        //   "choices": [
        //     {
        //       value: "Manipal Academy Of Higher Education",
        //       text: "Manipal Academy Of Higher Education",
        //     },
        //     {
        //       value: "Manipal University Jaipur",
        //       text: "Manipal University Jaipur",
        //     },
        //     {
        //       value: "Sikkim Manipal University",
        //       text: "Sikkim Manipal University",
        //     },
        //   ]
        //  },
       {
        "type": "text",
        "name": "name",
        "title": "Calendar Name",
        // isRequired:"true",
        "placeHolder": "Placeholder"
       },
       {
        type: "dropdown",
        name: "calendaryear",
        title: "Calendar Year",
        startWithNewLine: false,
        // width:"500px",
        choices: [
          {
            value: "2019",
            text: "2019",
          },
          {
            value: "2020",
            text: "2020",
          },
          {
            value: "2021",
            text: "2021",
          },
        ],
        
      },
       {
        type: "dropdown",
        name: "calendarsession",
        title: "Calendar Session",
        startWithNewLine: false,
        // width:"500px",
        choices: [
          {
            value: "Fall",
            text: "Fall",
          },
          {
            value: "Spring",
            text: "Spring",
          },
          {
            value: "winter",
            text: "winter",
          },
        ],
        
      },
       {
        type: "dropdown",
        name: "calendartype",
        title: "Calendar Type",
        startWithNewLine: false,
        // width:"500px",
        choices: [
          {
            value: "Admission Calendar",
            text: "Admission Calendar",
          },
          {
            value: "Academic Calendar ",
            text: "Academic Calendar ",
          },
          {
            value: "Holiday Calendar ",
            text: "Holiday Calendar ",
          },
        ],
        
      },
      {
        type: "dropdown",
        name: "calendaravailablefor",
        title: "Calendar Available For",
        startWithNewLine: false,
        // width:"500px",
        choices: [
          {
            value: "Staff",
            text: "Staff",
          },
          {
            value: "Public",
            text: "Public",
          },
          {
            value: "Student",
            text: "Student",
          },
        ],
        
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
  export default Academiccalendar;
