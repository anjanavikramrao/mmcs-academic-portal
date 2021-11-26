import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";
import { Toolbar } from "primereact/toolbar";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import dynamic from "next/dynamic";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import AddEventSchema from "../../constants/schemas/AddEventSchema.json";
import { Tooltip } from "primereact/tooltip";
import { useRouter } from 'next/router';
import { Card, Col, Row } from "reactstrap";
import { isEmptyObject } from "jquery";

function CalendarEvent() {
  let emptyProduct = {
    id: "",
    eventgroupname: "",
    eventname: "",
  };
  const router = useRouter();

  const [surveyJson, setSurveyJson] = React.useState({});
  const [populateData, setPopulateData] = React.useState({});
  const [visibleRight, setVisibleRight] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    const originalJson = {...AddEventSchema};
    setSurveyJson(originalJson);
  }, []);

    const editProduct = (rowdata) => {
    const res = {
      currentPageNo: 1,
      data: {
          "id": rowdata.id,
          "event_name": rowdata.eventname,
          "eventgroup_id": rowdata.eventgroupid,
          "description": rowdata.descriptionevent,
          "referenceevent": rowdata.reference_event,
          "referencepoint": rowdata.reference_point,
          "offsetdays": rowdata.offset_days,
          "unit": rowdata.unitevent,
          "eventduration": rowdata.event_duration,
          "workingdays": rowdata.working_days,
          "fromdate": rowdata.from_date,
          "todate": rowdata.to_date,
          "orderevent": rowdata.orderevent
      }
    };
    setPopulateData({
      currentPageNo: res.currentPageNo,
      data: {...res.data}
    });
     setProductDialog(true);
    }

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-eye"
          className="p-button-rounded p-button-info p-button-text"
        />
        <Button
          icon="pi pi-pencil"
          onClick={() => editProduct(rowData)}
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
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
        <div className="p-d-flex">
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
            icon="pi pi-check"
            onClick={sendforapproval}
            className="p-button-warning"
          />
        </div>
      </React.Fragment>
    );
  };

  const onSubmitSurvey = async (data) => {
    if (isEmptyObject(populateData)) {
      // saveSurvey
      const {error} = await supabase.from("events").insert(data.valuesHash);
      if(error) {
        throw error;
      }
    } else {
      // edit
      let _products = [products];
      let _product = data.valuesHash ;
      const index = findIndexById(data.valuesHash.id);
      _products[index] = _product;
      const dataSend = {
        "event_name": _product.event_name,
        "eventgroup_id": _product.eventgroup_id,
        "description": _product.description,
        "referenceevent": _product.referenceevent,
        "referencepoint": _product.referencepoint,
        "offsetdays": _product.offsetdays,
        "unit": _product.unit,
        "eventduration": _product.eventduration,
        "workingdays": _product.workingdays,
        "fromdate": _product.fromdate,
        "todate": _product.todate,
        "orderevent": _product.orderevent
      };
      const {data, error} = await supabase.from("events").update(dataSend).eq("id", _product.id);
      if(error) {
        throw error;
      }
      setSelectedProducts(_products);  
    }
  }

  const getProducts = async () => {
    const { data, error } = await supabase.from("list_of_events").select({cal_id: router.query.id});
    if(error) {
      throw error;
    }
    setProducts(data);
  }
 
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
  getProducts();
}, []);

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
  const [products, setProducts] = useState(null);
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
  for (let i = 0; i < products.length; i++) {
    if (products[i].id === id) {
      index = i;
      break;
    }
  }
  return index;
};

  const exportCSV = () => {
    dt.current.exportCSV();
  };
const sendforapproval=()=>{
  console.log("====sendfrapproval",products)
  
}
  const openNew = () => { 
    setPopulateData({});
    setProducts(emptyProduct);
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
          value={products}
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
                    <Column field="action" header="Actions" body={actionBodyTemplate}></Column>
        </DataTable>
      </div>

      <Dialog
        visible={productDialog}
        style={{ width: "800px" }}
        header="Add/Edit Event"
        modal
        className="p-fluid"
        onHide={() => setProductDialog(false)}
      >
        <Survey
          showCompletedPage={false} 
          completeText="Update"
          showNavigationButtons={true}
          onComplete={onSubmitSurvey}
          data={surveyJson}
          populateData={populateData}
        />
      </Dialog>
    </div>
  );
}

export default CalendarEvent;
