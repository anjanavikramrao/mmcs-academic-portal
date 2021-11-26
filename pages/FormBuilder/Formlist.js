import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import Link from "next/link";
import { Sidebar } from "primereact/sidebar";
import { Tooltip } from "primereact/tooltip";
import { MultiSelect } from "primereact/multiselect";
import { Dialog } from 'primereact/dialog';

import dynamic from "next/dynamic";
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});

const formlist = (props) => {
  const { supabase } = props;
  const [globalFilter, setGlobalFilter] = React.useState(null);
  const [selectedProducts, setSelectedProducts] = React.useState(null);
  const [productDialog, setProductDialog] = React.useState(false);
  const [surveyJson, setSurveyJson] = React.useState(null);
  const [surveyJsProps, setSurveyJsProps] = React.useState({});
  const [visibleRight, setVisibleRight] =  React.useState(false);

  const columns = [
    { field: "form_id", header: "Form ID" },
    { field: "form_name", header: "Form Name" },
    { field: "ref_table", header: "Reference Table" },
    { field: "actions", header: "Action" },
  ];

  const [selectedColumns, setSelectedColumns] = React.useState(columns);
  
  const [formBuildersList, setformBuildersList] = React.useState(null);
  const dt = React.useRef(null);
  
  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3 className="p-mr-2 lefttoolbartext">Form List</h3>
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
              placeholder="Search Form..."
            />
          </span>
          <Button
            icon="pi pi-sliders-h"
            onClick={() => setVisibleRight(true)}
            className="p-button-warning p-mr-2 p-button-outlined"
          />
          <Link href="/FormBuilder/Formdesigner">
            <Button
              label="Create New Form"
              id="createbut"
              icon="pi pi-plus-circle"
              className="p-button-warning"
            />
          </Link>
        </div>
      </React.Fragment>
    );
  };

  const getFormBuilderList = async () => {
    const { data, error } = await supabase.from("form_definition").select();
    if(error) {
      throw error;
    }
    setformBuildersList(data);
  };

  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    console.log("selectedColumns edit:: ->", selectedColumns)
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };

  React.useEffect(async () => {
    let initcolumns = [
      { field: "form_id", header: "Form ID" },
      { field: "form_name", header: "Form Name" },
      { field: "ref_table", header: "Reference Table" },
      { field: "actions", header: "Action" },
    ];
    let event = { value: initcolumns }
    onColumnToggle(event);
    await getFormBuilderList();
  }, []);

  const editProduct = (rowdata) => {
    setSurveyJson(rowdata.form_schema);
    setProductDialog(true);
    setSurveyJsProps({
      showCompletedPage: false,
      showNavigationButtons: true,
      completeText: "Save"
    });
   };

   const showProduct = (rowdata) => {
    setSurveyJson(rowdata.form_schema);
    setProductDialog(true);
    setSurveyJsProps({
      showPreviewBeforeComplete: "showAllQuestions",
      showCompletedPage: false,
      showNavigationButtons: false
    });
   };

   const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
            icon="pi pi-eye"
            tooltip="Preview"
            onClick={() => showProduct(rowData)}
            className="p-button-rounded p-button-info p-button-text"
        />
        <Button
          icon="pi pi-pencil"
          tooltip="Test with Data"
          onClick={() => editProduct(rowData)}
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
      </React.Fragment>
    );
  };

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
      form_id: {
        style: { width: "10%" }
      },
      form_name: {
        style: { width: "25%" }
      },
      form_schema: {
        style: { display: "none" }
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
        right={rightToolbarTemplate}
      ></Toolbar>
      <div className="datatablecard">
        <DataTable
          value={formBuildersList}
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

      <Dialog visible={productDialog} style={{ width: '80vw' }} modal className="p-fluid" onHide={() => setProductDialog(false)}>
        {productDialog ? (
            <Survey
            {...surveyJsProps}
            data={surveyJson}
          />
          ) : null}
      </Dialog>
      <div>
        <Sidebar
          className="sidebarprime"
          visible={visibleRight}
          position="right"
          onHide={() => setVisibleRight(false)}
        >
          <h2 style={{ fontWeight: "normal" }}>Column Selection</h2>
          <MultiSelect
            value={selectedColumns}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            style={{ width: "15em" }}
          />
          <br></br>
          <br></br>
          <Button
            type="button"
            onClick={() => console.log("The link was clicked.", e.target)}
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
};

export default formlist;
