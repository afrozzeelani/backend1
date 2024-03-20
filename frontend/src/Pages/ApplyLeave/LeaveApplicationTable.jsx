import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button, Table } from "react-bootstrap";
import InnerDashContainer from "../../Component/InnerDashContainer";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const LeaveApplicationEmpTable = (props) => {
  const [leaveApplicationEmpData, setLeaveApplicationEmpData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const userId = props.data && props.data._id;

  const loadLeaveApplicationEmpData = () => {
    axios
      .get(
        `http://localhost:4000/api/leave-application-emp/` +
          localStorage.getItem("_id"),
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then((response) => {
        const leaveApplicationEmpObj = response.data;
        console.log("response", response.data);
        setLeaveApplicationEmpData(response.data);
        setLoading(false);

        const newRowsData = leaveApplicationEmpObj.leaveApplication.map(
          (data) => {
            return {
              data,
              Leavetype: data["Leavetype"],
              FromDate: data["FromDate"].slice(0, 10),
              ToDate: data["ToDate"].slice(0, 10),
              Reasonforleave: data["Reasonforleave"],
              Status: data["Status"]
            };
          }
        );

        setRowData(newRowsData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onLeaveApplicationEmpDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`http://localhost:4000/api/leave-application-emp/${e1}/${e2}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          loadLeaveApplicationEmpData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const status = (s) => {
    if (s == 1) {
      return "Pending";
    }
    if (s == 2) {
      return "Approved";
    }
    if (s == 3) {
      return "Rejected";
    }
    return "Unknown Status";
  };

  const onEdit = (data) => {
    if (data["Status"] === 1) {
      props.onEditLeaveApplicationEmp(data);
    } else {
      window.alert(
        "You cannot edit the application after it's approved or rejected"
      );
    }
  };

  useEffect(() => {
    loadLeaveApplicationEmpData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between py-2">
        <h4 className="fw-bold my-auto"> Leave Application</h4>
        <Button
          variant="primary"
          id="add-button"
          onClick={props.onAddLeaveApplicationEmp}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Apply Leave
        </Button>
      </div>

      <div id="clear-both" />
      {!loading ? (
        <div>
          <Table className="table">
            <thead>
              <tr>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)"
                  }}
                >
                  Leave Type
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)"
                  }}
                >
                  Start Date
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)"
                  }}
                >
                  End Date
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)"
                  }}
                >
                  Remarks
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)"
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((data, index) => (
                <tr key={index}>
                  <td>{data.Leavetype}</td>
                  <td>{data.FromDate}</td>
                  <td>{data.ToDate}</td>
                  <td>{data.Reasonforleave}</td>
                  <td>{status(data.Status)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <div id="loading-bar">
          <RingLoader
            css={override}
            sizeUnit={"px"}
            size={50}
            color={"#0000ff"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
};

export default LeaveApplicationEmpTable;
