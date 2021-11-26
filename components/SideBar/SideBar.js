import { Fragment } from "react";
import styles from "../../styles/Header.module.scss";
import MetisMenu from "react-metismenu";
import { Basicstructure, academics,MasterData, Design, Formstructure, academiccalendar,AdmissionStageProgress} from "./NavItems";
import PerfectScrollbar from "react-perfect-scrollbar";



const SideBar = (props) => {
    return (
        <Fragment>
            <div className="app-sidebar sidebar-shadow">
                {/* <div className="scrollbar-container"> */}
                <PerfectScrollbar>
                    <div className="app-sidebar__inner">
                        
                        <h5 className="app-sidebar__heading">Enterprise Structure</h5>
                        <MetisMenu content={Basicstructure} label="Enterprise Structure"
                        className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                         <h5 className="app-sidebar__heading">Calendars</h5>
                        <MetisMenu content={academiccalendar} 
                        className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                          <h5 className="app-sidebar__heading">Academic Structure</h5>
                        <MetisMenu content={academics} 
                        className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                         <h5 className="app-sidebar__heading">Application Form Templates</h5>
                        <MetisMenu content={Formstructure} 
                        className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                         <h5 className="app-sidebar__heading">Master Data</h5>
                         <MetisMenu content={MasterData} 
                        className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                        
                         <h5 className="app-sidebar__heading">Design</h5>
                        <MetisMenu content={Design} 
                        className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                       
                       <h5 className="app-sidebar__heading">Admission Stage Progress</h5>
                       <MetisMenu content={AdmissionStageProgress} 
                        className="vertical-nav-menu" iconNamePrefix="" classNameStateIcon="pe-7s-angle-down"/>
                    </div>
                    </PerfectScrollbar>
                {/* </div> */}
            </div>
      </Fragment>
      );
}

export default SideBar;