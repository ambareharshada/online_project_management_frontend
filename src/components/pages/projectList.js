import React, { useEffect, useState, useRef } from "react";
import HeaderImage from "../headerImage";
import CustomTable from "../reusable-component/Table";
import axios from "axios";
const ProjectList = () => {
  const [responseData, setResponseData] = useState([]);

  const fetchProtectedData = useRef(async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        "http://localhost:5004/api/projects/getAllProjects",
        {
          headers: { authorization: token },
        }
      );
      setResponseData(response.data);
    } catch (error) {
    }
  });

  useEffect(() => {
    fetchProtectedData.current();
  }, []);

  const handleShow = async (value, name) => {
    console.log(value, "STatus...");
    console.log(name, "STatus.Name..");
    let changeStatus = "";
    try {
      const token = localStorage.getItem("token");
      if (name === "START") {
        changeStatus = "Running";
        console.log("its start");
      } else if (name === "CLOSE") {
        changeStatus = "Close";
        console.log("its close");
      } else {
        changeStatus = "Cancel";
        console.log("its cancelled...");
      }
      let payload = {
        status: changeStatus,
        _id: value._id,
      };

      const response = await axios.put(
        "http://localhost:5004/api/projectStatusChange",
        payload,
        {
          headers: { authorization: token },
        }
      );
      console.log(response);
      fetchProtectedData.current();
    } catch (error) {
      console.log(error);
    }
  };
  const columns = React.useMemo(
    () => [
      { Header: "Project Name", accessor: "projectName" },
      { Header: "Reason", accessor: "reason" },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Division",
        accessor: "division",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Priority",
        accessor: "priority",
      },
      {
        Header: "Dept.",
        accessor: "department",
      },
      {
        Header: "Location",
        accessor: "location",
      },
      {
        Header: "Status",
        accessor: "status",
        Cell: ({ row }) => {
          return (
            <span>{row.original.status ? row.original.status : "N/A"}</span>
          );
        },
      },
      {
        Header: " ",
        accessor: "",
        Cell: ({ row }) => {
          return (
            <>
              <span
                className="btn btn-primary start"
                onClick={() => {
                  let START = "START";
                  handleShow(row.original, START);
                }}
              >
                Start
              </span>
              <span
                className="btn btn-outline-primary close-btn"
                onClick={() => {
                  let CLOSE = "CLOSE";
                  handleShow(row.original, CLOSE);
                }}
              >
                Close
              </span>
              <span
                className="btn btn-outline-primary close-btn"
                onClick={() => {
                  let CANCEL = "CANCEL";
                  handleShow(row.original, CANCEL);
                }}
              >
                Cancel
              </span>
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <>
      <HeaderImage displayName="Project List" />
      <div className="main-table">
        <CustomTable
          columns={columns}
          data={responseData}
          headerNames={responseData}
        />
      </div>
    </>
  );
};
export default ProjectList;
