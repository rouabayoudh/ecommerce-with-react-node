import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { styled } from "@mui/material/styles";
import CommonButton from "../../app-components/CommonButton/CommonButton";

const ModalWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  borderRadius: "24px",
  boxShadow: theme.shadows[5],
  padding: theme.spacing(0),
}));

const ModalTitle = styled(Box)(({ theme }) => ({
  backgroundColor: "rgba(158, 147, 147, 0.15)",
  padding: theme.spacing(2),
  borderRadius: "24px 24px 0 0",
  marginBottom: theme.spacing(2),
}));

const ModalInputFields = styled(Box)(({ theme }) => ({
  marginLeft: theme.spacing(4),
  marginRight: theme.spacing(4),
}));

const ModalButtons = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  display: "flex",
  justifyContent: "end",
  backgroundColor: "rgba(158, 147, 147, 0.15)",
  padding: theme.spacing(2),
  borderRadius: "0 0 24px 24px",
}));

const BasicModal = ({
  open,
  onClose,
  title,
  buttonTitle,
  content,
  onSubmit,
}) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalWrapper>
        <ModalTitle>
          <Typography variant="h5">{title}</Typography>
        </ModalTitle>
        <ModalInputFields>{content}</ModalInputFields>
        <ModalButtons>
          <CommonButton variant="contained" onClick={onSubmit}>
            {buttonTitle}
          </CommonButton>
          <CommonButton
            sx={{
              backgroundColor: "#B0B0B0",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#9E9E9E",
              },
            }}
            onClick={onClose}
          >
            Cancel
          </CommonButton>
        </ModalButtons>
      </ModalWrapper>
    </Modal>
  );
};

export default BasicModal;
