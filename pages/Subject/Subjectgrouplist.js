
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import { FileUpload } from 'primereact/fileupload';
import React, { useRef, useState,useEffect } from "react";
import Link from 'next/link';
import { Sidebar } from 'primereact/sidebar';
import { Tooltip } from 'primereact/tooltip';
import { MultiSelect } from "primereact/multiselect";
import dynamic from "next/dynamic";
import * as Survey from "survey-react";
import Programcreation from '../../components/Forms/Programschema';

const survey = new Survey.Model(Programcreation);

import { Dialog } from 'primereact/dialog';

const Programform = dynamic(() => import("../../components/Forms/Programform"), {
  ssr: false,
});

function Programlevellist() {
  const [displayBasic, setDisplayBasic] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const [visibleRight, setVisibleRight] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const op = useRef(null);
  const toast = useRef(null);
  const dt = useRef(null);

  useEffect(() => {
    Survey
    .StylesManager
    .applyTheme("bootstrap");
  }, []);

  const dialogFuncMap = {
    'displayBasic': setDisplayBasic
}

  const Programlevel = [
    {
      slno: "1",
      Programname: "Bachelor of Engineering",
      Department: "Computer Science",
    },
    {
      slno: "2",
      Programname: "Bachelor of Commerce",
      Department: "Accounts and Finance",
    },
    {
      slno: "3",
      Programname: "Bachelor of Arts",
      Department: "Political Science	",
    },
    {
      slno: "4",
      Programname: "Bachelor of Science",
      Department: "Agriculture",
    },
    {
      slno: "5",
      Programname: "Medical",
      Department: "Dental",
    },
  ];


  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3 className="p-mr-2 lefttoolbartext">List Of Program</h3>
      </React.Fragment>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <React.Fragment>
        <div className="p-d-flex">
          <span className=" p-mr-2 p-d-inline-block p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search Program..." />
          </span>
          <Button icon="pi pi-sliders-h" onClick={() => setVisibleRight(true)} className="p-button-warning p-mr-2 p-button-outlined" />

          <Button id="exportbut" label="Export" icon="pi pi-upload" className="p-button-warning p-mr-2 p-button-outlined" onClick={exportCSV} />
          <Link href="/Program/Programform"><Button
            label="Create New"
            id="createbut"
            icon="pi pi-plus-circle"
            className="p-button-warning"
          /></Link>
        </div>
      </React.Fragment>
    );
  };
const onClick = (name, position) => {
    dialogFuncMap[`${name}`](true);

    if (position) {
        setPosition(position);
    }
}

const onHide = (name) => {
    dialogFuncMap[`${name}`](false);
}
  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          onClick={() => onClick('displayBasic')} 
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger p-button-text"
        />
        {/*  <Button
          icon="pi pi-ellipsis-h"
          className="p-button-rounded p-button-text p-button-plain"
        /> */}
        <Dialog visible={displayBasic} header="Edit Program" style={{ width: 'auto' }} onHide={() => onHide('displayBasic')}>
        <Survey.Survey
           completeText="Update"
            showCompletedPage={false}
            onComplete={(data) => console.log(data.valuesHash)}
            model={survey}
          />        </Dialog>
      </React.Fragment>
    );
  };
  const columns = [
    { field: "slno", header: "Sl. no" },
    { field: "Programname", header: "Program Name" },
    { field: "Department", header: "Department" },
    { field: "actions", header: "Action" }
  ];

  const exportCSV = () => {
    dt.current.exportCSV();
  };

  const [selectedColumns, setSelectedColumns] = useState(columns);
  const [products1, setProducts1] = useState(Programlevel);
  const onColumnToggle = (event) => {
    let selectedColumns = event.value;
    let orderedSelectedColumns = columns.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    setSelectedColumns(orderedSelectedColumns);
  };
  function handleClick(e) {
    e.preventDefault();
    console.log('The link was clicked.', e.target);
  }

  const columnComponents = selectedColumns.map((col) => {
    if (col.field === "actions")
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={actionBodyTemplate}
          style={{ width: '10em' }}
        />
      );
    return (
      <Column key={col.field} field={col.field} header={col.header} />
    );
  });


  return (
    <div className="datatable-crud-demo">
      <Tooltip target=".export-buttons>button" position="bottom" />

      <Toolbar className="p-mb-4" id="tool"
        left={leftToolbarTemplate}
        right={rightToolbarTemplate}
      ></Toolbar>
      <div className="datatablecard">
        <DataTable
          value={products1}
          ref={dt}
          className="p-datatable-gridlines"
          globalFilter={globalFilter}
          dataKey="slno"
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          paginator
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10, 20, 50]}
          scrollable
          scrollHeight="500px"
          resizableColumns
          columnResizeMode="fit"
        >
          <Column selectionMode="single" headerStyle={{ width: '3em' }}   ></Column>
          {columnComponents}
        </DataTable>
      </div>
      <div>
        <Sidebar visible={visibleRight} /* baseZIndex="!important" */ position="right" onHide={() => setVisibleRight(false)}>
          <h2 style={{ fontWeight: 'normal' }}>Column Selection</h2>
          <MultiSelect
            value={selectedColumns}
            options={columns}
            optionLabel="header"
            onChange={onColumnToggle}
            style={{ width: "15em" }}
          />
          <br></br>
          <br></br>
          <Button type="button" onClick={handleClick} label="Save" className="p-button-success" style={{ marginRight: '.25em' }} />
          <Button type="button" onClick={() => setVisibleRight(false)} label="Cancel" className="p-button-secondary" />
        </Sidebar>
      </div>
    </div>
  );
}

export default Programlevellist;