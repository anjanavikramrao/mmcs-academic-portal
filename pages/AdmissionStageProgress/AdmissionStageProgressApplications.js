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
import { Toolbar } from "primereact/toolbar";
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const Survey = dynamic(() => import("../../components/common/survey"), {
  ssr: false,
});
import Application_form from '../../constants/schemas/ApplicationSchema.json';
const AdmissionStageProgressApplications = (props) => {
    const { supabase } = props;
    
  const loadApplicationData = async () => {
    const {data, error} = await supabase.from("application").select();
    setApplicationdata(data);
    if(error) {
      throw error;    
   }
  }        
  
  const loadAppliedApplicationData = async () => 
    {
      const {data, error} = await supabase.from("application").select().eq("application_status","applied");
      setAppliedApplicationdata(data);
      if(error) {
          throw error;
    }        
  }
  
  const loadApprovedApplicationData = async () =>{
      const {data, error} = await supabase.from("application").select().eq("application_status","approved");
       setApprovedApplicationdata(data);
       if(error) {
         throw error;
      }
    }

  const loadRejectedApplicationData = async () =>{      
        const {data, error} = await supabase.from("application").select().eq("application_status","rejected");
        setRejectedApplicationdata(data);
        if(error) {
          throw error;
       }  
  }
    
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
          loadUniversityData();
          loadApplicationData();
          loadAppliedApplicationData();
          loadApprovedApplicationData();
          loadRejectedApplicationData();
          loadCurrentStageData();  
          loadSurveyData();
      }, []);

  const leftToolbarTemplate = () => {
        return (
          <React.Fragment>
           <Dropdown
              className="p-button-warning dropdown-adm"
              value={selectedUniversity}
              options={university}
              onChange={onUniversityChange}
              optionLabel="name"
              placeholder="University"
              style={{width: '200px' }}
          />
          <Dropdown
              className="p-button-warning dropdown-adm"
              value={selectedInstitution}
              options={institution}
              onChange={onInstituteChange}
              optionLabel="name"
              placeholder="Institution"
              style={{width: '150px' }}
        />
        <Dropdown
              value={selectedProgram}
              options={program}
              onChange={onProgramChange}
              optionLabel="name"
              placeholder="Program"
              className="dropdown-adm"
              style={{width: '150px' }}
        />
        <Dropdown
              value={selectedSessionandYear}
              options={sessionandYear}
              onChange={onSessionChange}
              optionLabel="calendarsession"
              placeholder="Year and Session"
              className="dropdown-adm"
              style={{width: '150px' }}
        />          
          </React.Fragment>
        );
      };

  const rightToolbarTemplate = () => {
        return (
          <React.Fragment>
            <div className="p-d-flex">
              <i  className="pi pi-angle-double-down"><a href="#"  onClick={handleClick}> Load Search</a></i>
              <span style={{ marginLeft: '2rem' }}></span>
              <i  className="pi pi-save"><a href="#"  onClick={handleClick}> Save Search</a></i>
              <span style={{ marginLeft: '2rem' }}></span>
              <i className="pi pi-book" ><Link  href="./Searchpreferencelist"> Edit Search</Link></i>
              <span style={{ marginLeft: '2rem' }}></span>
           </div>
          </React.Fragment>
        );
      };  

  const loadUniversityData = async () => 
  {
          const {data, error} = await supabase.from("university").select();
          console.log("University",data)
          setUniversity(data);
          setselectedUniversity(data[0]);
          
          if(error) {
              throw error;
            }
            loadInstitutionData(data[0].name);
                    
  }
        
  const loadInstitutionData = async (university) => 
  {
            console.log(university);
            const {data, error} = await supabase.from("institution_group")
              .select("name").ilike('university_name', '%' + university + '%');
            console.log(data);
            setInstitution(data);
            setselectedInstitution(data[0]);            
            if(error) {
                throw error;
            }        
            loadProgramData();      
  }     
          
  const loadProgramData = async () =>
   {
            const {data, error} = await supabase.from("program_group").select("name")
            setProgram(data);
            setSelectedProgram(data[0]);   
                   
            if(error) {
                throw error;
              }     
              loadSessionData();           
  }  

  const loadSessionData = async () => 
  {
            const {data, error} = await supabase.from("admission_calendar").select("calendarsession")
            setSessionandYear(data);
            console.log(data)
            setSelectedSessionandYear(data[0]);       
              
            if(error) {
                throw error;
              }        
  }  

  const loadCurrentStageData = async () =>
   {
            const {data, error} = await supabase.from("admission_profile").select("admission_stage_name")
            setCurrentStage(data);
            //setSelectedCurrentStage(data[0]);            
            if(error) {
                throw error;
              }        
  }  
  
  const previewApplication = (rowData) =>
   {         
            loadSurveyData();
             const populateData = {
              currentPageNo: 0,
              data: {...rowData}
            };            

            setPopulateData(populateData);
            setProductDialog(true);
  };


  const loadSurveyData = async () => 
  {
        const orginalJson = {...Application_form};
        let apiResult = await Promise.all
        ([
          supabase.from("admission_profile").select("id, admission_stage_name"),
          supabase.from("application").select("uploaded_documents").eq("id","5")
        ]);
        let stage_names = apiResult[0]?.data?.map(data =>
        {
          return {value: data.admission_stage_name, text: data.admission_stage_name};
        });
        let appDocuments = apiResult[1].data.map(data =>
        {
        return {value: data.uploaded_documents, text: data.uploaded_documents};
        });

      //console.log("heyyy"+orginalJson.pages[0].elements[2].elements[1].name)
       orginalJson.pages[0].elements[1].elements[1].choices= appDocuments;
       orginalJson.pages[0].elements[3].elements[1].choices = stage_names; 
      setSurveyJson(orginalJson);
 
  };

  const editProductDatatable = async (apData) => 
  {
    let _products = [...Applicationdata];
    let _product = apData.valuesHash ;
    _products[selectedRowIndex] = _product;
    setApplicationdata(_products);  
    const dataSend = {...apData.valuesHash};
    const id = dataSend.id
    delete dataSend.id;
    const {data, error} = await supabase.from("application").update(dataSend).eq("id", id);
    if(error) {
      throw error;
    }
    await loadSurveyData();
    setProductDialog(false); 
    await loadApplicationData();
    loadAppliedApplicationData();
    loadApprovedApplicationData();
    loadRejectedApplicationData();
 };
   
  const [university, setUniversity] = useState([]);
  const [institution, setInstitution] = useState([]);
  const [program, setProgram] = useState([]);
  const [sessionandYear, setSessionandYear] = useState([]);
  const [currentStage, setCurrentStage] = useState([]);

  const [selectedUniversity, setselectedUniversity] = useState(null);
  const [selectedInstitution, setselectedInstitution] = useState(null);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedSessionandYear, setSelectedSessionandYear] = useState(null);
  const [selectedCurrentStage, setSelectedCurrentStage] = useState([]);
  
  const [Applicationdata, setApplicationdata] = useState(null);
  const [approvedApplicationdata, setApprovedApplicationdata] = useState(null);
  const [rejectedApplicationdata, setRejectedApplicationdata] = useState(null);
  const [appliedApplicationdata, setAppliedApplicationdata] = useState(null);
  const [selectedApplications, setSelectedApplications] = useState(null);  
  const [populateData, setPopulateData] = React.useState({});
  const [productDialog, setProductDialog] = React.useState(false);
  const [surveyJson, setSurveyJson] = React.useState(null);
  const [selectedRowIndex, setSelectedRowIndex] = React.useState(0);
  const [globalFilter, setGlobalFilter] = useState(null);
  const dt = useRef(null);
  
  
  const columns = 
  [ 
    { field: "isSelected"},
    { field: "id", header: "Application ID"},
    { field: "full_name", header: "Applicant Name" },
    { field: "program", header: "Program Specialization" },
    { field: "application_date", header: "Application Date" },
    { field: "session", header: "Session" },
    { field: "application_status", header: "Current Stage" },
    { field: "actions", header: "Action" },
  ];

  const actionBodyTemplate = (rowData) => 
  {
      return (
        <React.Fragment>
          <Button
            icon="pi pi-eye"
            onClick={() => previewApplication(rowData)}
            className="p-button-rounded p-button-danger p-button-text"
          />
        </React.Fragment>
      );
  };
  
  const statusBodyTemplate = (rowData) => 
  { 
    if(rowData.application_status=='approved')
        return <span className="badge badge-success" >  {rowData.application_status}</span>; 
    else if(rowData.application_status=='rejected')
        return <span className="badge badge-danger">{rowData.application_status}</span>;
    else if(rowData.application_status=='applied')
        return <span className="badge badge-primary">{rowData.application_status}</span>;
    else if(rowData.application_status=='withdraw_requested')
        return <span className="badge badge-warning">{rowData.application_status}</span>;
    else if(rowData.application_status=='withdraw_rejected')
        return <span className="badge badge-dark">{rowData.application_status}</span>;
    else if(rowData.application_status=='withdraw_in_review')
        return <span className="badge badge-secondary">{rowData.application_status}</span>;
    else
        return <span className="badge badge-info">{rowData.application_status}</span>; 
  };

  const [selectedColumns, setSelectedColumns] = useState(columns); 

  const columnComponents = selectedColumns.map((col) =>
   { 
      const generateColumn = (col, props = {}) =>
       {
         
        if (col.field === "id")
        return (
          <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable
          />
        ) 
        if (col.field === "application_status")
        return (
          <Column
          key={col.field}
          field={col.field}
          header={col.header}
          style={{ width: "20%"}}
          body={statusBodyTemplate}
          sortable
          />
        )   
      
        if (col.field === "isSelected")
            return (
              <Column
                key={col.field}
                selectionMode="multiple"
                style={{ width: "5%" }}   
              />
            )          
        return <Column
           key={col.field}
          field={col.field}
          header={col.header}
          {...props}         
      />
     };

      const propsMapper = {
      actions: 
      {
        body: actionBodyTemplate,
        style: { width: "10%" }
      },     
    };
    return generateColumn(col, propsMapper[col.field] || {});
  });

  const onUniversityChange = (e) =>
   {
    setselectedUniversity(e.value);
    loadInstitutionData(e.value.name);
  };

  const onInstituteChange = (e) => 
  {
    setselectedInstitution(e.value);
  };

  const onProgramChange = (e) =>
   {
    setSelectedProgram(e.value);
  };

  const onSessionChange = (e) => 
  {
    setSelectedSessionandYear(e.value);
  };

  const onSelectedRowIndexChange = (e) =>
  {
    console.log("selected %d", e);
  };

  const onStageChange = (e) => 
  {
    setSelectedCurrentStage(e.value);
    if(selectedApplications != null && selectedApplications.length > 0) {
      updateApplicationStage(selectedApplications, e.value.admission_stage_name);
    }    
  };

  const updateApplicationStage = async (applications, newStage) =>
   {
      for(var i = 0; i < applications.length; i++) {
        const { data, error } = await supabase
          .from('application')
          .update({ application_status: newStage })
          .eq('id', applications[i].id);
      } 
      await loadApplicationData();
      await loadAppliedApplicationData();
      await loadApprovedApplicationData();
      await loadRejectedApplicationData();
      await setSelectedApplications([]);
  }

  const ErrorToast = (props) =>
   {
    toast.error(props, {
      position: toast.POSITION.BOTTOM_RIGHT,
      toastId: '001',
      hideProgressBar:true,
      autoClose:2000
          });
  };

  const SuccessToast = (props) =>
   {
    toast.success(props, {
      position: toast.POSITION.BOTTOM_RIGHT,
      toastId: '001',
      hideProgressBar:true,
      autoClose:2000
          });
  }; 

  async function handleClick(e) 
  {  
    
        if (selectedUniversity==null)
        {
          ErrorToast("Please select University")
          return;
        }

        else if (selectedInstitution==null)
        {   
          ErrorToast("Please select Institute")
        return;
        }
        
        else if (selectedProgram==null)
        {  
          ErrorToast("Please select program")
          
        return;
        }

        else if (selectedSessionandYear==null)
        {   
        
          ErrorToast("Please select session and year")
        return;
        }

        const { data, error } = await supabase
        .from('search_preference')
        .insert(
          [
            { 
                user_name: "Anjana",  // TO-Do get logged in username
                search_string:"{"+"University:"+selectedUniversity.name+ "Institute :"+selectedInstitution.name +"Program: "+selectedProgram.name+ " Session: "+selectedSessionandYear.name+"}",
                program_name: "ADM-STG",
                screen_name: "ADM-STG",
                university_name:selectedUniversity.name,
                institution_name:selectedInstitution.name,
                program_name:selectedProgram.name,
                session_name:selectedSessionandYear.name,
                date_added: new Date()
              }
          ]
        )
      
        if(data)
          {
              SuccessToast("Seach Preference added Successfully")
              return;
          } 

        if(error) 
            {
              throw error;
            }    
  }

  return (
    <div>
          <Toolbar
              className="p-mb-1"
              id="tool"
              left={leftToolbarTemplate}
              right={rightToolbarTemplate}>
          </Toolbar>   
          <div>
          <span className=" p-mr-2 p-d-inline-block p-input-icon-left">
                <i className="pi pi-search" />
                <InputText
                  type="search"
                  onInput={(e) => setGlobalFilter(e.target.value)}
                  placeholder="Search Application..."
          />
          </span>         
          <Dropdown style={{ marginLeft: '30rem' }}
                  value={selectedCurrentStage}
                  options={currentStage}
                  onChange={onStageChange}
                  optionLabel="admission_stage_name"
                  placeholder="Actions"
                  className="dropdown-adm-yellow-bck"
          />    
          </div>     
      <div>
        <TabView>      
            <TabPanel header="All Applications">
              <div className="datatablecard" style={{backgroundColor: '#A0A0A0'}}>
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
                        columnResizeMode="fit"
                     //   onClick={loadApplicationData()}
                    >
                    {columnComponents}
                </DataTable>
            </div>    
 
        <Dialog
        visible={productDialog} style={{ width: '80vw' }} header="Preview Application" modal className="p-fluid"  onHide={() => setProductDialog(false)}>
          {productDialog ? (
            <Survey 
                showCompletedPage={false} 
                completeText="Update"
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

        </TabPanel>
        <TabPanel header="Approved Application">        
      
                <div className="datatablecard">
                    <DataTable
                        value={approvedApplicationdata}
                        onRowClick={({ index }) => setSelectedRowIndex(index)}
                        ref={dt}
                        globalFilter={globalFilter}
                        dataKey="id"
                        selection={selectedApplications}
                        onSelectionChange={(e) => setApprovedApplicationdata(e.value)}
                        paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        rows={5}
                        rowsPerPageOptions={[5,10, 20, 50]}
                        sortMode="multiple"
                        scrollable
                        scrollHeight="500px" 
                        resizableColumns
                        columnResizeMode="fit"
                      //  onClick={loadApprovedApplicationData()}
                    >
                    {columnComponents}
                </DataTable>
            </div>  
            <Dialog  visible={productDialog} style={{ width: '80vw' }} header="Preview Application" modal className="p-fluid"  onHide={() => setProductDialog(false)}>
                 {productDialog ? (
                 <Survey 
                      showCompletedPage={false} 
                      completeText="Update"
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
        </TabPanel>
        <TabPanel header="Rejected Application">
                <div className="datatablecard">
                    <DataTable
                        value={rejectedApplicationdata}
                        onRowClick={({ index }) => setSelectedRowIndex(index)}
                        ref={dt}
                        globalFilter={globalFilter}
                        dataKey="id"
                        selection={selectedApplications}
                        onSelectionChange={(e) => setRejectedApplicationdata(e.value)}
                        paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        rows={5}
                        rowsPerPageOptions={[5,10, 20, 50]}
                        sortMode="multiple"
                        scrollable
                        scrollHeight="500px" 
                        resizableColumns
                        columnResizeMode="fit"
                     //   onClick={loadRejectedApplicationData()}
                    >
                    {columnComponents}
                </DataTable>
            </div>
            <Dialog  visible={productDialog} style={{ width: '80vw' }} header="Preview Application" modal className="p-fluid"  onHide={() => setProductDialog(false)}>
               {productDialog ? (
            <Survey 
                  showCompletedPage={false} 
                  completeText="Update"
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
        </TabPanel>

        <TabPanel header="New Applications">
            <div className="datatablecard">
                <DataTable
                        value={appliedApplicationdata}
                        onRowClick={({ index }) => setSelectedRowIndex(index)}
                        ref={dt}
                        globalFilter={globalFilter}
                        dataKey="id"
                        selection={selectedApplications}
                        onSelectionChange={(e) => setAppliedApplicationdata(e.value)}
                        paginator
                        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        rows={5}
                        rowsPerPageOptions={[5,10, 20, 50]}
                        sortMode="multiple"
                        scrollable
                        scrollHeight="500px" 
                        resizableColumns
                        columnResizeMode="fit"
                      //  onClick={loadAppliedApplicationData()}
                    >
                    {columnComponents}
                </DataTable>
            </div>        
        </TabPanel>        
     </TabView>
   </div>
        <ToastContainer />
    </div>
  );
}
export default AdmissionStageProgressApplications;
