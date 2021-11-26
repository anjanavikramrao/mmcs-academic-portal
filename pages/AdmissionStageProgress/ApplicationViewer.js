import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Dialog } from 'primereact/dialog';
import { Dropdown } from "primereact/dropdown";
import dynamic from "next/dynamic";
import { InputText } from "primereact/inputtext";
import Link from "next/link";
import { MultiSelect } from "primereact/multiselect";
import React, { useRef, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import Application_form from '../../constants/schemas/ApplicationSchema.json';

const ApplicationViewer = (props) => {

  const columns = [
    { field: "isSelected"},
    { field: "id", header: "Application ID" },
    { field: "full_name", header: "Applicant Name" },
    { field: "program", header: "Program Specialization" },
    { field: "application_date", header: "Application Date" },
    { field: "session", header: "Session" },
    { field: "application_status", header: "Current Stage" },
    { field: "actions", header: "Action" },
    ];

    const { supabase } = props;
    const [Applicationdata, setApplicationdata] = useState(null);
    const [Applicationdocs, setApplicationdocs] = useState(null);
    const [selectedApplications, setSelectedApplications] = useState(null)
    const [selectedColumns, setSelectedColumns] = useState(columns); 
    const [globalFilter, setGlobalFilter] = useState(null);
    const dt = useRef(null);

    React.useEffect(() => {
      let initcolumns = [
          { field: "isSelected"},
          { field: "id", header: "Application ID" },
          { field: "full_name", header: "Applicant Name" },
          { field: "program", header: "Program Specialization" },
          { field: "application_date", header: "Application Date" },
          { field: "session", header: "Session" },
          { field: "application_status", header: "Current Stage" },
          { field: "actions", header: "Preview" },
          ];
          setSelectedColumns(initcolumns);
          loadApplicationData();
          loadApplicationDocs()
        },[]);

      const loadApplicationData = async () => 
      {
      const {data, error} = await supabase.from("application").select();
      setApplicationdata(data);
    //  console.log(Applicationdata);
  
      }  

      const loadApplicationDocs = async () => 
      {
     
  const { data, error } = await supabase
  .from('application')
  .select(
    'title:uploaded_documents->title->0'
  )
  setApplicationdocs(data);
//console.log(JSON.stringify(data, null, 2))
       console.log(JSON.stringify(Applicationdocs))
        if(error) 
        {
          throw error;    
       }
      }  
    const columnComponents = selectedColumns.map((col) => {
  //     const generateColumn = (col, props = {}) => {
  //       if (col.field === "isSelected")
  //           return (
  //             <Column
  //               key={col.field}
  //               selectionMode="multiple"
  //               style={{ width: "5%", color: "#FF9333" }}   
  //             />
  //           )
  //       return <Column
  //         key={col.field}
  //         field={col.field}
  //         header={col.header}
  //         {...props}
  //       />
  //   };
  // });
  return (
      <Column key={col.field.App} field={col.field} header={col.header}  />
    );
  });
 return(
    <div>
     <TabView>      
        <TabPanel header="Application">   
        <div className="datatablecard">
        <DataTable
                        value={Applicationdata}
                        onRowClick={({ index }) => onSelectedRowIndexChange(index)}
                        ref={dt}
                        globalFilter={globalFilter}
                        dataKey="id"
                        selection={selectedApplications}
                        onSelectionChange={(e) => setSelectedApplications(e.value)}
                        paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        rows={20}
                        rowsPerPageOptions={[5,10, 20, 50]}
                        sortMode="multiple"
                        scrollable
                        scrollHeight="500px" 
                        resizableColumns
                        columnResizeMode="fit">
                    {columnComponents}
                </DataTable>
        </div>                      
        </TabPanel>

        <TabPanel header="SSLC">

        </TabPanel>
        <TabPanel header="PUC 2">

        </TabPanel>
        <TabPanel header="CET">

       </TabPanel>
    </TabView> 
    </div>
  );
}
export default ApplicationViewer;
