const AssignAcademiccalendar ={
  "pages": [
   {
    "name": "page1",
    
      "elements": [  
        {
     "type": "text",
     "name": "calendarname",
     "title": "Calendar name",
      "isRequired": true,
     "readOnly": true
    },
    
       {
        type: "dropdown",
        name: "type",
        title: "Select Type",
         "isRequired": true,
        startWithNewLine: false,
        choices: [
          {
            value: "university",
            text: "University",
          },
          {
            value: "institution_group",
            text: "Institution group",
          },
        ],
        
      },
       {
          type: "dropdown",
          name: "name",       
          title: "Name",         
          isRequired:"true",
          choicesByUrl: {
                url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/{type}?select=*",
                   valueName: "name",
                   titleName :"id",
                  
            }
       },
      
        // {
        //   type: "dropdown",
        //   name: "name",         
        //   title: "Institution",         
        //   "visible": false,
        //   visibleIf: "{type}='institution'",
        //   isRequired:"true",
        //   choices: [
        //     {
        //       value: "KMC Manipal",
        //       text: "KMC Manipal",
        //     },
        //     {
        //       value: "KMC Mangalore",
        //       text: "KMC Mangalore",
        //     },
        //     {
        //       value: "SORM Bangalore",
        //       text: "SORM Bangalore",
        //     },
        //   ],
        // },
       
    {
      type: "comment",
      name: "description",
      title: "Description",
       "isRequired": true,
      startWithNewLine: true,
      
  },
        ],
       }
      ],
      "showQuestionNumbers": "off",
 }
  export default AssignAcademiccalendar;
