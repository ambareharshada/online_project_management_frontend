import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeaderImage from "../headerImage";
import "./login.css";

const AddProject = () => {
  let startDate, endDate;
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    projectName: "",
    reason: "",
    type: "",
    division: "",
    category: "",
    priority: "",
    department: "",
    startDate: "",
    endDate: "",
    location: "",
    status: "Registered",
  });

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    if (!formData.projectName) {
      newErrors.projectName = "Project Theme required";
    }

    console.log(formData.endDate, formData.startDate);

    if (formData.endDate <= formData.startDate) {
      newErrors.endDate = "End date must be greater than the start date.";
    }

    setErrors(newErrors);

    // Return true if no errors
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmission = async (event) => {
    event.preventDefault();

    // Validate the form
    if (validateForm()) {
      console.log("Form Data:", formData);
      let finalData = {
        projectName: formData.projectName,
        reason: formData.reason ? formData.reason : "Business",
        type: formData.type ? formData.type : "Internal",
        division: formData.division ? formData.division : "Filters",
        category: formData.category ? formData.category : "Quality A",
        priority: formData.priority ? formData.priority : "High",
        department: formData.department ? formData.department : "Strategy",
        startDate: formData.startDate ? formData.startDate : "NA",
        endDate: formData.endDate ? formData.endDate : "NA",
        location: formData.location ? formData.location : "Pune",
        status: "Registered",
      };
      // console.log("final", finalData);

      // Perform your form submission logic here, such as making an API call
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:5004/api/projects/addProject",
          finalData,
          {
            headers: { authorization: token },
          }
        );
        if (response.data.Success === true) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("There was an error!", error.message);
      }
    }
  };
  return (
    <>
      <HeaderImage displayName="Create Project" />
      {/* <div className="container-add-project"></div> */}
      <form onSubmit={handleFormSubmission}>
        <div className="container-add-project">
          {/* first row for project theme and save button */}
          <div class="mt-3 row justify-content-between">
            <div class="col-sm-8 mt-4 mx-4">
              <div class="form-group row">
                <div class="col-sm-10 py-3">
                  <input
                    type="text"
                    className={`form-control form-control-lg input-theme ${
                      errors.projectName ? "is-invalid" : ""
                    }`}
                    id="projectName"
                    name="projectName"
                    value={formData.projectName}
                    onChange={handleInputChange}
                    placeholder="Enter Project Theme"
                  />
                  {errors.projectName && (
                    <div className="text-danger">{errors.projectName}</div>
                  )}
                </div>
              </div>
            </div>
            <div class="col-sm-2 align-content-center web-save-button">
              <button className="save-project">Save Project</button>
            </div>
          </div>

          {/* <!-- Columns start at 50% wide on mobile and bump up to 33.3% wide on desktop --> */}
          <div class="row">
            <div class="col-6 col-md-3 col-sm-6 mx-3 mt-4">
              <label className="mx-3">Reason</label>
              <select
                class="form-control h-50 form-control-lg mx-2 select-input"
                style={{ fontSize: "15px", width: "337px" }}
                value={formData.reason ? formData.reason : "business"}
                name="reason"
                // defaultValue="business"
                onChange={handleInputChange}
              >
                <option selected value="Business">
                  For Business{" "}
                </option>
                <option value="Dealership">For Dealership</option>
                <option value="Transport">For Transport</option>
              </select>
            </div>
            <div class="col-6 col-md-3 mx-3 mt-4">
              {" "}
              <label className="mx-3">Type</label>
              <select
                class="form-control h-50 form-control-lg mx-2 select-input"
                style={{ fontSize: "15px", width: "337px" }}
                value={formData.type}
                name="type"
                onChange={handleInputChange}
              >
                <option selected value="Internal">
                  Internal{" "}
                </option>
                <option value="External">External</option>
                <option value="Vendor">Vendor</option>
              </select>
            </div>
            <div class="col-6 col-md-3 mx-3 mt-4">
              <label className="mx-3">Division</label>
              <select
                class="form-control h-50 form-control-lg mx-2 select-input"
                style={{ fontSize: "15px", width: "337px" }}
                value={formData.division}
                name="division"
                onChange={handleInputChange}
              >
                <option selected value="Filters">
                  Filters{" "}
                </option>
                <option value="Compressor">Compressor</option>
                <option value="Pumps">Pumps</option>
                <option value="Glass">Glass</option>
                <option value="Water heater">Water Heater</option>
              </select>
            </div>
          </div>

          {/* for category, priority, department */}
          <div class="row">
            <div class="col-6 col-md-3 mx-3 mt-4">
              <label className="mx-3">Category</label>
              <select
                class="form-control h-50 form-control-lg mx-2 select-input"
                style={{ fontSize: "15px", width: "337px" }}
                value={formData.category}
                name="category"
                onChange={handleInputChange}
              >
                <option selected value="Quality A">
                  Quality A{" "}
                </option>
                <option value="Quality B">Quality B</option>
                <option value="Quality C">Quality C</option>
                <option value="Quality D">Quality D</option>
              </select>
            </div>
            <div class="col-6 col-md-3 mx-3 mt-4">
              {" "}
              <label className="mx-3">Priority</label>
              <select
                class="form-control h-50 form-control-lg mx-2 select-input"
                style={{ fontSize: "15px", width: "337px" }}
                value={formData.priority}
                name="priority"
                onChange={handleInputChange}
              >
                <option selected value="High">
                  High{" "}
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
              </select>
            </div>
            <div class="col-6 col-md-3 mx-3 mt-4">
              <label className="mx-3">Department</label>
              <select
                class="form-control h-50 form-control-lg mx-2 select-input"
                style={{ fontSize: "15px", width: "337px" }}
                value={formData.department}
                name="department"
                onChange={handleInputChange}
              >
                <option selected value="Strategy">
                  Strategy{" "}
                </option>
                <option value="Finance">Finance</option>
                <option value="Quality">Quality</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Stores">Stores</option>
                <option value="HR">HR</option>
              </select>
            </div>
          </div>

          {/* for start date end date and location */}
          <div class="row">
            <div class="col-6 col-md-3 mx-3 mt-4">
              <label className="mx-3">Start Date as per Project Plan</label>
              <input
                type="date"
                className={`form-control date-picker ${
                  errors.dateOfBirth ? "is-invalid" : ""
                }`}
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                placeholder="D Month Yr"
              />{" "}
            </div>
            <div class="col-6 col-md-3 mx-3 mt-4">
              {" "}
              <label className="mx-3">End Date as per Project Plan</label>
              <input
                type="date"
                className={`form-control date-picker ${
                  errors.dateOfBirth ? "is-invalid" : ""
                }`}
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                placeholder="D Month Yr"
              />{" "}
              {errors.endDate && (
                <div className="text-danger ml-3">{errors.endDate}</div>
              )}
            </div>
            <div class="col-6 col-md-3 mx-3 mt-4">
              <label className="mx-3">Location</label>
              <select
                class="form-control h-50 form-control-lg mx-2 mb-3 select-input"
                style={{ fontSize: "15px", width: "337px" }}
                value={formData.location}
                name="location"
                onChange={handleInputChange}
              >
                <option selected value="Pune">
                  Pune{" "}
                </option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
                <option value="Chennai">Chennai</option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-6 col-md-3 mx-3 "></div>
            <div class="col-6 col-md-3 mx-3 "></div>
            <div class="col-6 col-md-3 mx-3 my-4">
              <label className="mx-1">Status</label>
              <label className="mx-3 ">
                <strong>Registered</strong>
              </label>
            </div>
          </div>
          <div class="row">
            <div class="col-6 col-md-3 mx-3 my-4 mobile-save-button">
              <button className="save-project">Save Project</button>
            </div>
            <div class="col-6 col-md-3 mx-3 "></div>
            <div class="col-6 col-md-3 mx-3 my-4"></div>
          </div>
        </div>
      </form>
    </>
  );
};
export default AddProject;
