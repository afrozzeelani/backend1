import React, { useState, useContext } from "react";
import "./LeaveApplicationEmp.css";
import axios from "axios";
import LeaveApplicationEmpTable from "./LeaveApplicationTable.jsx";
import LeaveApplicationEmpForm from "./LeaveApplicationForm.jsx";
import LeaveApplicationEmpFormEdit from "./LeaveApplicationFormEdit.jsx";
import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext.js";
import { v4 as uuid } from "uuid";
const LeaveApplicationEmp = (props) => {
  const [table, setTable] = useState(true);
  const [editForm, setEditForm] = useState(false);
  const [editData, setEditData] = useState({});
  const [leaveRequestDone, setLeaveRequestDone] = useState(false);
  const email = localStorage.getItem("Email");
  const { socket } = useContext(AttendanceContext);
  const handleLeaveApplicationEmpSubmit = (event) => {
    event.preventDefault();
    console.log("id", event.target[0].value, event.target[1].value);
    setTable(true);

    let body = {
      Leavetype: event.target[0].value,
      FromDate: event.target[1].value,
      ToDate: event.target[2].value,
      Status: event.target[3].value,
      managerEmail: event.target[4].value,
      hrEmail: event.target[5].value,
      Reasonforleave: event.target[6].value
    };
    console.log(body);
    axios
      .post(
        "http://localhost:4000/api/leave-application-emp/" +
          localStorage.getItem("_id"),
        body,
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then((res) => {
        setTable(false);
        setTable(true);
        setLeaveRequestDone(!leaveRequestDone);
        const taskId = uuid();
        const data = {
          taskId,
          managerEmail: body.managerEmail,
          hrEmail: body.hrEmail,
          message: `Leave request by ${email}`,
          status: "unseen",
          path: "leaveApplication"
        };
        socket.emit("leaveNotification", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAddLeaveApplicationEmp = () => {
    console.log("clicked1");
    setTable(false);
  };

  const handleEditLeaveApplicationEmp = (e) => {
    console.log(e);
    console.log("clicked6");
    setEditForm(true);
    setEditData(e);
  };

  const handleFormClose = () => {
    console.log("clicked1");
    setTable(true);
  };

  const handleEditFormClose = () => {
    console.log("clicked5");
    setEditForm(false);
  };

  const handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    console.log("zero data", newInfo.target[0].value);
    let body = {
      Leavetype: newInfo.target[0].value,
      FromDate: newInfo.target[1].value,
      ToDate: newInfo.target[2].value,
      Status: newInfo.target[3].value,
      managerEmail: newInfo.target[4].value,
      hrEmail: newInfo.target[5].value,
      Reasonforleave: newInfo.target[6].value
    };

    console.log("update", body);

    axios
      .put(
        "http://localhost:4000/api/leave-application-emp/" +
          localStorage.getItem("_id"),
        body,
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then((res) => {
        setTable(false);
        setTable(true);
      })
      .catch((err) => {
        console.log(err);
      });

    setEditForm(false);
  };
  const handleAddFormGenderChange = () => {};

  return (
    <React.Fragment>
      {table ? (
        editForm ? (
          <LeaveApplicationEmpFormEdit
            onLeaveApplicationEmpEditUpdate={
              handleLeaveApplicationEmpEditUpdate
            }
            onFormEditClose={handleEditFormClose}
            editData={editData}
          />
        ) : (
          <LeaveApplicationEmpTable
            onAddLeaveApplicationEmp={handleAddLeaveApplicationEmp}
            onEditLeaveApplicationEmp={handleEditLeaveApplicationEmp}
            data={props.data}
            leaveRequestDone={leaveRequestDone}
          />
        )
      ) : (
        <LeaveApplicationEmpForm
          onLeaveApplicationEmpSubmit={handleLeaveApplicationEmpSubmit}
          onFormClose={handleFormClose}
          onGenderChange={handleAddFormGenderChange}
        />
      )}
    </React.Fragment>
  );
};

export default LeaveApplicationEmp;

// import React, { useState } from "react";
// import axios from "axios";
// import "./LeaveApplicationEmp.css";
// import LeaveApplicationEmpTable from "./LeaveApplicationTable.jsx";
// import LeaveApplicationEmpForm from "./LeaveApplicationForm.jsx";
// import LeaveApplicationEmpFormEdit from "./LeaveApplicationFormEdit.jsx";

// const LeaveApplicationEmp = (props) => {
//   const [table, setTable] = useState(true);
//   const [editForm, setEditForm] = useState(false);
//   const [editData, setEditData] = useState({});

//   const handleLeaveApplicationEmpSubmit = (event) => {
//     event.preventDefault();
//     console.log("id", event.target[0].value, event.target[1].value);
//     setTable(true);

//     let body = {
//       Leavetype: event.target[0].value,
//       FromDate: event.target[1].value,
//       ToDate: event.target[2].value,
//       Status: event.target[3].value,
//       Reasonforleave: event.target[4].value
//     };

//     axios
//       .post(
//         "http://localhost:4000/api/leave-application-emp/" +
//           localStorage.getItem("_id"),
//         body,
//         {
//           headers: {
//             authorization: localStorage.getItem("token") || ""
//           }
//         }
//       )
//       .then((res) => {
//         setTable(false);
//         setTable(true);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const handleAddLeaveApplicationEmp = () => {
//     console.log("clicked1");
//     setTable(false);
//   };

//   const handleEditLeaveApplicationEmp = (e) => {
//     console.log(e);
//     console.log("clicked6");
//     setEditForm(true);
//     setEditData(e);
//   };

//   const handleFormClose = () => {
//     console.log("clicked1");
//     setTable(true);
//   };

//   const handleEditFormClose = () => {
//     console.log("clicked5");
//     setEditForm(false);
//   };

//   const handleLeaveApplicationEmpEditUpdate = (info, newInfo) => {
//     newInfo.preventDefault();
//     console.log("zero data", newInfo.target[0].value);
//     let body = {
//       Leavetype: newInfo.target[0].value,
//       FromDate: newInfo.target[1].value,
//       ToDate: newInfo.target[2].value,
//       Status: newInfo.target[3].value,
//       Reasonforleave: newInfo.target[4].value
//     };

//     console.log("update", body);

//     axios
//       .put(
//         "http://localhost:4000/api/leave-application-emp/" + info["_id"],
//         body,
//         {
//           headers: {
//             authorization: localStorage.getItem("token") || ""
//           }
//         }
//       )
//       .then((res) => {
//         setTable(false);
//         setTable(true);
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     setEditForm(false);
//   };
//   const handleAddFormGenderChange = () => {};

//   return (
//     <React.Fragment>
//       {table ? (
//         editForm ? (
//           <LeaveApplicationEmpFormEdit
//             onLeaveApplicationEmpEditUpdate={
//               handleLeaveApplicationEmpEditUpdate
//             }
//             onFormEditClose={handleEditFormClose}
//             onFormClose={handleFormClose}
//             editData={editData}
//           />
//         ) : (
//           <LeaveApplicationEmpTable
//             onAddLeaveApplicationEmp={handleAddLeaveApplicationEmp}
//             onEditLeaveApplicationEmp={handleEditLeaveApplicationEmp}
//             data={props.data}
//           />
//         )
//       ) : (
//         <LeaveApplicationEmpForm
//           onLeaveApplicationEmpSubmit={handleLeaveApplicationEmpSubmit}
//           onFormClose={handleFormClose}
//           onGenderChange={handleAddFormGenderChange}
//         />
//       )}
//     </React.Fragment>
//   );
// };

// export default LeaveApplicationEmp;
