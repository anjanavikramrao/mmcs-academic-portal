import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Rating } from "primereact/rating";
import { Toolbar } from "primereact/toolbar";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { RadioButton } from "primereact/radiobutton";
import { InputNumber } from "primereact/inputnumber";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import axios from "axios";
import * as Survey from "survey-react";
import AddEventSchema from "./AddEventSchema";
import Eventgroupschema from './AdmEventGroupSchema';
import Link from "next/link";
import { Tooltip } from "primereact/tooltip";
import { useRouter } from 'next/router';
import { TabView,TabPanel } from 'primereact/tabview';
import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  CustomInput,
  Collapse,
} from "reactstrap";
const survey = new Survey.Model(AddEventSchema);

function CalendarEvent() {
  let emptyProduct = {
    id: "",
    eventgroupname: "",
    eventname: "",
  };
  const router = useRouter()
    console.log(router.query);

    const [products2, setProducts2] = useState(null);
    const [products3, setProducts3] = useState(null);
    
    
  useEffect(() => {
    const headers = {
      'apikey':process.env.NEXT_PUBLIC_SUPABASE_KEY
  };
    
   let res=  axios.get(process.env.NEXT_PUBLIC_SUPABASE_URL +`assignadmission_calendar?calendarid=eq.` + router.query.id +` &select=*`, { headers })
    .then(res => {
      console.log("Assign calendar",res.data)
    setProducts2(res.data)
})  

let res3=  axios.get(process.env.NEXT_PUBLIC_SUPABASE_URL +`admission_calendar_eventgroup?calendar_id=eq.` + router.query.id +` &select=*`, { headers })
    .then(res3 => {
      console.log("View Forms",res3.data)
    setProducts3(res3.data)
})  


    Survey.StylesManager.applyTheme("bootstrap");
  }, []);

  const [selectedStatus, setSelectedStatus] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [productDialog, setProductDialog] = useState(false);

  const [surveyForm, setsurveyForm] = useState(null);

  const op = useRef(null);
  const toast = useRef(null);
  const dt = useRef(null);



  // const survey = new Survey.Model(AddEventschema);

  Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
    options.request.setRequestHeader("Authorization", "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_KEY);
    options.request.setRequestHeader("apikey", process.env.NEXT_PUBLIC_SUPABASE_KEY);
  };

   const showSticky= () => {
        toast.current.show({severity: 'info', summary: 'Academic Calendar', detail: 'Sent for Approval', sticky: true});
    }

 const saveMySurvey = (data) => {

   console.log("Savedata",data.valuesHash)
  
    // var eventcreationreq={eventname:data.valuesHash.eventname,fromdate:data.valuesHash.fromdate,todate:data.valuesHash.todate,eventduration:data.valuesHash.eventduration}
    let res = axios.post(process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_events", data.valuesHash ,
      {     
        headers: {
           "Prefer" : "return=representation",
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
          Authorization: "Bearer " + process.env.NEXT_PUBLIC_SUPABASE_KEY,
         
        },
        
      }
      
    );
    console.log("responseaxios", res);
    res.then(function (result) {

      let sCalendarid = result.data
      var res_db = {"calendarid": router.query.id};
       let res10= axios.patch(process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_events?id=eq."+sCalendarid[0].id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":process.env.NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+ process.env.NEXT_PUBLIC_SUPABASE_KEY,

   }});
     
       console.log("result----", sCalendarid[0].id);
    });
  };

  const PostCamunda = (data) =>{
     // console.log("====sendfrapproval",products1)
     var res = { currentPageNo: 1, data: {"Calendarid":router.query.id,"Calendartype":router.query.calendartype,"Entity":"University","Year":"2021","Session":"Fall","Calendar":router.query.name}};
  console.log("data", res.data)
    // var eventcreationreq={eventname:data.valuesHash.eventname,fromdate:data.valuesHash.fromdate,todate:data.valuesHash.todate,eventduration:data.valuesHash.eventduration}
    let res2 = axios.post("http://localhost:8082/api/Request", res.data, {
       headers: {
         "Content-Type": "application/json",
       },
       
     });
   // console.log("responseaxios", res);
    // res.then(function (result) {
      
    // });
     showSticky()
  };

    const editProduct = (rowdata) => {
     

        var res = { currentPageNo: 1, data: {"id":rowdata.id,"event_name":rowdata.eventname,"eventgroup_id":rowdata.eventgroupid,
        "description":rowdata.descriptionevent,"referenceevent":rowdata.reference_event,"referencepoint":rowdata.reference_point,
        "offsetdays":rowdata.offset_days,"unit":rowdata.unitevent,"eventduration":rowdata.event_duration,"workingdays":rowdata.working_days,
        "fromdate":rowdata.from_date,
        "todate":rowdata.to_date,"orderevent":rowdata.orderevent}};
     console.log(res.data)
     survey.currentPageNo = res.currentPageNo;
     survey.data = res.data;

     setsurveyForm(<Survey.Survey
      showCompletedPage={false} 
      completeText="Update"
      showNavigationButtons={true}
      onComplete={(data) => {
      editproductdatatable(data);
       hideDialog()}}
      model={survey}
      
    />)
     setProductDialog(true);
    }

     const editproductdatatable = (data) => {
    let _products = [products1];
    let _product = data.valuesHash ;
    const index = findIndexById(data.valuesHash.id);
    _products[index] = _product;
    console.log("responseaxios",data.valuesHash)
    console.log("=====responseput",_product)
    var res_db = {"event_name":_product.event_name,"eventgroup_id":_product.eventgroup_id,"description":_product.description,"referenceevent":_product.referenceevent,"referencepoint":_product.referencepoint,"offsetdays":_product.offsetdays,"unit":_product.unit,"eventduration":_product.eventduration,"workingdays":_product.workingdays,"fromdate":_product.fromdate,"todate":_product.todate,"orderevent":_product.orderevent};
    console.log("=====res_db",res_db)
   let res= axios.patch(process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_events?id=eq."+_product.id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":process.env.NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+process.env.NEXT_PUBLIC_SUPABASE_KEY,

   }});
   setSelectedProducts(_products);  
  
 }

  const actionBodyTemplate = (rowData) => {
    return (
        <React.Fragment>
        {/* <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-text"
        /> */}
         <Link
          href={{
            pathname: "/AdmissionCalendar/EditEvents",
            query: {
              id: rowData.id,
              eventname:rowData.eventname,
              eventgroupid:rowData.eventgroupid,
              descriptionevent:rowData.descriptionevent,
              reference_event : rowData.reference_event,
              reference_point : rowData.reference_point,
              offset_days : rowData.offset_days,
              unitevent : rowData.unitevent,
              event_duration : rowData.event_duration,
              working_days : rowData.working_days,
              from_date : rowData.from_date,
              to_date : rowData.to_date,
              orderevent : rowData.orderevent,
              caledarid : router.query.id
            },
          }}
          >
        <Button
          icon="pi pi-pencil"
         // onClick={() => editProduct(rowData)}
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
         </Link>
      </React.Fragment>
    );
  };

  const actionAssignTemplte = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-text"
        /> */}
        <Button
          icon="pi pi-pencil"
          onClick={() => editAssigncalendar(rowData)}
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
      </React.Fragment>
    );
  };

  const actionviewform = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          onClick={() => editViewCalendar(rowData)}
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
      </React.Fragment>
    );
  };

   const editAssigncalendar = (rowdata) => {  
     var res = { currentPageNo: 1, data: {"id":rowdata.id,"type":rowdata.type,"name":rowdata.name,"description":rowdata.description,"calendarname":router.query.name}};
     const survey = new Survey.Model(AssignAcademiccalendar);
     survey.currentPageNo = res.currentPageNo;
     survey.data = res.data;
     setsurveyForm(<Survey.Survey
      showCompletedPage={false} 
      completeText="Save"
      showNavigationButtons={true}
      onComplete={(data) => {
        editAssigncalendartable(data)
        hideDialog()
        
      }}
      model={survey}
    />)   
    setProductDialog(true);
 }
 const editAssigncalendartable=(data)=>{

    console.log("responseaxios",data.valuesHash)
 
  var res_db = {"name":data.valuesHash.type,"name":data.valuesHash.name,"description":data.valuesHash.description};
    console.log("responseaxios",res_db)
   let res= axios.patch(process.env.NEXT_PUBLIC_SUPABASE_URL +"assignadmission_calendar?id=eq."+data.valuesHash.id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":process.env.NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+process.env.NEXT_PUBLIC_SUPABASE_KEY,

   }});
  console.log("Url",res)
 }

 const editViewCalendar = (rowdata) => {  
     var res = { currentPageNo: 1, data: {"id":rowdata.id,"eg_name":rowdata.name,"form_name":rowdata.formname}};
     const survey = new Survey.Model(Eventgroupschema);
     survey.currentPageNo = res.currentPageNo;
     survey.data = res.data;
     setsurveyForm(<Survey.Survey
      showCompletedPage={false} 
      completeText="Save"
      showNavigationButtons={true}
      onComplete={(data) => {
        editViewCalendardatable(data)
        hideDialog()
        
      }}
      model={survey}
    />)   
    setProductDialog(true);
 }
 const editViewCalendardatable=(data)=>{

    console.log("responseaxios",data.valuesHash)
 
  var res_db = {"eg_name":data.valuesHash.name,"form_name":data.valuesHash.formname};
    console.log("responseaxios",res_db)
   let res= axios.patch(process.env.NEXT_PUBLIC_SUPABASE_URL +"admission_calendar_eventgroup?id=eq."+data.valuesHash.id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":process.env.NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+process.env.NEXT_PUBLIC_SUPABASE_KEY,

   }});
  console.log("Url",res)
 }

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
       
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="p-d-flex">    
          {/* <span className=" p-mr-2 p-d-inline-block p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search Events..."
            />
          </span> */}
          {/* <Button
            icon="pi pi-sliders-h"
            onClick={() => setVisibleRight(true)}
            className="p-button-warning p-mr-2 p-button-outlined"
          /> */}

          {/* <Button
            id="exportbut"
            label="Export"
            icon="pi pi-upload"
            className="p-button-warning p-mr-2 p-button-outlined"
            onClick={exportCSV}
          /> */}
          {/* <Button   Commented by vijeth on 13/09/2021
            label="Create New Event"
            id="createbut"
            onClick={openNew}
            icon="pi pi-plus-circle"
            className="p-button-warning p-mr-2"
          /> */}
          <Link
          href={{
            pathname: "/AdmissionCalendar/CreateEvent",
            query: {
              id: router.query.id
            },
          }}
        >
           <Button
            label="Create New Event"
            id="createbut"
          //  onClick={openNew}
            icon="pi pi-plus-circle"
            className="p-button-warning p-mr-2"
          />
          </Link>
          <Button
            label="Send For Approval"
            id="createbut"
            onClick={PostCamunda}       
            icon="pi pi-check"
            className="p-button-warning"
          />
          {/* </Link> */}
        </div>
      </React.Fragment>
    );
  };

 
  useEffect(() => {

    let initcolumns = [
        { field: "id", header: "id" },
      { field: "eventname", header: "eventname" },
      { field: "eventgroupid", header: "eventgroupid" },
      { field: "descriptionevent", header: "descriptionevent" },
      { field: "reference_event", header:"reference_event" },
      { field: "reference_point", header: "reference_point" },
      { field: "offset_days", header: "offset_days" },
      { field: "unitevent", header: "unitevent" },
      { field: "event_duration", header:"event_duration" },
      { field: "working_days", header: "working_days" },
      { field: "from_date", header:"from_date" },
      { field: "to_date", header: "to_date" },
      { field: "orderevent", header: "orderevent" },
    ];

 let event={value:initcolumns}
    onColumnToggle(event);
  const headers = {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_KEY,
  };
  var reqparam={cal_id: router.query.id}
  axios
  .post(
    process.env.NEXT_PUBLIC_SUPABASE_URL +`rpc/list_of_admission_events`,
    reqparam,
    { headers }
  )
  .then((res) => {
    console.log(res.data);
    setProducts1(res.data);
  
  });
},
   []);

  const columns = [
    { field: "eg_name", header: "Event group Name" },
    { field: "id", header: "Event_ID" },
    { field: "eventname", header: "Event Name" },
    { field: "from_date", header: "Start Date" },
    { field: "to_date", header: "End Date" },
    { field: "event_duration", header: "Duration" },
    { field: "actions", header: "Actions" },

  ];

  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [products1, setProducts1] = useState(null);
  const [expandedRows, setExpandedRows] = useState(null);

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.", e.target);
  }

   const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < products1.length; i++) {
    if (products1[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
};

  const hideDialog = () => {
    setSubmitted(false);
    setProductDialog(false);
  };

  const columnComponents = selectedColumns.map((col) => {
    return <Column key={col.field} field={col.field} header={col.header} />;
  });

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const openNew = () => {
    const survey = new Survey.Model(AddEventSchema);
    setsurveyForm(
      <Survey.Survey
        showCompletedPage={false}
        completeText="Save"
        showNavigationButtons={true}
        onComplete={(data) => {
          saveMySurvey(data);
           hideDialog()
          //hideDialog();
        }}
        model={survey}
      />
    );

    setProducts1(emptyProduct);
    setSubmitted(false);
    setProductDialog(true);
  };

  const onRowGroupExpand = (event) => {
    toast.current.show({ severity: 'info', summary: 'Row Group Expanded', detail: 'Value: ' + event.data.eventgroupname, life: 3000 });
}

const onRowGroupCollapse = (event) => {
    toast.current.show({ severity: 'success', summary: 'Row Group Collapsed', detail: 'Value: ' + event.data.eventgroupname, life: 3000 });
}

const headerTemplate = (data) => {
  return (
      <React.Fragment>

          <span style = {{color:'#0f3866'}} className="image-text">Event Group Name - {data.eventgroupname} </span>
      </React.Fragment>
  );
}
const footerTemplate = (data) => {
  return (
      <React.Fragment>
          
      </React.Fragment>
  );
}

var addMonths = function (params) {
  console.log("params",params)
  if(params.length < 1 || !params[0]) return undefined;
  var res = new Date(params[0]);
  if(params.length < 2) return;
  res.setDate(res.getDate() + params[1]);
  return res;
};

var addDate = function (params) {
   console.log("params",params)
  if(params.length < 1 || !params[0]) return undefined;
  var res = new Date(params[0]);
 // if(params.length < 2) return;

  if (params[2] == 'Days') {
      res.setDate(res.getDate()+params[1]);  
  }
else if(params[2] == 'Months'){
res.setMonth(res.getMonth() + params[1]);
}
  // console.log("getresponse events expression",res.getDate())
  return res;
};
//Register the custom function
Survey
  .FunctionFactory
  .Instance
  .register("addMonths", addMonths); 
  Survey
  .FunctionFactory
  .Instance
  .register("addDate", addDate); 

  
  
  return (

    <div className="datatable-filter-demo">
    <div>
     <Link href="/AdmissionCalendar/Admissioncalendarlist">  
     <Button icon="pi pi-angle-double-left" label="back to list" style = {{color:'#f7b422'}} className="p-button-link" />
     </Link></div>
      <Tooltip target=".export-buttons>button" position="bottom" />
      <Toolbar
        className="p-mb-4"
        id="tool"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <Toast ref={toast} />
      <Card className="main-card mb-3" id="calendarcard">
          <Row className="no-gutters">
            <Col>
              <div className="widget-content">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="widget-subheading">{router.query.name}</div>
                    <p className="paragraphdescription">{router.query.calendartype}</p>
                    <p className="paragraphdescription">{router.query.calendardescription}</p>
                  </div>
                </div>
              </div>
            </Col>
            </Row>
            </Card>

                 {/* <Card className="main-card mb-3" id="Senback">
          <Row className="no-gutters">
            <Col>
              <div className="widget-content">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <p className="paragraphdescription" style={{color: 'red'}} >Sent back for some changes</p>
                    <p className="paragraphdescription">{router.query.sentbackremarks}</p>
                  </div>
                </div>
              </div>
            </Col>
            </Row>
            </Card> */}

      <div className="datatablecard">
      <TabView>
      <TabPanel header="Events">
        <DataTable
          // className="p-datatable-gridlines"
          value={products1}
          ref={dt}
          globalFilter={globalFilter}
          dataKey="id"
          selectionMode="single"
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          expandedRows={expandedRows}
          onRowToggle={(e) => setExpandedRows(e.data)}
          rowGroupHeaderTemplate={headerTemplate} rowGroupFooterTemplate={footerTemplate}
           rowGroupMode="subheader" groupField="eventgroupname" sortMode="single" sortField="eventgroupname" sortOrder={1}

            
                    expandableRowGroups 
                    onRowExpand={onRowGroupExpand} onRowCollapse={onRowGroupCollapse}
        >
       
          {/* <Column expander style={{ width: "4em" }} /> */}
       
                    <Column field="id" header="Event Id"></Column>
                    <Column field="eventname" header="Event Name"></Column>
                    <Column field="from_date" header="Start Date"></Column>
                    <Column field="to_date" header="End Date" ></Column>
                    <Column field="event_duration" header="Duration" ></Column>
                    <Column field="action" header="Actions" body={actionBodyTemplate}></Column>
        </DataTable>
         </TabPanel>
      
        <TabPanel header="Assigned to">
        <DataTable ref={dt} value={products2} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} events"
                    globalFilter={globalFilter}
                    >

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="type" header="Enterprise stucture" sortable></Column>
                    <Column field="name" header="Enterprise name" ></Column>
                    <Column field="description" header="Description" ></Column>
                    <Column field="status" header="status" ></Column>
                    <Column field="action" header="Actions" body={actionAssignTemplte}></Column>
                </DataTable>
    </TabPanel>
    <TabPanel header="View Form">
        <DataTable ref={dt} value={products3} selection={selectedProducts} onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} events"
                    globalFilter={globalFilter}
                    >

                    {/* <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column> */}
                    <Column field="id" header="ID" sortable></Column>
                    <Column field="eg_name" header="Event Group" sortable></Column>
                    <Column field="calendar_type" header="Calendar" ></Column>
                    <Column field="form_name" header="Form name" ></Column>
                    <Column field="status" header="status" ></Column>
                    <Column field="action" header="Actions" body={actionviewform}></Column>
                </DataTable>
    </TabPanel>
      </TabView>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "800px" }}
        header="Assign calendar"
        modal
        className="p-fluid"
        onHide={hideDialog}
      >
        {surveyForm}
      </Dialog>
    </div>
  );
}

export default CalendarEvent;
