import React, { useState } from "react";
import { BsBuildingsFill } from "react-icons/bs";
import { FaAddressBook } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { FaCalendarCheck } from "react-icons/fa6";
import { MdDashboard, MdMenuOpen, MdTaskAlt } from "react-icons/md";
import { TbDeviceIpadMinus } from "react-icons/tb";
import { MdHolidayVillage } from "react-icons/md";
import { FcLeave } from "react-icons/fc";

// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [extended, setExtended] = useState(true);

  const allLinks = [
    {
      icon: <MdDashboard />,
      name: "Dashboard",
      navLinks: [{ to: "/hr/dashboard", label: "Dashboard" }]
    },
    {
      icon: <FaUserCircle />,
      name: "Employee",
      navLinks: [
        { to: "/hr/employee", label: "Employee List" },
        { to: "/hr/salary", label: "Salary" }
      ]
    },
    {
      icon: <FaCalendarCheck />,
      name: "Attendance",
      navLinks: [
        { to: "/hr/attenDance", label: "Create Attendance" },
        { to: "/hr/todaysAttendance", label: "TodaysAttendance" },
        { to: "/hr/viewAttenDance", label: "View Attendance" },
        { to: "/hr/manualAttand", label: "All Emp Attendance" }
        // { to: "/hr/leave-application-hr", label: "View All Leave " }
      ]
    },
    {
      icon: <FcLeave />,
      name: "Leave",
      navLinks: [
        { to: "/hr/hrLeave", label: "Apply Leave" },
        { to: "/hr/leaveApplication", label: "Pending " },
        { to: "/hr/leaveAccepted", label: "Accepted " },
        { to: "/hr/leaveRejected", label: "Rejected " }
      ]
    },
    {
      icon: <MdTaskAlt />,
      name: "Task",
      navLinks: [
        { to: "/hr/newTask", label: "Assign New Task" },
        { to: "/hr/ActiveTask", label: "Active Task" },
        { to: "/hr/taskcancle", label: "Cancelled Task" },
        { to: "/hr/taskcomplete", label: "Completed Task" },
        { to: "/hr/rejectTask", label: "Rejected Task" }
      ]
    },
    {
      icon: <TbDeviceIpadMinus />,
      name: "Access",
      navLinks: [
        { to: "/hr/role", label: "Role" },
        { to: "/hr/position", label: "Position" },
        { to: "/hr/department", label: "Department" }
      ]
    },
    {
      icon: <BsBuildingsFill />,
      name: "Company",
      navLinks: [
        { to: "/hr/company", label: "Company List" }
        // { to: "/hr/employee", label: "Create Employee" },
      ]
    },
    {
      icon: <FaAddressBook />,
      name: "Address",
      navLinks: [
        { to: "/hr/country", label: "Country" },
        { to: "/hr/state", label: "State" },
        { to: "/hr/city", label: "City" }
      ]
    },
    {
      icon: <MdHolidayVillage />,
      name: "Holiday",
      navLinks: [{ to: "/hr/holiday", label: "Leave Calendar" }]
    },
    {
      icon: <MdHolidayVillage />,
      name: "Profile",
      navLinks: [{ to: "/hr/afroz", label: "My Profile" }]
    }
  ];

  const ExtendClick = () => {
    setExtended(extended ? false : true);
  };

  return (
    <div
      style={{
        minHeight: "100%",
        maxHeight: "100%",
        overflowY: "auto",
        overflow: "inherit",
        width: "fit-content",
        backgroundColor: "var(--primaryDashColorDark)"
      }}
      className="d-flex  flex-column gap-2 p-3"
    >
      <h3
        style={{ borderBottom: "3px solid green" }}
        className="fw-bolder text-success justify-content-between py-2 d-flex gap-2"
      >
        <p
          style={{ display: !extended ? "none" : "block" }}
          className="my-auto"
        >
          HR
        </p>{" "}
        <span
          onClick={ExtendClick}
          style={{
            border: "none",
            outline: "none",
            cursor: "pointer",
            transform: `rotate(${!extended ? "180deg" : "0deg"})`
          }}
          className="my-auto p-0 fs-2 text-white"
        >
          <MdMenuOpen />
        </span>
      </h3>

      {allLinks.map(({ icon, name, navLinks }) => (
        <div
          key={name}
          onMouseEnter={() => setActiveCategory(name)}
          onMouseLeave={() => setActiveCategory(null)}
          className="position-relative"
        >
          <button
            style={buttonStyle}
            className="btn p-0 text-white text-start fw-bold gap-2 justify-between w-100 d-flex justify-content-between"
          >
            <div
              style={{ width: "fit-content" }}
              className="d-flex my-auto gap-2"
            >
              <p
                style={{
                  height: "30px",
                  width: "30px",
                  alignItems: "center",
                  color: activeCategory === name ? "#FF9209" : "white"
                }}
                className="m-auto d-flex rounded-5  justify-content-center fs-3"
              >
                {icon}
              </p>
              <p
                style={{ display: !extended ? "none" : "block" }}
                className="my-auto"
              >
                {name}
              </p>
            </div>
            <span
              style={{
                transform: `rotate(${
                  activeCategory === name ? "135deg" : "0deg"
                })`,
                transition: "1s ease",
                display: !extended ? "none" : "block"
              }}
              className="my-auto fs-4"
            >
              +
            </span>
          </button>

          <div
            style={{
              ...dropdownStyle,
              display: activeCategory === name ? "flex" : "none",
              backgroundColor: "var(--primaryDashColorDark)",
              width: "fit-content"
            }}
            className="flex-column position-absolute top-0 start-100 py-2 px-2 gap-2 mt-2  "
          >
            {navLinks.map((link) => (
              <Link className="text-decoration-none" key={link.to} to={link.to}>
                <div className="text-decoration-none flex-nowrap text-start fw-bolder gap-3 text-white d-flex justify-content-between ">
                  <div
                    style={{ borderBottom: "1px solid white" }}
                    className="d-flex gap-1 flex-nowrap"
                  >
                    <p className="m-0">{link.icon}</p>
                    <p style={{ whiteSpace: "pre" }} className="m-auto">
                      {link.label}
                    </p>
                  </div>
                  <span style={{}} className="my-auto ">
                    ›
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const buttonStyle = {
  outline: "none",
  border: "none",
  height: "3rem"
};

const dropdownStyle = {
  width: "250px",
  zIndex: "5",
  borderLeft: "5px solid white"
};

export default Sidebar;
