import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Toolbar } from "primereact/toolbar";
import React from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Tooltip } from "primereact/tooltip";
import { Dialog } from 'primereact/dialog';
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import searchPreference_creation from '../../constants/schemas/SearchPreferenceSchema.json';

const Searchpreferencelist = (props) => {
  const { supabase } = props;
  const [globalFilter, setGlobalFilter] = React.useState(null);
  const [selectedProducts, setSelectedProducts] = React.useState(null);
  const [productDialog, setProductDialog] = React.useState(false);
  const [surveyJson, setSurveyJson] = React.useState(null);
  const [populateData, setPopulateData] = React.useState({});
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(0);

  const columns = [
    // { field: "id", header: "ID" },
    // { field: "educationgroup_name", header: "Education Group Name" },
    // // { field: "parenteducationgroup", header: "Parent EG" },
    // { field: "abbreviation", header: "Abbreviation" },
    // { field: "group_type", header: "Type" },
    // { field: "country_registered", header: "Country" },
    // { field: "currency", header: "Currency" },
    // // { field: "email", header: "Email" },
    //  { field: "pincode", header: "Pin Code" },
    // { field: "primarycontactno", header: "Contact No." },
    // { field: "website", header: "Website" },
    // { field: "actions", header: "Action" },
    { field: "id", header: "ID" },
    { field: "user_name", header: "User Name" },
    { field: "university_name", header: "University Name" },
    { field: "institution_name", header: "Institution Name" },
    { field: "program_name", header: "Program Name" },
    { field: "session_name", header: "Session" },
    { field: "actions", header: "Action" },
  ];

  const [selectedColumns, setSelectedColumns] = React.useState(columns);
  
  const [searchPreferenceData, setSearchPreferenceData] = React.useState(null);
  const dt = React.useRef(null);

  const leftToolbarTemplate = () => {
    return (
      <React.Fragment>
        <h3 className="p-mr-2 lefttoolbartext">Search Preference</h3>
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
            placeholder="Search Preference..."
          />
        </span>
         
        <Link href="/Searchpreferenceformcreation">
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
    let _products = [...searchPreferenceData];
    let _product = elData.valuesHash ;
    _products[selectedRowIndex] = _product;
    setEducationgroup(_products);  
    const dataSend = {...elData.valuesHash};
    const id = dataSend.id
    delete dataSend.addresses; 
    delete dataSend.id;
    console.log(dataSend, "dataSend")
    const {data, error} = await supabase.from("education_group").update(dataSend).eq("id", id);
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
  const orginalJson = {...searchPreference_creation};
  let apiResult = await Promise.all([
    supabase.from("search_preference").select(),
  ]);
  let eduGroups = apiResult[0]?.data?.map(data => {
    return {value: data.id, text: data.educationgroup_name};
  });
//   let languages = apiResult[1].data.map(data => {
//     return {value: data.code, text: data.description};
//  });
 // orginalJson.pages[0].elements[0].elements[2].choices = eduGroups;
 // orginalJson.pages[0].elements[0].elements[4].choices = languages;
  setSurveyJson(orginalJson);
};

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
            <Link
          href={{
            pathname: `/EducationGroup/Educationgroupdetailedview/${rowData.id}`,
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
          className="p-button-rounded p-button-success p-button-text p-mr-2"
        />
      </React.Fragment>
    );
  };

  const getSearchPreferenceData = async () => {
    const { data, error } = await supabase.from("search_preference").select();
    if(error) {
      throw error;
    }
    setSearchPreferenceData(data);
  };
 
  React.useEffect(async () => {
    let initcolumns = [
    // { field: "id", header: "ID" },
    // { field: "university_name", header: "University Name" },
    // { field: "abbreviation", header: "Abbreviation" },
    // { field: "group_type", header: "Type" },
    // { field: "country_registered", header: "Country" },
    // { field: "website", header: "Website" },    { field: "id", header: "ID" },
    { field: "id", header: "ID" },
    { field: "user_name", header: "User Name" },
    { field: "university_name", header: "University Name" },
    { field: "institution_name", header: "Institution Name" },
    { field: "program_name", header: "Program Name" },
    { field: "session_name", header: "Session" },
    { field: "actions", header: "Action" },
    ];
    setSelectedColumns(initcolumns);
    await getSearchPreferenceData(); 
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
        right={rightToolbarTemplate}
      ></Toolbar>
      <div className="datatablecard">
        <DataTable
          value={searchPreferenceData}
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
        visible={productDialog} style={{ width: '80vw' }} header="Edit Search preference" modal className="p-fluid"  onHide={() => setProductDialog(false)}>
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

export default Searchpreferencelist;
