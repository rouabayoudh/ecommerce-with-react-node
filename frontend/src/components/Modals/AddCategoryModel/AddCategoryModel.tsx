import React, { useEffect } from "react";
import BasicModal from "../../../app-components/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import StyledTextField from "../../../app-components/StyledTextField/StyledTextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import modalStyles from "./styles";

type AddCategoryModalProps = {
  open: boolean;
  onClose: () => void;
  AddNewCategory: (data: FormValues) => void;
};

type FormValues = {
  category: string;
};

const defaultInputValues: FormValues = {
  category: "",
};

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  open,
  onClose,
  AddNewCategory,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: defaultInputValues,
  });

  const AddCategory: SubmitHandler<FormValues> = (data) => {
    AddNewCategory(data);
  };

  useEffect(() => {
    if (open) {
      reset(defaultInputValues);
    }
  }, [open, reset]);

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <StyledTextField
        placeholder="Category"
        label="Category"
        size="small"
        required
        {...register("category", { required: "Category is required" })}
        error={!!errors.category}
        helperText={errors.category?.message}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Add"
      buttonTitle="Add"
      content={getContent()}
      onSubmit={handleSubmit(AddCategory)}
    />
  );
};

export default AddCategoryModal;
