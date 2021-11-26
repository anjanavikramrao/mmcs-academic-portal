import React from "react";
import { Toolbar } from "primereact/toolbar";
import { Button } from "primereact/button";
import { useRouter } from "next/router";
import {
  Card,
  CardBody,
  CardHeader,
  CardSubtitle,
  CardTitle,
  Col,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Link from "next/link";
import Educationgroup_creation from "../../../constants/schemas/AddEducationgroupschema.json";
import EducationgroupHierarchy from "../../../components/Hierarchy/EducationgroupHierarchy";
const Educationgroupdetailedview = (props) => {
  const { supabase } = props;
  const router = useRouter();
  const { id } = router.query;
  const [activeTab, setActiveTab] = React.useState(1);
  const [educationgroupdata, setEducationgroup] = React.useState({});
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [isDropdown, setIsDropdown] = React.useState(false);

  const togglenav = () => setDropdownOpen(!dropdownOpen);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const getLanguage = async (code) => {
    const { data, error } = await supabase
      .from("language")
      .select()
      .eq("code", code);
    if (error) {
      throw error;
    }
    return data[0];
  };

  const getParent = async (id) => {
    const { data, error } = await supabase
      .from("education_group")
      .select()
      .eq("id", parseInt(id));
    if (error) {
      throw error;
    }
    return data[0];
  };

  React.useEffect(() => {
    const getDetails = async () => {
      const { data, error } = await supabase
        .from("education_group")
        .select()
        .eq("id", parseInt(id));

      if (error) {
        throw error;
      }
      if (data.length === 0) {
        console.log("No Data Found");
        router.push("/EducationGroup/Educationgrouplist");
      }
      let childFunctions = await Promise.all([
        getLanguage(data[0].language),
        getParent(data[0].id),
      ]);
      data[0].language = childFunctions[0];
      data[0].parenteducationgroup = childFunctions[1];
      setEducationgroup(data[0]);
    };
    getDetails();
  }, []);

  const leftContents = (
    <React.Fragment>
      <div className="p-d-flex p-flex-column">
        <Row>
          <h3 className="surveyheader">Education Group Detail</h3>
        </Row>
        <Row>
          <div className="University-list-Ma">
            <a>Education Group</a>
            <a style={{ color: "#8d939e" }}>
              {" "}
              /{educationgroupdata.educationgroup_name}
            </a>
          </div>
        </Row>
      </div>
    </React.Fragment>
  );

  const rightContents = (
    <React.Fragment>
      <div className="p-d-flex">
        <Button
          icon="pi pi-pencil"
          className="p-button-warning p-mr-2 p-button-rounded p-button-text"
        />
        <Link href="/EducationGroup/Educationgrouplist">
          <Button
            icon="pi pi-angle-double-right"
            label="Back to list"
            style={{ color: "#f7b422" }}
            className="p-button-link"
          />
        </Link>
      </div>
    </React.Fragment>
  );
  var count = 0;
  var count2 = 0;
  const renterNavItem = () => (
    <>
      {Educationgroup_creation.pages.map((value, index) => {
        return (
          <>
            {value.elements.map((value1, index1) => {
              count++;
              var localcount = count;
              return (
                <>
                  {count < 5 && (
                    <NavItem active="true">
                      <NavLink
                        className={classnames({
                          active: activeTab === count,
                        })}
                        onClick={() => {
                          toggle(localcount);
                        }}
                      >
                        {value1.title}
                      </NavLink>
                    </NavItem>
                  )}
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
  const renterdropItem = () => (
    <>
      {Educationgroup_creation.pages.map((value, index) => {
        return (
          <>
            {value.elements.map((value1, index1) => {
              count2++;
              var localcount = count2;

              return (
                <>
                  {localcount > 4 ? (
                    <DropdownItem header>
                      <NavLink
                        className={classnames({
                          active: activeTab === count2,
                        })}
                        onClick={() => {
                          toggle(localcount);
                        }}
                      >
                        {value1.title}
                      </NavLink>
                    </DropdownItem>
                  ) : (
                    false
                  )}
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
  var tabcount = 0;
  const tabpanel = () => (
    <>
      {Educationgroup_creation.pages.map((value, index) => {
        return (
          <>
            <CardBody className="tabbody">
              <TabContent activeTab={activeTab}>
                {value.elements.map((value1, index1) => {
                  tabcount++;
                  var localtqabcount = tabcount;

                  return (
                    <>
                      {" "}
                      {value1.title === "Basic Details" &&
                        value1.elements != undefined && (
                          <TabPane tabId={localtqabcount}>
                            <Row>
                              {value1.elements.map((value2) => {
                                return (
                                  <>
                                    {educationgroupdata[value2.name] != null &&
                                      value2.name != "logo_url" &&
                                      value2.name != "parenteducationgroup" &&
                                      value2.name != "operating_countries" && (
                                        <>
                                          <Col md="4">
                                            <div className="widget-heading">
                                              {value2.title}
                                            </div>
                                            <div className="widget-subheading">
                                              {educationgroupdata[value2.name]}
                                            </div>
                                          </Col>
                                        </>
                                      )}
                                    <>
                                      {value2.name == "parenteducationgroup" &&
                                 (
                                          <>
                                            <Col md="4">
                                              <div className="widget-heading">
                                                {value2.title}
                                              </div>
                                              <div className="widget-subheading">
                                                {
                                                  educationgroupdata[value2.name.parenteducationgroup]
                                                }
                                              </div>
                                            </Col>
                                          </>
                                        )}
                                    </>
                                  </>
                                );
                              })}
                            </Row>
                          </TabPane>
                        )}
                      {value1.title === "Key People" &&
                        value1.elements != undefined && (
                          <TabPane tabId={localtqabcount}>
                            {value1.elements.map((value2) => {
                              return (
                                <>
                                  <Row>
                                    {educationgroupdata[value2.name] !=
                                      undefined &&
                                      educationgroupdata[value2.name].map(
                                        (value3, index) => {
                                          return (
                                            <Col md="4">
                                              <Card className="cardinfotabs">
                                                <CardSubtitle className="cardsubtitleinfo">
                                                  {value3.title}.
                                                  {value3.staffname}
                                                </CardSubtitle>
                                                <CardBody className="infocardbody">
                                                  {value3.role}
                                                  <br></br>
                                                  {value3.email}
                                                  <br></br>
                                                  {value3.contactnumber}
                                                
                                                </CardBody>
                                              </Card>
                                            </Col>
                                          );
                                        }
                                      )}{" "}
                                  </Row>
                                </>
                              );
                            })}
                          </TabPane>
                        )}
                      {value1.title === "Address" &&
                        value1.elements != undefined && (
                          <TabPane tabId={localtqabcount}>
                            {value1.elements.map((value2) => {
                              return (
                                <>
                                  <Row>
                                    {educationgroupdata[value2.name] !=
                                      undefined &&
                                      educationgroupdata[value2.name].map(
                                        (value3, index) => {
                                          return (
                                            <Col md="4">
                                              <Card className="infocard">
                                                <CardTitle className="inforcardtitle">
                                                  {value3.addresstype}{" "}
                                                </CardTitle>
                                                <CardSubtitle>
                                                  {value3.contactperson}
                                                </CardSubtitle>
                                                <CardBody className="infocardbody">
                                                  {value3.address1},{" "}
                                                  {value3.address2},{" "}
                                                  {value3.address3},{" "}
                                                  {value3.city}, {value3.state}{" "}
                                                  {value3.zip}
                                                </CardBody>
                                              </Card>
                                            </Col>
                                          );
                                        }
                                      )}{" "}
                                  </Row>
                                </>
                              );
                            })}
                          </TabPane>
                        )}
                      {value.elements.length == index1 + 1 && (
                        <TabPane tabId={15}>
                          <Row>
                            <Col md="12">
                              {educationgroupdata.id!=undefined &&  <EducationgroupHierarchy id={educationgroupdata.id} supabase={supabase} /> }
                            </Col>
                          </Row>
                        </TabPane>
                      )}
                    </>
                  );
                })}
              </TabContent>
            </CardBody>
          </>
        );
      })}
    </>
  );
  return (
    <div>
      <Toolbar
        className="p-mb-4"
        id="tool"
        left={leftContents}
        right={rightContents}
      />
      <Card className="main-card mb-3">
        <Row className="no-gutters">
          <Col md="3" xl="3">
            <div className="widget-content">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  {/* <div className="widget-heading">logo</div> */}
                  <div className="widget-subheading">
                  {/* {console.log("==logo",`${educationgroupdata.logo_url}`)} */}
                    {educationgroupdata.logo_url!=undefined &&
                   
                    <img
                      src={`${educationgroupdata.logo_url}`}
                      alt="logo"
                      width="100%"
                      height={165}
                      className="imagelogo"
                    />
                    
                  }
                  </div>
                  {/* <h3 className="p-mr-2 lefttoolbartext">{educationgroupdata.educationgroup_name}</h3> */}
                </div>
              </div>
            </div>
          </Col>
          <Col md="3" xl="3">
            <div className="widget-content">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="widget-heading">Registered Country</div>
                  <div className="widget-subheading">
                    {educationgroupdata.country_registered}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="3" xl="3">
            <div className="widget-content">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="widget-heading">Currency</div>
                  <div className="widget-subheading">
                    {educationgroupdata.currency}
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md="3" xl="3">
            <div className="widget-content">
              <div className="widget-content-wrapper">
                <div className="widget-content-left">
                  <div className="widget-heading">Abbreviation</div>
                  <div className="widget-subheading">
                    {educationgroupdata.abbreviation}
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
      <Card className="tabcard">
        <CardHeader>
          <Nav justified>
            {renterNavItem()}
            {isDropdown && (
              <Dropdown nav isOpen={dropdownOpen} toggle={togglenav}>
                <DropdownToggle nav caret>
                  View More
                </DropdownToggle>
                <DropdownMenu>{renterdropItem()}</DropdownMenu>
              </Dropdown>
            )}
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === 15 })}
                onClick={() => {
                  toggle(15);
                }}
              >
                Associated Entities
              </NavLink>
            </NavItem>
          </Nav>
        </CardHeader>
      </Card>
      {tabpanel()}
    </div>
  );
};
export default Educationgroupdetailedview;
