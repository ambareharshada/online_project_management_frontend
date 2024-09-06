import React, { useEffect, useState, useRef } from "react";
import HeaderImage from "../headerImage";
import CustomTable from "../reusable-component/Table";
import axios from "axios";
import moment from "moment";
const ProjectList = () => {
  const [responseData, setResponseData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("priority");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Filter projects based on search query and selected department
  const filteredProjects = responseData.filter((element) => {
    const matchesSearch = element.projectName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesReason = element.reason
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = element.type
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory = element.category
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDivision = element.division
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesDepartment = element.department
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesLocation = element.location
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesPriority = element.priority
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = element.status
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return (
      matchesSearch ||
      matchesDepartment ||
      matchesReason ||
      matchesType ||
      matchesPriority ||
      matchesCategory ||
      matchesDivision ||
      matchesLocation ||
      matchesStatus
    );
  });

  // Function to sort projects based on selected criteria
  const sortProjects = (projects) => {
    switch (sortOption) {
      case "priority":
        return projects.sort((a, b) => {
          const priorities = { High: 1, Medium: 2, Low: 3 };
          return priorities[a.priority] - priorities[b.priority];
        });
      case "recentlyModified":
        return projects.sort(
          (a, b) => new Date(b.modifiedDate) - new Date(a.modifiedDate)
        );
      case "startDate":
        return projects.sort(
          (a, b) => new Date(a.startDate) - new Date(b.startDate)
        );
      case "endDate":
        return projects.sort(
          (a, b) => new Date(a.endDate) - new Date(b.endDate)
        );
      case "status":
        return projects.sort((a, b) => a.status.localeCompare(b.status));
      default:
        return projects;
    }
  };

  // Sort filtered projects based on the selected sorting option
  const sortedProjects = sortProjects([...filteredProjects]);

  // Handle sorting option selection
  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setShowSortDropdown(false); // Hide the dropdown after selecting an option
  };

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
    } catch (error) {}
  });

  useEffect(() => {
    fetchProtectedData.current();
  }, []);

  const handleShow = async (value, name) => {
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

      {/* Mobile view project listing page code starts here */}
      <div className="mobile-view">
        <div className="filters mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by project name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {/* Sort Button with Dropdown */}
          <div className="dropdown-menu.show mt-2">
            <button
              className="btn btn-light d-flex align-items-center"
              onClick={() => setShowSortDropdown(!showSortDropdown)}
            >
              <i className="bi bi-sort-down mr-2 "></i> Sort
            </button>
            {showSortDropdown && (
              <ul className="dropdown-menu show">
                <li
                  className="dropdown-item"
                  onClick={() => handleSortOptionClick("priority")}
                >
                  Sort by Priority
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => handleSortOptionClick("recentlyModified")}
                >
                  Sort by Recently Modified
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => handleSortOptionClick("startDate")}
                >
                  Sort by Start Date
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => handleSortOptionClick("endDate")}
                >
                  Sort by End Date
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => handleSortOptionClick("status")}
                >
                  Sort by Status
                </li>
              </ul>
            )}
          </div>
          {/* <i class="bi bi-sort-down"></i>
          <select
            className="form-control mt-2"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="priority">Sort by Priority</option>
            <option value="recentlyModified">Sort by Recently Modified</option>
            <option value="startDate">Sort by Start Date</option>
            <option value="endDate">Sort by End Date</option>
            <option value="status">Sort by Status</option>
          </select> */}
        </div>
      </div>
      {sortedProjects.map((element) => {
        return (
          <>
            <div class="project-card mobile-view">
              <div class="card-body first">
                <div class="d-flex justify-content-between">
                  <h5 class="card-title">{element.projectName}</h5>
                  <span class="status">{element.status}</span>
                </div>
                <div class="row mt-2">
                  <div class="col-12 listing-date">
                    <p class="mb-3">
                      {moment(element.startDate).format("MMM Do YY")} to{" "}
                      {moment(element.endDate).format("MMM Do YY")}
                    </p>
                  </div>
                </div>

                <div class="row listing-details">
                  <div class="col-12">
                    <p class="mb-1">
                      <strong>Reason: </strong> {element.reason}
                    </p>
                    <p class="mb-1">
                      <strong>Type: </strong> {element.type}
                      <strong className="ml-2">Category:</strong>{" "}
                      {element.category}
                    </p>
                    <p class="mb-1">
                      <strong>Division:</strong> {element.division}
                      <strong className="ml-2">Department:</strong>{" "}
                      {element.department}
                    </p>
                    <p class="mb-1">
                      <strong>Location:</strong> {element.location}
                      <strong className="ml-2">Priority:</strong>{" "}
                      {element.priority}
                    </p>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <div class="row mt-3 ">
                  <div class="col-12 d-flex justify-content-around">
                    <button
                      class="status-button"
                      onClick={() => {
                        let START = "START";
                        handleShow(element, START);
                      }}
                    >
                      Start
                    </button>
                    <button
                      class="status-button-another"
                      onClick={() => {
                        let CLOSE = "CLOSE";
                        handleShow(element, CLOSE);
                      }}
                    >
                      Close
                    </button>
                    <button
                      class="status-button-another"
                      onClick={() => {
                        let CANCEL = "CANCEL";
                        handleShow(element, CANCEL);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      })}
    </>
  );
};
export default ProjectList;
