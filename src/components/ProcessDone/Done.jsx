import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Animation from "../../assets/imgs/Animation - 1708766872970 (1).gif";

function Done(props) {
  const [done, setDone] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    setDone(props.memoDone.showDone);
    setText(props.memoDone.text);
  }, [props.memoDone]);

  const doneClose = () => {
      props.memoDone.handleDoneClose();
      window.location.reload();
  };

  return (
    <>
      <Modal show={done} onHide={doneClose}>
        <Modal.Body
          style={{
            textAlign: "center",
            padding: "20px 50px 0",
          }}
        >
          <img src={Animation} alt="" />
          <h3 style={{ color: "#333", fontWeight: "600",marginTop:"20px"}}>{text}</h3>
          <p
            style={{
              color: "#333",
              fontWeight: "500",
              padding: "20px 20px 0",
              marginBottom: "0",
            }}
          ></p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: "none", padding: "20px 0 50px" }}>
          <Button variant="secondary mx-auto w-50" onClick={doneClose} size="lg">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Done;
