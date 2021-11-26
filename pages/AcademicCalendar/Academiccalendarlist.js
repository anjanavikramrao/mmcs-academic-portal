import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React, { useRef, useState,useEffect } from "react";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
import { Tooltip } from "primereact/tooltip";
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from 'primereact/dialog';
import dynamic from "next/dynamic";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import Academiccalendar from "../../constants/schemas/AddAcademiccalendarformschema.json";


function Academiccalendarlist(props) {
  const { supabase } = props;
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const [productDialog, setProductDialog] = useState(false);
  const [surveyJson, setSurveyJson] = React.useState({});
  const [populateData, setPopulateData] = React.useState({});
  const dt = useRef(null);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3 className="p-mr-2 lefttoolbartext">Academic Calendars</h3>
      </React.Fragment>
    );
  };
  
   const showSticky= () => {
        toast.current.show({severity: 'info', summary: 'Academic Calendar', detail: 'Updated', sticky: true});
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
            <Button
              label="Assign Calendar"
              id="assignbtn"
              onClick={() => console.log("Assign Calnedar CLicked")}
              className="p-button-warning p-mr-2 p-button-outlined"
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

 

 const editproductdatatable = async (data) => {
    let _products = [...Educationgroupdata];
    let _product = data.valuesHash ;
    const index = findIndexById(data.valuesHash.id);
    _products[index] = _product;
    const dataSend = {
      "university": _product.university,
      "name": _product.name,
      "calendartype": _product.calendartype,
      "calendaravailablefor": _product.calendaravailablefor,
      "calendardeviation": _product.calendardeviation,
      "calendardescription": _product.calendardescription,
      "specialinstructions": _product.specialinstructions
    };
    const {_, error} = await supabase.from("academiccalendar").update(dataSend).eq("id", _product.id);
    if(error) {
      throw error;
    }
    setProductDialog(false);
    setEducationgroup(_products);  
  
 }
   const editProduct = (rowdata) => {  
    //here we will collect row data
    const res = {
      currentPageNo: 1,
      data: {
          "id": rowdata.id,
          "university": rowdata.university,
          "name": rowdata.name,
          "calendartype": rowdata.calendartype,
          "calendaravailablefor": rowdata.calendaravailablefor,
          "calendardeviation": rowdata.calendardeviation,
          "calendardescription": rowdata.calendardescription,
          "specialinstructions": rowdata.specialinstructions
      }
    };
    const originalJson = {...Academiccalendar};
    const populateData = {
      currentPageNo: res.currentPageNo,
      data: {...res.data}
    };
  
    setPopulateData(populateData);
    setSurveyJson(originalJson);
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

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
       
       <Link
          href={{
            pathname: "/AcademicCalendar/CalendarEvent",
            query: {
              id: rowData.id,
              name:rowData.name,
              calendardescription:rowData.calendardescription,
              calendartype:rowData.calendartype,
              university:rowData.university,
              sentbackremarks : rowData.sentbackremarks
            },
          }}
        >
          <Button
            icon="pi pi-eye"
            className="p-button-rounded p-button-info p-button-text"
          />
        </Link>
        <Button
          icon="pi pi-pencil"
           onClick={() => editProduct(rowData)}
          //  onClick={() => Router.push({pathname:'/InstitutionGroup/Institutiongroupform', query: { id: rowData.id }})}
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
        />
      </React.Fragment>
    );
  };
  const columns = [
    { field: "id", header: "Calendar ID" },
    { field: "name", header: "Calendar Name" },
    { field: "calendartype", header: "Calendar Type" },
    { field: "noofevents", header:"No. Of Events" },
    { field: "createdby", header: "Created By" },
    { field: "status", header: "Status" },
    { field: "actions", header: "Action" },
  ];

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const [selectedColumns, setSelectedColumns] = useState(columns);
  
  const [Educationgroupdata, setEducationgroup] = useState(null);

  const getAcademiccalendar = async () => {
    const { data, error } = await supabase.from("academiccalendar").select();
    if(error) {
      throw error;
    }
    setEducationgroup(data);
  }
 
  useEffect(() => {
    let initcolumns = [
      { field: "id", header: "Calendar ID" },
      { field: "name", header: "Academic Calendar Name" },
      { field: "calendaryear", header: "Calendar Year" },
      { field: "calendarsession", header: "Calendar Session" },
      { field: "calendartype", header: "Calndar Type" },
      { field: "university", header: "University" },
      { field: "noofevents", header:"No. Of Events" },
      { field: "createdby", header: "Created By" },
      { field: "calendaravailablefor", header: "Calendar Available For" },
      { field: "holidaycalendar", header: "Holiday Calendar" },
      { field: "calendardeviation", header:"Calendar Deviation" },
      { field: "calendardescription", header: "Calendar Description" },
      { field: "specialinstructions", header:"Special Instructions" },
      { field: "status", header: "Status" },
      { field: "actions", header: "Action" },
    ];
    let event={value:initcolumns}
    onColumnToggle(event);
    getAcademiccalendar();
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
          {columnComponents}
        </DataTable>
      </div>

      <Dialog visible={productDialog}  style={{ width: '80vw' }}header="Edit Educationgroup" modal className="p-fluid"  onHide={() => setProductDialog(false)}>
        <Survey
          showCompletedPage={false} 
          completeText="Save"
          showNavigationButtons={true}
          onComplete={editproductdatatable}
          data={surveyJson}
          populateData={populateData}
        />
      
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
    </div>
  );
}

export default Academiccalendarlist;
