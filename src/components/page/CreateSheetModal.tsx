import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import axios from "axios";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "25%",
  height: "20%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const CreateSheetModal = () => {
  const [open, setOpen] = useState(false);
  const [sheetName, setSheetName] = useState<string>("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onClickSendSheetName = () => {
    const data = {
      name: sheetName,
    };
    axios
      .post(`${process.env.REACT_APP_AWS_URL}/create-sheet`, data)
      .then((res) => console.log(res.data.text));
  };
  return (
    <div>
      <IconButton onClick={handleOpen}>
        <NoteAddIcon />
      </IconButton>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <h2>シート名</h2>
          <Box sx={{ display: "flex", gap: 2 }}>
            <input onChange={(e) => setSheetName(e.target.value)} />
            <button onClick={onClickSendSheetName}>作成</button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateSheetModal;
