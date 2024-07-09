import React, { useEffect, useMemo, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./Edite.css";
import { useDispatch } from "react-redux";
import { updateTaskApi } from "../../Api/slice/Api";
import Done from "../ProcessDone/Done";
function Edite(props) {
  const [show, setShow] = useState(false);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [showDone,setShowDone]=useState(false)
  const [text, setText] = useState("")
      const handleDoneClose = () => setShowDone(false)
  const handleDoneModal = () => {
    setShowDone(true);
    setText("The task has been updated successfully");
  }
  const memoDone = useMemo(
    () => ({
      showDone,
      handleDoneClose,
      text,
    }),
    [showDone, handleDoneClose, text]
  );
  useEffect(() => {
    setShow(props.memoData.showModal);
    if (props.memoData.task) {
      setId(props.memoData.task.id);
      setTitle(props.memoData.task.title);
      setType(props.memoData.task.type);
      setDate(props.memoData.task.date);
      setDesc(props.memoData.task.desc);
    }
  }, [props.memoData.showModal, props.memoData.task]);

  const close = () => {
    props.memoData.handleClose();
  };

  const dispatch = useDispatch();

  // Memoize updateData object to avoid unnecessary re-renders
  const updateData = useMemo(
    () => ({
      id: parseInt(id),
      title,
      type,
      date,
      desc,
    }),
    [id, title, type, date, desc]
  );

  const handleUpdate = () => {
    dispatch(updateTaskApi(updateData)).then((result) => {
      if (result?.payload) {
        close();
        handleDoneModal();
      }
    });
  };

  return (
    <>
      <Modal className=" modal-add" size="lg" show={show} onHide={close} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTaskName">
              <label>Task Name : </label>
              <input
                type="text"
                placeholder="Enter task name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskType">
              <label>Task Type : </label>
              <input
                type="text"
                placeholder="Enter task type"
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDate">
              <label>Task Date : </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDesc">
              <label>Description : </label>
              <textarea
                rows={5}
                placeholder="Enter description"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleUpdate}>
            Save
          </Button>
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <Done memoDone={memoDone} />
    </>
  );
}

export default Edite;
