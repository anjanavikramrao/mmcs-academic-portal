import { OrganizationChart } from "primereact/organizationchart";
import React from "react";
import { useRouter } from "next/router";

const EducationgroupHierarchy = (props) => {
 
  const { supabase } = props;
  const router = useRouter();
  const { id } = router.query;
  const [selection, setSelection] = React.useState([]);
  const [asscoiateresults, setAsscoiateresults] = React.useState([
    {
      label: "Education Group",
      type: "person",
      className: "p-person",
      expanded: true,
      data: { name: "Bangalore Central" },
      children: [],
    },
  ]);

  React.useEffect(() => {
      const input_id= props.id;
    const getDetails = async () => {
        let { data, error } = await supabase
  .rpc('list_of_asscoiation_egun', {
    input_id
  })

if (error) console.error(error)
else console.log("-----call from new function rpc---",data)
let places = data;
        // sort to ensure you take care of parents befose children
        places = places.sort(
          (i, j) => i.education_group_name - j.education_group_name
        );
        let result = [];
        // you reduce the array
        // the accumulator is used to keep easy access to object already processed
        places.reduce((acc, place) => {
          // create the new object
          let plc = {
            id: place.uni_id,
            label: place.out_label,
            expanded: true,
            data: { name: place.uni_name },
            children: [],
          };

          // if there is a parent
          if (place.education_group_name) {
            // add the current object to the parent
            console.log("plc-------",plc)
            acc[place.education_group_name].children.push(plc);
          } else {
            // or add the current object to the root
            result.push(plc);
          }
          // easy acces to this object
          acc[place.uni_id] = plc;

          return acc;
        }, []);

        console.log(result);
        setAsscoiateresults(result);
    };
    getDetails();
  }, []);


  const nodeTemplate = (node) => {
    return (
      <div>
        <div className="node-header">{node.label}</div>
        <div className="node-content">
          {/* <img alt={node.data.avatar} src={`showcase/demo/images/organization/${node.data.avatar}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} style={{ width: '32px' }} /> */}
          <div>{node.data.name}</div>
        </div>
      </div>
    );
    
  };

  return (
    <div className="organizationchart-demo" style={{ overflow: "auto" }}>
      <h5>Associated Entities</h5>
      <OrganizationChart
        value={asscoiateresults}
        nodeTemplate={nodeTemplate}
        selection={selection}
        selectionMode="multiple"
        onSelectionChange={(event) => setSelection(event.data)}
        className="company"
      ></OrganizationChart>
    </div>
  );
};

export default EducationgroupHierarchy;
