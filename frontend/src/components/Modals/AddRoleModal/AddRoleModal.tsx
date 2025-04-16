import React, { useEffect } from "react";
import BasicModal from "../../../app-components/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import StyledTextField from "../../../app-components/StyledTextField/StyledTextField";
import { useForm, SubmitHandler } from "react-hook-form";
import modalStyles from "./styles";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";

type addRoleModalProps = {
  open: boolean;
  onClose: () => void;
  addNewRole: (data: FormValues) => void;
};

type FormValues = {
  name: string;
};

const defaultInputValues: FormValues = {
  name: "",
};

const addRoleModal: React.FC<addRoleModalProps> = ({
  open,
  onClose,
  addNewRole,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: defaultInputValues,
  });

  const addRole: SubmitHandler<FormValues> = (data) => {
    addNewRole(data);
  };

  useEffect(() => {
    if (open) {
      reset(defaultInputValues);
    }
  }, [open, reset]);

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <StyledTextField
        placeholder="Name"
        size="small"
        label="Name"
        required
        {...register("name", { required: "Name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Add New Role"
      buttonTitle="Add"
      content={getContent()}
      onSubmit={handleSubmit(addRole)}
    />
  );
};

const StyledPopper = styled(Popper)(({ theme }) => ({
  "& .MuiAutocomplete-popper": {
    borderRadius: "16px",
    boxShadow: theme.shadows[4],
  },
  "& .MuiAutocomplete-paper": {
    borderRadius: "16px",
    marginTop: theme.spacing(1),
  },
}));
export default addRoleModal;
