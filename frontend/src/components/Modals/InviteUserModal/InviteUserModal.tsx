import React, { useEffect } from "react";
import BasicModal from "../../../app-components/BasicModal/BasicModal";
import Box from "@mui/material/Box";
import StyledTextField from "../../../app-components/StyledTextField/StyledTextField";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import Autocomplete from "@mui/material/Autocomplete";
import mockRoles from "./mockRoles";
import modalStyles from "./styles";
import { styled } from "@mui/material/styles";
import Popper from "@mui/material/Popper";

type InviteUserModalProps = {
  open: boolean;
  onClose: () => void;
  inviteNewUser: (data: FormValues) => void;
};

type FormValues = {
  email: string;
  roles: { title: string }[];
};

const defaultInputValues: FormValues = {
  email: "",
  roles: [],
};

const InviteUserModal: React.FC<InviteUserModalProps> = ({
  open,
  onClose,
  inviteNewUser,
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

  const inviteUser: SubmitHandler<FormValues> = (data) => {
    inviteNewUser(data);
  };

  useEffect(() => {
    if (open) {
      reset(defaultInputValues);
    }
  }, [open, reset]);

  const getContent = () => (
    <Box sx={modalStyles.inputFields}>
      <StyledTextField
        placeholder="Email"
        size="small"
        label="Email"
        required
        {...register("email", { required: "E-mail is required" })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Controller
        name="roles"
        control={control}
        rules={{ required: "Role is required" }}
        render={({ field }) => (
          <Autocomplete
            multiple
            id="tags-outlined"
            options={mockRoles}
            sx={{ marginTop: "6px" }}
            getOptionLabel={(option) => option.title}
            filterSelectedOptions
            value={field.value}
            PopperComponent={StyledPopper}
            onChange={(event, newValue) => field.onChange(newValue)}
            renderInput={(params) => (
              <StyledTextField
                {...params}
                placeholder="Roles"
                label="Roles"
                size="small"
                error={!!errors.roles}
                helperText={errors.roles?.message}
              />
            )}
          />
        )}
      />
    </Box>
  );

  return (
    <BasicModal
      open={open}
      onClose={onClose}
      title="Invite User"
      buttonTitle="Invite"
      content={getContent()}
      onSubmit={handleSubmit(inviteUser)}
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
export default InviteUserModal;
