import Link from "next/link";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import dynamic from "next/dynamic";
import { Tooltip } from "primereact/tooltip";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import Departmentcreation from '../../constants/schemas/Departmentschema.json';

const DepartmentList = (props) => {
  const { supabase } = props;
  const [globalFilter, setGlobalFilter] = React.useState(null);
  const [selectedProducts, setSelectedProducts] = React.useState(null);
  const [productDialog, setProductDialog] = React.useState(false);
  const [surveyJson, setSurveyJson] = React.useState(null);
  const [populateData, setPopulateData] = React.useState({});
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(0);

  const columns = [
    { field: "id", header: "ID" },
    { field: "department_name", header: "Department Name" },
    { field: "department_type", header: "Department Type" },
    { field: "department_head", header: "Department Head" },
   
    { field: "actions", header: "Action" },
  ];

  const [selectedColumns, setSelectedColumns] = React.useState(columns);
  
  const [department, setDepartment] = React.useState(null);
  const dt = React.useRef(null);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3 className="p-mr-2 lefttoolbartext">Education Groups</h3>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <div className="p-d-flex">
        <span className=" p-mr-2 p-d-inline-block p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            onInput={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search Educationgroup..."
          />
        </span>
        <Button
          icon="pi pi-sliders-h"
          className="p-button-warning p-mr-2 p-button-outlined"
        />

        <Button
          id="exportbut"
          label="Export"
          icon="pi pi-upload"
          className="p-button-warning p-mr-2 p-button-outlined"
          onClick={() => dt.current.exportCSV()}
        />
        <Link href="/EducationGroup/Educationgroupformcreation">
          <Button
            label="Create New"
            id="createbut"
            icon="pi pi-plus-circle"
            className="p-button-warning"
          />
        </Link>
      </div>
    );
  };

  const editProductDatatable = async (elData) => {
    let _products = [...department];
    let _product = elData.valuesHash ;
    _products[selectedRowIndex] = _product;
    setDepartment(_products);  
    const dataSend = {...elData.valuesHash};
    const id = dataSend.id
    delete dataSend.addresses; 
    delete dataSend.id;
    const {data, error} = await supabase.from("institution_group").update(dataSend).eq("id", id);
    if(error) {
      throw error;
    }
    await loadSurveyData();
    setProductDialog(false); 
 };

const editProduct = (rowData) => {
  const populateData = {
    currentPageNo: 0,
    data: {...rowData}
  };

  setPopulateData(populateData);
  setProductDialog(true); 
};

const loadSurveyData = async () => {
  const originalJson = {...Departmentcreation};
  const [eduGroups, uniGroups, campusInstiGroups] = await Promise.all([
    supabase.from("education_group").select("educationgroup_name"),
    supabase.from("university").select("name"),
    supabase.from("campusinstitution").select("institution_name")
  ]);
  originalJson.pages[0].elements[0].choices = eduGroups.data.map(a => a.educationgroup_name);
  originalJson.pages[0].elements[2].choices = uniGroups.data.map(a => a.name);
  originalJson.pages[0].elements[3].choices = campusInstiGroups.data.map(a => a.institution_name);
  setSurveyJson(originalJson);
};

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        {/* <Link
          href={{
            pathname: `/University/Universitydetailedview/${rowData.id}`,
          }}
        >
          <Button
            icon="pi pi-eye"
            className="p-button-rounded p-button-info p-button-text"
          />
        </Link> */}
        <Button
          icon="pi pi-pencil"
           onClick={() => editProduct(rowData)}
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
        />
      </React.Fragment>
    );
  };

  const getDepartmentList = async () => {
    const { data, error } = await supabase.from("department").select();
    if(error) {
      throw error;
    }
    setDepartment(data);
  };
 
  React.useEffect(async () => {
    let initcolumns = [
      { field: "id", header: "ID" },
    { field: "department_name", header: "Department Name" },
    { field: "department_type", header: "Department Type" },
    { field: "department_head", header: "Department Head" },
   
    { field: "actions", header: "Action" },
    ];
    setSelectedColumns(initcolumns);
    await getDepartmentList(); 
    await loadSurveyData();
  }, []);

  const columnComponents = selectedColumns.map((col) => {
    const generateColumn = (col, props = {}) => {
      return <Column
        key={col.field}
        field={col.field}
        header={col.header}
        {...props}
      />
    };

    const propsMapper = {
      actions: {
        body: actionBodyTemplate,
        style: { width: "15%" }
      },
      id: {
        style: { width: "10%" }
      },
      educationgroup_name: {
        style: { width: "25%" }
      },
      abbreviation: {
        style: { width: "10%" }
      }
    };
    return generateColumn(col, propsMapper[col.field] || {});
  });

  return (
    <div className="datatable-crud-demo">
      <Tooltip target=".export-buttons>button" position="bottom" />

      <Toolbar
        className="p-mb-4"
        id="tool"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}>        
      </Toolbar>

      <div className="datatablecard">
        <DataTable
          value={department}
          onRowClick={({ index }) => setSelectedRowIndex(index)}
          ref={dt}
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

      <Dialog
        visible={productDialog} style={{ width: '80vw' }} header="Edit Department" modal className="p-fluid"  onHide={() => setProductDialog(false)}>
          {productDialog ? (
            <Survey 
            showCompletedPage={false} 
            completeText="Save"
            showNavigationButtons={true}
            onComplete={(data) => {
              editProductDatatable(data)
              setProductDialog(false)
            }}
            data={surveyJson}
            populateData={populateData}
          />
          ) : null}
        </Dialog>
    </div>
  );
}

export default DepartmentList;
