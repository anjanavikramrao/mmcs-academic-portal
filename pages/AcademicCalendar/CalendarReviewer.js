import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { FileUpload } from "primereact/fileupload";
import React, { useRef, useState,useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
import { Tooltip } from "primereact/tooltip";
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from 'primereact/dialog';
import { InputTextarea } from 'primereact/inputtextarea';
import * as Survey from "survey-react";
import axios from "axios";
import { Toast } from "primereact/toast";

import Academiccalendar from './AddAcademiccalendarformschema';


function CalendarReviewer() {

  const [globalFilter, setGlobalFilter] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [displayBasic, setDisplayBasic] = useState(false);
  const [displayBasicApprove, setDisplayBasicApprove] = useState(false);
  const [productDialog, setProductDialog] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [surveyForm, setsurveyForm] = useState(null);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const op = useRef(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    Survey
    .StylesManager
    .applyTheme("bootstrap");
  }, []);

  const onBasicUpload = () => {
    toast.current.show({severity: 'info', summary: 'Success', detail: 'File Uploaded'});
}

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3 className="p-mr-2 lefttoolbartext">Manage Academic and Other Calendars</h3>
      </React.Fragment>
    );
  };

   const showApproval= () => {
        toast.current.show({severity: 'info', summary: 'Academic Calendar', detail: 'Approved', sticky: true});
    }
 const showRejected= () => {
        toast.current.show({severity: 'info', summary: 'Academic Calendar', detail: 'Sent babk!!!!!', sticky: true});
    }

  const renderFooter = (name) => {
    return (
        <div>
            <Button label="Send Back" icon="pi pi-check" onClick={() => SentbackWorkflow()} autoFocus className="p-button-warning" />
            <Button label="Discard" icon="pi pi-times" onClick={() => onHide(name)} className="p-button-danger" />
        </div>
    );
}
 const renderFooterApprove = (name) => {
    return (
        <div>
            <Button label="Approve" icon="pi pi-check" onClick={() => ApproveWorkflow()} autoFocus className="p-button-success" />
            <Button label="Discard" icon="pi pi-times" onClick={() => onHideApprove(name)} className="p-button-danger" />
        </div>
    );
}
  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="p-d-flex">
          <span className=" p-mr-2 p-d-inline-block p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              onInput={(e) => setGlobalFilter(e.target.value)}
              placeholder="Search Calendar..."
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
          <Link href="/AcademicCalendar/Calendarcreationform">
            <Button
              label="Create New"
              id="createbut"
              icon="pi pi-plus-circle"
              className="p-button-warning"
            />
          </Link>
        </div>
      </React.Fragment>
    );
  };
const ApproveWorkflow = () =>{
  let _products = [...Educationgroupdata];
  console.log("Approve", _products[0].id);
     var res = { currentPageNo: 1, data: {"Id":_products[0].id,"ProID":_products[0].processid,"Status":"Approved","sentbackremarks":value2}};
     console.log("====no",res.data)
  
    let res2 = axios.post("http://localhost:8082/api/Request/usertask", res.data, {
       headers: {
         "Content-Type": "application/json",
       },
       
     });
   showApproval()
  };
  const SentbackWorkflow = () =>{
  let _products = [...Educationgroupdata];
  console.log("Approve", _products[0].id);
     var res = { currentPageNo: 1, data: {"Id":_products[0].id,"ProID":_products[0].processid,"Status":"Rejected","sentbackremarks":value1}};
     console.log("====no",res.data)
  
    let res2 = axios.post("http://localhost:8082/api/Request/usertask", res.data, {
       headers: {
         "Content-Type": "application/json",
       },
       
     });
   console.log("====no",value1)
   showRejected()
  };
 

 const editproductdatatable=(data)=>{
    let _products = [...Educationgroupdata];
    let _product = data.valuesHash ;
    const index = findIndexById(data.valuesHash.id);
    _products[index] = _product;
    const NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNTQwMzY0NSwiZXhwIjoxOTQwOTc5NjQ1fQ.UVG6Xn9APNtBDd2GS9KSbbpklxal_9K0p-LvsgomV9M"
    console.log("responseaxios",data.valuesHash)
    console.log("=====responseput",_product)
    var res_db = { "university":_product.university,"name":_product.name,"calendartype":_product.calendartype,"calendaravailablefor":_product.calendaravailablefor,"calendardeviation":_product.calendardeviation,"calendardescription":_product.calendardescription,"specialinstructions":_product.specialinstructions};
    console.log("=====res_db",res_db)
   let res= axios.patch("https://jyqfgrbqtrnhnmpzbnfx.supabase.co/rest/v1/academiccalendar?id=eq."+_product.id,res_db, {
      headers: {
        "Content-Type": "application/json",
        "apikey":NEXT_PUBLIC_SUPABASE_KEY,
        "Authorization":'Bearer '+NEXT_PUBLIC_SUPABASE_KEY,

   }});
   setEducationgroup(_products);  
  
 }
   const editProduct = (rowdata) => {  
     //here we will collect row data
     var res = { currentPageNo: 1, data: {"id":rowdata.id,"university":rowdata.university,"name":rowdata.name,"calendartype":rowdata.calendartype,"calendaravailablefor":rowdata.calendaravailablefor,"calendardeviation":rowdata.calendardeviation,"calendardescription":rowdata.calendardescription,"specialinstructions":rowdata.specialinstructions}};
     const survey = new Survey.Model(Academiccalendar);
     survey.currentPageNo = res.currentPageNo;
     survey.data = res.data;
     setsurveyForm(<Survey.Survey
      showCompletedPage={false} 
      completeText="Save"
      showNavigationButtons={true}
      onComplete={(data) => {
        editproductdatatable(data)
        hideDialog()
      }}
      model={survey}
    />)
     setProductDialog(true); 
 }
 const findIndexById = (id) => {
  let index = -1;
  for (let i = 0; i < Educationgroupdata.length; i++) {
    if (Educationgroupdata[i].id === id) {
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
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
       <Link
          href={{
            pathname: "/AcademicCalendar/CalendarView",
            query: {
              id: rowData.id,
              name:rowData.name,
              calendardescription:rowData.calendardescription,
              calendartype:rowData.calendartype,
              university:rowData.university
            },
          }}
        >
          <Button
            icon="pi pi-eye" label="View"
            className="p-button-rounded p-button-info p-button-text"
          />
        </Link>

        <Button
          icon="pi pi-check" label="Approve"
       //   onClick={() => PostCamunda(rowData)}
       //   className="p-button-rounded p-button-info p-button-text"
        icon="pi pi-check" onClick={() => onClickApprove('displayBasicApprove')}
          className="p-button-rounded p-button-success p-button-text "
        />
        <Button
          icon="pi pi-times" label="Send Back"
          icon="pi pi-external-link" onClick={() => onClick('displayBasic')}
          className="p-button-rounded p-button-warning p-button-text p-mr-2"
        />
      </React.Fragment>
    );
  };
  const dialogFuncMap = {
    'displayBasic': setDisplayBasic,
    
}
  const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
        setPosition(position);
    }
}
const onHide = (name) => {
  dialogFuncMap[`${name}`](false);
}

  const dialogFuncMapApprove = {
    'displayBasicApprove': setDisplayBasicApprove,
    
}
  const onClickApprove = (name, position) => {
    dialogFuncMapApprove[`${name}`](true);

    if (position) {
        setPositionApprove(position);
    }
}
const onHideApprove = (name) => {
  dialogFuncMapApprove[`${name}`](false);
}

  const columns = [
    { field: "id", header: "Calendar ID" },
    { field: "name", header: "Academic Calendar Name" },
    { field: "calendartype", header: "Calendar Type" },
    { field: "calendaryear", header: "Calendar Year" },
    { field: "calendarsession", header: "Calendar Session" },
    { field: "approver", header: "Approver" },
    // { field: "noofevents", header:"No. Of Events" },
    { field: "createdby",  header: "Created By" },
    // { field: "status", header: "Status" },
    { field: "actions", header: "Action" },
  ];

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const exportPdf = () => {
    import("jspdf").then((jsPDF) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF.default(0, 0);
        doc.autoTable(columnComponents, Educationgroupdata);
        doc.save("products.pdf");
      });
    });
  };

  const [selectedColumns, setSelectedColumns] = useState(columns);
  
  const [Educationgroupdata, setEducationgroup] = useState(null);
 
  useEffect(() => {
    let initcolumns = [
      { field: "id", header: "Calendar ID" },
      { field: "name", header: "Academic Calendar Name" },
      { field: "calendartype", header: "Calndar Type" },
      { field: "university", header: "University" },
      { field: "noofevents", header:"No. Of Events" },
      { field: "createdby", header: "Created By" },
      { field: "calendaravailablefor", header: "Calendar Available For" },
      { field: "holidaycalendar", header: "Holiday Calendar" },
      { field: "calendardeviation", header:"Calendar Deviation" },
      { field: "calendardescription", header: "Calendar Description" },
      { field: "specialinstructions", header:"Special Instructions" },
       { field: "calendaryear", header: "Calendar Year" },
      { field: "calendarsession", header: "Calendar Session" },
     { field: "approver", header: "Approver" },
      { field: "status", header: "Status" },
      { field: "actions", header: "Action" },
    ];
    let event={value:initcolumns}
    onColumnToggle(event);
    const NEXT_PUBLIC_SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODIzMTAwNywiZXhwIjoxOTQzODA3MDA3fQ.-NPAlkkmwzJhMsp2n60L7dYp0-4r1MvTsqomWQupMXE"
    const headers = {
      'apikey':NEXT_PUBLIC_SUPABASE_KEY
  };
    
    axios.get(`https://awzskdvknmpuuhxditwu.supabase.co/rest/v1/academiccalendar?status=eq.Review&select=*`, { headers })
    .then(res => {
    setEducationgroup(res.data)
})  
  
        /*  axios.get(`http://localhost:8000/geteducationgroup`)
        .then(res => {
        setEducationgroup(res.data)
   })   */
  }, []);
  
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    console.log("selectedColumns edit:: ->",selectedColumns)
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };
  function handleClick(e) {
    e.preventDefault();
    console.log("The link was clicked.", e.target);
  }

  const columnComponents = selectedColumns.map((col) => {
    if (col.field === "actions")
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={actionBodyTemplate}
          // style={{ width: "8em" }}
          style={{ width: "15%" }}
        />
      );
      if (col.field === "id")
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          //headerStyle={{ width: '250px' }}
          style={{ width: "10%" }}
          
        />
      );
      if (col.field === "educationgroup_name")
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          //headerStyle={{ width: '250px' }}
          style={{ width: "25%" }}
          sortable
        />
      );
      if (col.field === "abbreviation")
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
         
          style={{ width: "10%" }}
        />
      );
      if (col.field === "email")
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
         
          //style={{ width: "20%" }}
        />
      );
      if (col.field === "website")
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
         
          //style={{ width: "20%" }}
        />
      );
      if (col.field === "primarycontactno")
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
         
          //style={{ width: "20%" }}
        />
      );
    return (
      <Column key={col.field} field={col.field} header={col.header}  /* style={{ width: "10%" }} */ />
    );
  });

 

  return (
    <div className="datatable-crud-demo">
      <Tooltip target=".export-buttons>button" position="bottom" />
<Toast ref={toast} />
      <Toolbar
        className="p-mb-4"
        id="tool"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <div className="datatablecard">
        <DataTable
          value={Educationgroupdata}
          ref={dt}
          //className="p-datatable-gridlines"
          globalFilter={globalFilter}
          dataKey="id"
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
          rows={10}
          rowsPerPageOptions={[10, 20, 50]}
         sortMode="multiple"
         scrollable
          scrollHeight="500px" 
          resizableColumns
          columnResizeMode="fit"
        >
         {/*  <Column
            selectionMode="single"
            headerStyle={{ width: "3em" }}
          ></Column> */}
          {columnComponents}
        </DataTable>
      </div>

      <Dialog visible={productDialog}  style={{ width: '80vw' }}header="Edit Educationgroup" modal className="p-fluid"  onHide={hideDialog}>
        {surveyForm}
      
        </Dialog>
      <div>
        <Sidebar
        className="sidebarprime"
          visible={visibleRight}
          //baseZIndex="!important"
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <h2 style={{ fontWeight: "normal" }}>Column Selection</h2>
          <MultiSelect
            value={selectedColumns}
            options={columns}
            //baseZIndex="!important"
            optionLabel="header"
            onChange={onColumnToggle}
            style={{ width: "15em" }}
          />
          <br></br>
          <br></br>
          <Button
            type="button"
            onClick={handleClick}
            label="Save"
            className="p-button-success"
            style={{ marginRight: ".25em" }}
          />
          <Button
            type="button"
            onClick={() => setVisibleRight(false)}
            label="Cancel"
            className="p-button-secondary"
          />
        </Sidebar>
      </div>
      <Dialog header="Approve" visible={displayBasicApprove} style={{ width: '50vw' }} footer={renderFooterApprove('displayBasicApprove')} onHide={() => onHideApprove('displayBasicApprove')}>
      <InputTextarea value={value2} onChange={(e) => setValue2(e.target.value)} rows={5} cols={70} /><br></br>
      <div className="col-sm-8 col-md-8 row" style={{justifyContent:"center"}}>
      <FileUpload mode="basic"  name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" maxFileSize={1000000} onUpload={onBasicUpload} />
      </div>
</Dialog>
  <Dialog header="Sent Back" visible={displayBasic} style={{ width: '50vw' }} footer={renderFooter('displayBasic')} onHide={() => onHide('displayBasic')}>
      <InputTextarea value={value1} onChange={(e) => setValue1(e.target.value)} rows={5} cols={70} /><br></br>
      <div className="col-sm-8 col-md-8 row" style={{justifyContent:"center"}}>
      <FileUpload mode="basic"  name="demo[]" url="https://primefaces.org/primereact/showcase/upload.php" accept="image/*" maxFileSize={1000000} onUpload={onBasicUpload} />
      </div>
</Dialog>
    </div>
  );
}

export default CalendarReviewer;
