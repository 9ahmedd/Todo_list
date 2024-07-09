import React, { useEffect, useMemo, useState } from 'react'
import './home.css'

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { RiArrowDropDownLine } from "react-icons/ri";
import group from "../../assets/imgs/Group.png"
import calender from "../../assets/imgs/f7_calendar-today@1x.png"
import day from "../../assets/imgs/Group@1x.png"
import logo from "../../assets/imgs/216883dc5f4e52de9d4be565d51c5085 (1).png"
import { MdOutlineUpcoming } from "react-icons/md";
import Task from '../../components/Task/Task';
import { useDispatch } from 'react-redux';
import { todoApi } from '../../Api/slice/Api';
import Add from '../../components/AddTask/Add';


 function getFormattedTodayDate() {
   const today = new Date();
   const day = String(today.getDate()).padStart(2, "0");
   const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
   const year = today.getFullYear();
   return `${year}-${month}-${day}`;
 }
function Home() {
    const today = new Date();
  const dayOfMonth = today.getDate();
  const [type, setType] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [coming, setComing] = useState([]);
const [border,setBorder] = useState(false)
 
  const TodayDate = useMemo(() => getFormattedTodayDate(),[]);
  console.log(TodayDate)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(todoApi()).then((result) => {
      console.log(result);
      if (result?.payload) {
        const todayTasks = result.payload.filter(
          (task) => task.date === TodayDate
        );
        const comingTasks = result.payload.filter(
          (task) => task.date !== TodayDate
        );

        setTasks(todayTasks);
        setComing(comingTasks);
      }
    });
  }, [type]);
 
  return (
    <>
      <div className="main ">
        <div className="container-fluid position-relative">
          <Row>
            <Col lg={3} md={5} sm={12}>
              <div className="side-user">
                <div className="user d-flex align-items-center gap-3 ps-2 pe-2 pt-4 pb-4">
                 
                  
                    <img src={logo} alt="" />
                    <h4>TODO-LIST</h4>
                    
                 
                </div>
              </div>
              <div className="lists">
                <div className="on-list d-flex flex-column  gap-3 pt-4 pb-4 ps-2 pe-2">
                  <h4>Lists</h4>
                  <div className="options d-flex flex-column  gap-3">
                    <div
                      className="today d-flex align-items-center gap-3"
                      onClick={() => {
                        setType(false);
                        setBorder(false);
                      }}
                      style={{ borderColor: border ? "#FFF6F5" : "#FF8C04" }}
                    >
                      <div className="day">
                        <img src={group} alt="" />
                        <span>{dayOfMonth}</span>
                      </div>
                      <span className="title">Today</span>
                    </div>
                    <div
                      className="coming d-flex align-items-center gap-3"
                      onClick={() => {
                        setType(true);
                        setBorder(true);
                      } }
                      style={{ borderColor: border ? "#AD99FF" : "#F7F9FA" }}
                    >
                      <div className="come">
                        <img src={calender} alt="" />
                      </div>
                      <span className="title">Upcoming</span>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={9} md={7} sm={12}>
              <div className="type-list">
                <div className="types pt-4 pb-4">
                  {type === false && (
                    <>
                      <div className="type-one d-flex align-items-center gap-3 ">
                        <div className="typeOne-day">
                          <img src={day} alt="" />
                          <span>{dayOfMonth}</span>
                        </div>
                        <span className="title">Today</span>
                      </div>

                      <Task data={tasks} type={type} />
                    </>
                  )}
                  {type === true && (
                    <>
                      <div className="type-two d-flex align-items-center gap-3">
                        <MdOutlineUpcoming className="come-icon" />

                        <span className="title">Upcoming</span>
                      </div>
                      <Task data={coming} type={type} />
                    </>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <Add />
    </>
  );
}

export default Home