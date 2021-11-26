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
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import Link from "next/link";
import Universitycreationschema from "../../../constants/schemas/Universitycreationschema.json";
import UniversityHierarchy from "../../../components/Hierarchy/UniversityHierarchy";

const Universitydetailedview = (props) => {
  const { supabase } = props;
  const [activeTab, setActiveTab] = React.useState(1);
  const [university, setUniversity] = React.useState({});
  const router = useRouter();
  const { id } = router.query;
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const togglenav = () => setDropdownOpen(!dropdownOpen);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  React.useEffect(() => {
    const getUniversity = async () => {
      const { data, error } = await supabase
        .from("university")
        .select
        // "id,name, registered_country, language , university_type ( code )"
        ()
        .eq("id", parseInt(id));
      if (error) {
        throw error;
      }
      setUniversity(data[0]);
    };
    getUniversity();
  }, []);

  const leftContents = (
    <React.Fragment>
      <div className="p-d-flex p-flex-column">
        <Row>
          <h3 className="surveyheader">University Detail</h3>
        </Row>
        <Row>
          <div className="University-list-Ma">
            <a>University</a>
            <a style={{ color: "#8d939e" }}> /{university.name}</a>
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
        <Link href="/University/Universitylist">
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
      {Universitycreationschema.pages.map((value, index) => {
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
      {Universitycreationschema.pages.map((value, index) => {
        return (
          <>
            {value.elements.map((value1, index1) => {
              count2++;
              var localcount = count2;    
                  return (
                    <>
                      {count2 > 4 && (
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
      {Universitycreationschema.pages.map((value, index) => {
        return (
          <>
            <CardBody>
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
                                    {/* <h1>{value2.name}</h1><h2>{university[value2.name]}</h2>  */}
                                    {university[value2.name] != null &&
                                      value2.name != "logo_url" && (
                                        <>
                                          <Col md="4">
                                            <div className="widget-heading">
                                              {value2.title}
                                            </div>
                                            <div className="widget-subheading">
                                              {university[value2.name]}
                                            </div>
                                          </Col>
                                        </>
                                      )}
                                  </>
                                );
                              })}
                            </Row>
                          </TabPane>
                        )}
                      {value1.title === "MOU Details" &&
                        value1.elements != undefined && (
                          <TabPane tabId={localtqabcount}>
                            <Row>
                              {value1.elements.map((value2) => {
                                return (
                                  <>
                                    {/* <h1>{value2.name}</h1><h2>{university[value2.name]}</h2>  */}
                                    {university[value2.name] != null &&
                                      value2.name != "attachment" && (
                                        <>
                                          <Col md="4">
                                            <div className="widget-heading">
                                              {value2.title}
                                            </div>
                                            <div className="widget-subheading">
                                              {university[value2.name]}
                                            </div>
                                          </Col>
                                        </>
                                      )}
                                  </>
                                );
                              })}
                            </Row>
                          </TabPane>
                        )}
                      {value1.title === "Accreditation Info" &&
                        value1.elements != undefined && (
                          <TabPane tabId={localtqabcount}>
                            <Row>
                              {value1.elements.map((value2) => {
                                return (
                                  <>
                                    {/* <h1>{value2.name}</h1><h2>{university[value2.name]}</h2>  */}
                                    {university[value2.name] != null &&
                                      value2.name != "logo_url" && (
                                        <>
                                          <Col md="4">
                                            <div className="widget-heading">
                                              {value2.title}
                                            </div>
                                            <div className="widget-subheading">
                                              {university[value2.name]}
                                            </div>
                                          </Col>
                                        </>
                                      )}
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
                                    {university[value2.name] != undefined &&
                                      university[value2.name].map(
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
                                    {university[value2.name] != undefined &&
                                      university[value2.name].map(
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
                          <Col md="12">
                            {university.id != undefined && (
                              <UniversityHierarchy
                                id={university.id}
                                supabase={supabase}
                              />
                            )}
                          </Col>
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
                  <h3 className="p-mr-2 lefttoolbartext">{university.name}</h3>
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
                    {university.registered_country}
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
                  <div className="widget-subheading">{university.currency}</div>
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
                    {university.abbreviation}
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
            <Dropdown nav isOpen={dropdownOpen} toggle={togglenav}>
              <DropdownToggle nav caret>
                View More
              </DropdownToggle>
              <DropdownMenu>{renterdropItem()}</DropdownMenu>
            </Dropdown>
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
export default Universitydetailedview;
