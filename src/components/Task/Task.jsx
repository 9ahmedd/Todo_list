import React, { useEffect, useMemo, useState } from "react";
import "./task.css";
import { CiMenuKebab } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { SiGoogletasks } from "react-icons/si";
import NoTasks from "../../assets/imgs/Frame 2609308@1x.png";
import { useDispatch } from "react-redux";
import { deleteTaskApi } from "../../Api/slice/Api";
import Edite from "../EditeTask/Edite";
import { HiMiniFlag } from "react-icons/hi2";
import Details from "../Details/Details";
import { Button } from "react-bootstrap";
import Done from "../ProcessDone/Done";

function Task(props) {
  const [data, setData] = useState([]);
  const [color, setColor] = useState();

  const dispatch = useDispatch();
  const priorityOrder = { high: 1, medium: 2, low: 3 };

  useEffect(() => {
    const sortedData = props?.data?.slice().sort((a, b) => {
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
    setData(sortedData);
    setColor(props.type);
  }, [props?.data, props.type]);
    const [showDone, setShowDone] = useState(false);
    const [text, setText] = useState("");
    const handleDoneClose = () => setShowDone(false);
    const handleDoneModal = () => {
      setShowDone(true);
      setText("The task was deleted successfully");
    };
    const memoDone = useMemo(
      () => ({
        showDone,
        handleDoneClose,
        text,
      }),
      [showDone, handleDoneClose, text]
    );

  const handleDelete = (id) => {
    dispatch(deleteTaskApi(id)).then((result) => {
      if (result?.payload) {
        const filteredData = data.filter((e) => e.id !== id);
        setData(filteredData);
        handleDoneModal();
      }
    });
  };

  const [showModal, setShowModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const handleEdite = (task) => {
    setCurrentTask(task);
    setShowModal(true);
  };
const [showDetails, setShowDetails] = useState(false);
const [currentDetails, setCurrentDetails] = useState(null);

  const handleClose = () => setShowModal(false);
   const handleSendTask = (task) => {
     setShowDetails(true);
     setCurrentDetails(task);
   };
 const handleCloseDetails = () => setShowDetails(false);
  const memoData = useMemo(
    () => ({
      showModal,
      handleClose,
      task: currentTask,
    }),
    [showModal, handleClose, currentTask]
  );
  const memoDetails = useMemo(
    () => ({
      showDetails,
      handleCloseDetails,
      task: currentDetails,
    }),
    [showDetails, handleCloseDetails, currentDetails]
  );

  
  
 
  return (
    <>
      <div className="tasks d-flex flex-wrap gap-5">
        {data && data.length > 0 ? (
          data.map((task) => (
            <div className="card mt-5" style={{ width: "45%" }} key={task.id}>
              <div className="card-body d-flex flex-column gap-3">
                <div className="header d-flex align-items-center justify-content-between">
                  <div className="header-title d-flex align-items-center gap-2">
                    <SiGoogletasks
                      className={`i ${color ? "icon-task" : "i-task"}`}
                    />
                    <h5 className="card-title">{task.title}</h5>
                  </div>
                  <div className="dropdown">
                    <CiMenuKebab
                      className="dropdown-toggle"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{
                        rotate: "90deg",
                        fontSize: "30px",
                        fontWeight: "900",
                        cursor: "pointer",
                      }}
                    />
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li
                        onClick={() => {
                          handleEdite(task);
                        }}
                      >
                        <a
                          className="dropdown-item d-flex align-items-center gap-2 pt-2 pb-3"
                          href="#"
                          style={{ borderBottom: "1px solid #DDD" }}
                        >
                          <LuPencil
                            style={{
                              color: "#4971D6",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                          />
                          <span
                            style={{
                              color: "#4971D6",
                              fontSize: "18px",
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "500",
                            }}
                          >
                            Edit
                          </span>
                        </a>
                      </li>
                      <Edite memoData={memoData} />
                      <li onClick={() => handleDelete(task.id)}>
                        <a
                          className="dropdown-item d-flex align-items-center gap-2 pt-3 pb-2"
                          href="#"
                        >
                          <RiDeleteBin6Line
                            style={{
                              color: "#EB1010",
                              fontSize: "18px",
                              fontWeight: "500",
                            }}
                          />
                          <span
                            style={{
                              color: "#EB1010",
                              fontSize: "18px",
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: "500",
                            }}
                          >
                            Delete
                          </span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <h6 className="card-subtitle text-muted">{task?.type}</h6>
                <span className="card-text">Date : {task?.date}</span>
                <span
                  className="card-text d-flex align-items-center gap-2"
                  style={{
                    color:
                      task?.priority === "high"
                        ? "#C24F43"
                        : task?.priority === "medium"
                        ? "#FFAA04"
                        : task?.priority === "low"
                        ? "#04D2FF"
                        : null,
                  }}
                >
                  <HiMiniFlag />
                  {task?.priority}
                </span>
                <div className="more w-100 d-flex align-items-center justify-content-end ">
                  <Button
                    variant=""
                    size="sm"
                    style={{
                      width: "fit-content",
                      backgroundColor: color ? "#AD99FF" : "#FF8C04",
                      color: "#FFF",
                      fontFamily: "Poppins, sans-serif",

                      fontWeight: "400",
                      fontSize: "18px",
                    }}
                    onClick={() => {
                      handleSendTask(task);
                    }}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div
            className="w-100 d-flex align-items-center justify-content-center"
            style={{ height: "80vh" }}
          >
            <img
              src={NoTasks}
              className="rounded "
              alt="..."
              style={{ width: "450px", maxWidth: "100%" }}
            />
          </div>
        )}
      </div>
      <Details memoDetails={memoDetails} />
      <Done memoDone={memoDone} />
    </>
  );
}

export default Task;
