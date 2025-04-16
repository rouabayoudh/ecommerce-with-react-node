import React, { useEffect } from "react";
import BasicModal from "../../../app-components/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import StyledTextField from "../../../app-components/StyledTextField/StyledTextField";
import { useForm, SubmitHandler } from "react-hook-form";
import modalStyles from "../AddProductModal/styles";

type AddProductModalProps = {
  open: boolean;
  onClose: () => void;
  addNewProduct: (data: FormValues) => void;
};

type FormValues = {
  productName: string;
  category: string; // Now it's just a string for direct input
  price: number;
  stock: number;
};

const defaultInputValues: FormValues = {
  productName: "",
  category: "",
  price: 0,
  stock: 0,
};

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onClose,
  addNewProduct,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: defaultInputValues,
  });

  const addProduct: SubmitHandler<FormValues> = (data) => {
    addNewProduct(data);
  };

  useEffect(() => {
    if (open) {
      reset(defaultInputValues);
    }
  }, [open, reset]);

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <StyledTextField
        placeholder="Product Name"
        size="small"
        label="Product Name"
        required
        {...register("productName", { required: "Product name is required" })}
        error={!!errors.productName}
        helperText={errors.productName?.message}
      />
      <StyledTextField
        placeholder="Category"
        size="small"
        label="Category"
        required
        {...register("category", { required: "Category is required" })}
        error={!!errors.category}
        helperText={errors.category?.message}
        sx={{ marginTop: "6px" }}
      />
      <StyledTextField
        placeholder="Price"
        size="small"
        label="Price"
        type="number"
        required
        {...register("price", { required: "Price is required" })}
        error={!!errors.price}
        helperText={errors.price?.message}
        sx={{ marginTop: "6px" }}
      />
      <StyledTextField
        placeholder="Stock"
        size="small"
        label="Stock"
        type="number"
        required
        {...register("stock", { required: "Stock is required" })}
        error={!!errors.stock}
        helperText={errors.stock?.message}
        sx={{ marginTop: "6px" }}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Add Product"
      buttonTitle="Add Product"
      content={getContent()}
      onSubmit={handleSubmit(addProduct)}
    />
  );
};

export default AddProductModal;
