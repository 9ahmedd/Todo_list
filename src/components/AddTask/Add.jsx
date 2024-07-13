import React, { useEffect, useMemo, useState } from "react";
import "./Add.css";
import add from "../../assets/imgs/add.png";
import { useDispatch } from "react-redux";
import { addApi } from "../../Api/slice/Api";
import { HiMiniFlag } from "react-icons/hi2";
import { Modal, Button } from "react-bootstrap";
import Done from "../ProcessDone/Done";

function Add(props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const dispatch = useDispatch();
 const [showDone, setShowDone] = useState(false);
  const [text, setText] = useState("");
  const [today, setToday] = useState("")
  useEffect(() => {
    setToday(props?.today)
  },[props.today])
 const handleDoneClose = () => setShowDone(false);
 const handleDoneModal = () => {
   setShowDone(true);
   setText("The task has been added successfully");
 };
 const memoDone = useMemo(
   () => ({
     showDone,
     handleDoneClose,
     text,
   }),
   [showDone, handleDoneClose, text]
 );
  const addData = useMemo(
    () => ({
      title,
      type,
      desc,
      date,
      priority,
    }),
    [title, type, desc, date, priority]
  );

  const handleAdd = () => {
    dispatch(addApi(addData)).then((result) => {
      if (result?.payload) {
        setShow(false)
        handleDoneModal();
      }
    });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [high, setHigh] = useState(false);
  const [medium, setMed] = useState(false);
  const [low, setLow] = useState(false);

  return (
    <>
      <div
        className="add-parent"
        style={{ position: "relative" }}
        onClick={handleShow}
      >
        <div
          className="add-child d-flex flex-column align-items-center gap-3"
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            zIndex: 1000,
          }}
        >
          <span>Add Task</span>
          <img src={add} alt="" style={{ width: "90px", cursor: "pointer" }} />
        </div>
      </div>

      <Modal
        className="modal fade modal-add modal-lg"
        show={show}
        onHide={handleClose}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column gap-3">
          <input
            type="text"
            placeholder="Task Name"
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Task Type"
            onChange={(e) => setType(e.target.value)}
          />
          <div
            className="priority w-100 d-flex align-items-center justify-content-between"
            role="group"
            aria-label="Basic radio toggle button group"
          >
            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio1"
              autoComplete="off"
              onChange={() => {
                setHigh(true);
                setMed(false);
                setLow(false);
                setPriority("high");
              }}
            />
            <label
              className="radio1 btn d-flex align-items-center gap-2"
              htmlFor="btnradio1"
              style={{ color: high && "#C24F43" }}
            >
              <HiMiniFlag />
              High
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio2"
              autoComplete="off"
              onChange={() => {
                setMed(true);
                setHigh(false);
                setLow(false);
                setPriority("medium");
              }}
            />
            <label
              className="radio2 btn d-flex align-items-center gap-2"
              htmlFor="btnradio2"
              style={{ color: medium && "#FFAA04" }}
            >
              <HiMiniFlag />
              Medium
            </label>

            <input
              type="radio"
              className="btn-check"
              name="btnradio"
              id="btnradio3"
              autoComplete="off"
              onChange={() => {
                setMed(false);
                setHigh(false);
                setLow(true);
                setPriority("low");
              }}
            />
            <label
              className="radio3 btn d-flex align-items-center gap-2"
              htmlFor="btnradio3"
              style={{ color: low && "#04D2FF" }}
            >
              <HiMiniFlag />
              Low
            </label>
          </div>

          <input type="date" onChange={(e) => setDate(e.target.value)} min={today}/>
          <textarea
            name=""
            id=""
            placeholder="Description"
            rows={5}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleAdd}>
            Save
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Done memoDone={memoDone} />
    </>
  );
}

export default Add;
