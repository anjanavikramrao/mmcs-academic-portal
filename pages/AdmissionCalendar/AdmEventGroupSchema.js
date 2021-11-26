const EventGroupcreation = {

 pages: [
  {
   name: "page1",
   elements: [
    {
     type: "text",
     name: "eg_name",
     title: "Event Group Name",
     hideNumber: true
    },
    {
     type: "dropdown",
     name: "form_name",
     title: "Select Form",
     hideNumber: true,
    choicesByUrl: {
                   url: "https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/form_definition?select=form_name",                   
                   valueName: "form_name",         
               }
    }
   ]
  }
 ]
};
  export default EventGroupcreation;
