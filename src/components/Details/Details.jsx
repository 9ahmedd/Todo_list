import React, { useEffect, useState } from 'react'
import './details.css'
import { Button, Form, Modal } from 'react-bootstrap';

function Details(props) {
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState([]);
    useEffect(() => {
      setShow(props.memoDetails.showDetails);
        setDetails(props.memoDetails.task);
        console.log(props.memoDetails.task);
    }, [props.memoDetails]);
    const close = () => {
        props.memoDetails.handleCloseDetails();
}
  return (
    <>
      <Modal
        className="modal-details"
        show={show}
        onHide={close}
        size="md"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Details Of Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formTaskName">
              <label>Task Name : </label>
              <input type="text" value={details?.title} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskType">
              <label>Task Type : </label>
              <input type="text" value={details?.type} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskType">
              <label>Priority : </label>
              <input type="text" value={details?.priority} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDate">
              <label>Task Date : </label>
              <input type="text" value={details?.date} readOnly />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formTaskDesc">
              <label>Description : </label>
              <textarea rows={3} value={details?.desc} readOnly></textarea>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={close}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Details