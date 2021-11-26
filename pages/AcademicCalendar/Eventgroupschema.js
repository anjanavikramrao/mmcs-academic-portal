const EventGroupcreation = {

 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "text",
     name: "eventgroup_name",
     title: "Event Group Name",
     hideNumber: true
    },
    {
     type: "dropdown",
     name: "calendar_type",
     title: "Calendar Type",
     hideNumber: true,
     choices: [
      {
       value: "Academic Calendar",
       text: "Academic Calendar"
      },
      {
       value: "Admission Calendar",
       text: "Admission Calendar"
      }
     ]
    }
   ]
  }
 ]
};
  export default EventGroupcreation;
