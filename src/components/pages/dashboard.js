import { useEffect, useState } from "react";
import HeaderImage from "../headerImage";
import "./login.css";
import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Dashboard = () => {
  const [message, setMessage] = useState("");
  const [responseData, setResponseData] = useState({});
  const [chartData, setChartData] = useState([]);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: chartData.categories,
      crosshair: true,
      accessibility: {
        description: "Countries",
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: "",
      },
    },

    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
        },
      },
    },
    tooltip: {
      headerFormat: "<b>{point.x}</b><br/>",
      pointFormat: "{series.name}: {point.y}<br/>",
    },
    series: chartData.series,
  };

  useEffect(() => {
    const fetchDashboardCountData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5004/api/projects/getCount",
          {
            headers: { authorization: token },
          }
        );

        setResponseData(response.data);
        setMessage(response.data.message);
      } catch (error) {
        setMessage("Access denied. Please log in.");
      }
    };

    fetchDashboardCountData();
  }, []);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.get(
          "http://localhost:5004/api/projects/getChartData",
          {
            headers: { authorization: token },
          }
        );
        console.log(response);

        setChartData(response.data);
      } catch (error) {
        setMessage("Access denied. Please log in.");
      }
    };

    fetchChartData();
  }, []);

  return (
    <>
      <HeaderImage displayName="Dashboard" />
      <div className="container-dashboard">
        <div class="container mt-3">
          <div class="row">
            <div class="col">
              <div class="d-flex align-items-center">
                <div class="left-line"></div>
                <div class="box">
                  <h3 className="total-projects">Total Projects</h3>
                  <div className="count">{responseData.totalProjects}</div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="d-flex align-items-center">
                <div class="left-line"></div>
                <div class="box ">
                  <h3 className="total-projects">Closed</h3>
                  <div className="count">{responseData.closedProjects}</div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="d-flex align-items-center">
                <div class="left-line"></div>
                <div class="box ">
                  <h3 className="total-projects">Running</h3>
                  <div className="count">{responseData.runningProjects}</div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="d-inline-flex align-items-center ">
                <div class="left-line"></div>
                <div class="box ">
                  <h3 className="total-projects">Closure Delay</h3>
                  <div className="count">{responseData.cancelledProjects}</div>
                </div>
              </div>
            </div>

            <div class="col">
              <div class="d-flex align-items-center">
                <div class="left-line"></div>
                <div class="box ">
                  <h3 className="total-projects">Cancelled</h3>
                  <div className="count">{responseData.cancelledProjects}</div>
                </div>
              </div>
            </div>
          </div>

          <h2 className="department-wise-to">
            Department wise - Total Vs Closed
          </h2>

          <div className="highchart-style">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
