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
import Link from "next/link";
import { Tooltip } from "primereact/tooltip";
import { useRouter } from 'next/router';
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
    
    
  useEffect(() => {
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
  var apikey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
  Survey.ChoicesRestfull.onBeforeSendRequest = function (sender, options) {
    options.request.setRequestHeader("Authorization", "Bearer " + apikey);
    options.request.setRequestHeader("apikey", apikey);
  };

 const saveMySurvey = (data) => {
    const NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
   console.log("Savedata",data.valuesHash)

    // var eventcreationreq={eventname:data.valuesHash.eventname,fromdate:data.valuesHash.fromdate,todate:data.valuesHash.todate,eventduration:data.valuesHash.eventduration}
    let res = axios.post("https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/events", data.valuesHash,
      {     
        headers: {
          "Content-Type": "application/json",
          apikey: NEXT_PUBLIC_SUPABASE_KEY,
          Authorization: "Bearer " + NEXT_PUBLIC_SUPABASE_KEY,
        },
        
      }
      
    );
    console.log("responseaxios", res);
    res.then(function (result) {
      // console.log("result----", result.data);
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
    const NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
    console.log("responseaxios",data.valuesHash)
    console.log("=====responseput",_product)
    var res_db = {"event_name":_product.event_name,"eventgroup_id":_product.eventgroup_id,"description":_product.description,"referenceevent":_product.referenceevent,"referencepoint":_product.referencepoint,"offsetdays":_product.offsetdays,"unit":_product.unit,"eventduration":_product.eventduration,"workingdays":_product.workingdays,"fromdate":_product.fromdate,"todate":_product.todate,"orderevent":_product.orderevent};
    console.log("=====res_db",res_db)
   let res= axios.patch("https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/events?id=eq."+_product.id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+NEXT_PUBLIC_SUPABASE_KEY,

   }});
   setSelectedProducts(_products);  
  
 }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-text"
        />
        <Button
          icon="pi pi-pencil"
          onClick={() => editProduct(rowData)}
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        /> */}
      </React.Fragment>
    );
  };

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        {/* <h3 className="p-mr-2 lefttoolbartext">Calendar</h3> */}
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
       <React.Fragment>
        {/* <div className="p-d-flex">
          <span className=" p-mr-2 p-d-inline-block p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search Events..."
            />
          </span>
          <Button
            icon="pi pi-sliders-h"
            onClick={() => setVisibleRight(true)}
            className="p-button-warning p-mr-2 p-button-outlined"
          />

          <Button
            id="exportbut"
            label="Export"
            icon="pi pi-upload"
            className="p-button-warning p-mr-2 p-button-outlined"
            onClick={exportCSV}
          />
          <Button
            label="Create New"
            id="createbut"
            onClick={openNew}
            icon="pi pi-plus-circle"
            className="p-button-warning"
          />
          
          <Button
            label="Send For Approval"
            id="createbut"
            onClick={PostCamunda}
            icon="pi pi-check"
            className="p-button-warning"
          />
        </div> */}
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
 const NEXT_PUBLIC_SUPABASE_KEY =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE";
  const headers = {
    apikey: NEXT_PUBLIC_SUPABASE_KEY,
  };
  var reqparam={cal_id: router.query.id}
  axios
  .post(
    `https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/rpc/list_of_events`,
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
    { field: "eventgroupname", header: "Event group Name" },
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

          <span className="image-text">{data.eventgroupname}</span>
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
      <Tooltip target=".export-buttons>button" position="bottom" />
      
      <Toast ref={toast} />
      <Card className="main-card mb-3" id="calendarcard">
          <Row className="no-gutters">
            <Col>
              <div className="widget-content">
                <div className="widget-content-wrapper">
                  <div className="widget-content-left">
                    <div className="widget-subheading">{router.query.name}</div>
                    <p className="paragraphdescription">{router.query.calendartype}|{router.query.university}</p>
                    <p className="paragraphdescription">{router.query.calendardescription}</p>
                  </div>
                </div>
              </div>
            </Col>
            </Row>
            </Card>
      <div className="datatablecard">
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
       
                    <Column field="id" header="Event_Id"></Column>
                    <Column field="eventname" header="Event Name"></Column>
                    <Column field="from_date" header="From Date"></Column>
                    <Column field="to_date" header="To Date" ></Column>
                    <Column field="event_duration" header="Event Duration" ></Column>
                  
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "800px" }}
        header="Add/Edit Event"
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
