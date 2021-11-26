import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import React, { useRef, useState } from "react";
import Link from "next/link";
import { MultiSelect } from "primereact/multiselect";
import { Dropdown } from "primereact/dropdown";
import { TabView, TabPanel } from "primereact/tabview";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//toast.configure()
const AdmissionStageProgressWithdrawApplications = (props) => {

    const { supabase } = props;
    
  const loadAllWithdrawData = async () => {

    const {data, error} = await supabase.from("application").select().neq("withdraw_request",false);;
    setAllWithdraw (data);
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
  
      const loadApprovedWithdrawData = async () =>{
       const {data, error} = await supabase.from("application").select().eq("withdraw_request","withdraw_approved");
       setApprovedWithdrawdata(data);
       if(error) {
         throw error;
       }
     }

     const loadRejectedWithdrawData = async () =>{
      {
        const {data, error} = await supabase.from("application").select().eq("withdraw_request","withdraw_rejected");
        setRejectedWithdrawdata(data);
        if(error) {
          throw error;
        }
      }

     }
    
    React.useEffect(() => {
      let initcolumns = [
          { field: "isSelected"},
          { field: "id", header: "App ID" },
          { field: "full_name", header: "Applicant Name" },
          { field: "program", header: "Specialization" },   
          { field: "session", header: "Session" },
          { field: "withdraw_request", header: "Withdraw Status" },
          { field: "withdraw_request_date", header: "Withdraw Date" },
          ];
          setSelectedColumns(initcolumns);
          loadAllWithdrawData();
          loadUniversityData();
          loadCurrentStageData();
          //loadApplicationData();
         //loadAppliedApplicationData();
          loadApprovedWithdrawData();
          loadRejectedWithdrawData();
      }, []);

  
  const loadUniversityData = async () => {
          const {data, error} = await supabase.from("university").select();
          console.log("University",data)
          setUniversity(data);
          setselectedUniversity(data[0]);
          
          if(error) {
              throw error;
            }
            loadInstitutionData(data[0].name);
                    
          }
        
    const loadInstitutionData = async (university) => {
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
          
   const loadProgramData = async () => {
            const {data, error} = await supabase.from("program_group").select("name")
            setProgram(data);
            setSelectedProgram(data[0]);   
                   
            if(error) {
                throw error;
              }     
              loadSessionData();           
          }  

    const loadSessionData = async () => {
            const {data, error} = await supabase.from("admission_calendar").select("calendarsession")
            setSessionandYear(data);
            setSelectedSessionandYear(data[0]);       
            //loadCurrentStageData();     
            if(error) {
                throw error;
              }        
          }  

    const loadCurrentStageData = async () => {
            const {data, error} = await supabase.from("admission_profile").select("admission_stage_name").eq("withdraw_status",true);
            setCurrentStage(data);
            //setSelectedCurrentStage(data[0]);            
            if(error) {
                throw error;
              }        
          }  


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
  
  const [AllWithdraw, setAllWithdraw] = useState(null);
  const [selectedAllWithdrawdata, setselectedAllWithdrawdata] = useState(null);  

  const [approvedWithdrawdata, setApprovedWithdrawdata] = useState(null);
  const [selectedApprovedWithdrawdata, setSelectedApprovedWithdrawdata] = useState(null);
  
  const [rejectedWithdrawdata, setRejectedWithdrawdata] = useState(null);
  const [selectrejectedWithdrawdata, setSelectedRejectedWithdrawdata] = useState(null);

  const [appliedApplicationdata, setAppliedApplicationdata] = useState(null);
  const dt = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);
  
  const columns = [
    { field: "isSelected"},
    { field: "id", header: "Application ID" },
    { field: "full_name", header: "Applicant Name" },
    { field: "program", header: "Specialization" },   
    { field: "session", header: "Session" },
    { field: "withdraw_request", header: "Withdraw Status" },
    { field: "withdraw_request_date", header: "Withdraw Requested Date" },
    ];

  const [selectedColumns, setSelectedColumns] = useState(columns); 

  //console.log(error)
  const columnComponents = selectedColumns.map((col) => {
    if (col.field === "isSelected")
      return (
        <Column
          key={col.field}
          selectionMode="multiple"
          style={{ width: "5%", color: "#FF9333" }}   
        />
      )
    if (col.field === "id")     
     return (
       <Column
         key={col.field}
         field={col.field}
         header={col.header}
         style={{ width: "10%" }}   
       />
     );

     return (
      <Column key={col.field.App} field={col.field} header={col.header}  />
    );
  });

  const onUniversityChange = (e) => {
    setselectedUniversity(e.value);
    loadInstitutionData(e.value.name);
  };

  const onInstituteChange = (e) => {
    setselectedInstitution(e.value);
  };

  const onProgramChange = (e) => {
    setSelectedProgram(e.value);
  };

  const onSessionChange = (e) => {
    setSelectedSessionandYear(e.value);
  };

  const onSelectedRowIndexChange = (e) => {
    console.log("selected %d", e);
  };

  const onWithdrawStageChange = (e) => {
    setSelectedCurrentStage(e.value);
    if(AllWithdraw != null && AllWithdraw.length > 0) {
      updateApplicationWithdrawStage(selectedAllWithdrawdata,  e.value.admission_stage_name);
      console.log(e.value.withdraw_status)
    }    
  };

  const updateApplicationWithdrawStage = async (applications, newStage) => {
    for(var i = 0; i < applications.length; i++) {
      const { data, error } = await supabase
        .from('application')
        .update({ withdraw_request: newStage })
        .eq('id', applications[i].id);
    } 
     await loadAllWithdrawData();
     await loadApprovedWithdrawData();
     await   loadRejectedWithdrawData();
    // await loadApplicationData();
    // await loadAppliedApplicationData();
    // await loadApprovedApplicationData();
    // await loadRejectedApplicationData();
  
   }

  const ErrorToast = (props) => {
    toast.error(props, {
      position: toast.POSITION.BOTTOM_RIGHT,
      toastId: '001',
      hideProgressBar:true,
      autoClose:2000
          });
  };

  const SuccessToast = (props) => {
    toast.success(props, {
      position: toast.POSITION.BOTTOM_RIGHT,
      toastId: '001',
      hideProgressBar:true,
      autoClose:2000
          });
  };
 

  async function handleClick(e) {  
    
          }

  return (
    <div>
      <div className="right-align-drp">
        
      <Dropdown
          className="p-button-warning dropdown-adm"
          value={selectedUniversity}
          options={university}
          onChange={onUniversityChange}
          optionLabel="name"
          placeholder="University"
          style={{ color: "red" }}
        />
        <Dropdown
          className="p-button-warning dropdown-adm"
          value={selectedInstitution}
          options={institution}
          onChange={onInstituteChange}
          optionLabel="name"
          placeholder="Institution"
          style={{ color: "red" }}
        />

        <Dropdown
          value={selectedProgram}
          options={program}
          onChange={onProgramChange}
          optionLabel="name"
          placeholder="Program"
          className="dropdown-adm"

        />

        <Dropdown
          value={selectedSessionandYear}
          options={sessionandYear}
          onChange={onSessionChange}
          optionLabel="description"
          placeholder="Session"
          className="dropdown-adm"
        />
       </div>
      <Dropdown style={{ marginLeft: '50rem' }}
              value={selectedCurrentStage}
              options={currentStage}
              onChange={onWithdrawStageChange}
              optionLabel="admission_stage_name"
              placeholder="Actions"
              className="dropdown-adm-yellow-bck"
          />
      <div>
        <TabView>      
            <TabPanel header="All Withdraw">
              <div className="datatablecard">
                    <DataTable
                        value={AllWithdraw}
                        onRowClick={({ index }) => onSelectedRowIndexChange(index)}
                        ref={dt}
                        globalFilter={globalFilter}
                        dataKey="id"
                        selection={selectedAllWithdrawdata}
                        onSelectionChange={(e) => setselectedAllWithdrawdata(e.value)}
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
        </TabPanel>

      <TabPanel header="Approved Withdraw">
              <div className="datatablecard">
                    <DataTable
                        value={approvedWithdrawdata}
                        onRowClick={({ index }) => onSelectedRowIndexChange(index)}
                        ref={dt}
                        globalFilter={globalFilter}
                        dataKey="id"
                        selection={selectedApprovedWithdrawdata}
                        onSelectionChange={(e) => setSelectedApprovedWithdrawdata(e.value)}
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
        </TabPanel> 
      
        <TabPanel header="Rejected Withdraw">
              <div className="datatablecard">
                    <DataTable
                        value={rejectedWithdrawdata}
                        onRowClick={({ index }) => onSelectedRowIndexChange(index)}
                        ref={dt}
                        globalFilter={globalFilter}
                        dataKey="id"
                        selection={selectrejectedWithdrawdata}
                        onSelectionChange={(e) => setSelectedRejectedWithdrawdata(e.value)}
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
        </TabPanel> 

     </TabView>
   </div>
        <ToastContainer />
    </div>
  );
}
export default AdmissionStageProgressWithdrawApplications;
