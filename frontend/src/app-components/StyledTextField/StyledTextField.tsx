import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    position: "relative",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E3E7",
      borderRadius: "24px",
      borderWidth: "1px",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#6F7E8C",
      borderWidth: "1px",
    },
    "&.Mui-error fieldset": {
      borderColor: "#D32F2F",
    },
    "&.Mui-error.Mui-focused fieldset": {
      borderColor: "#D32F2F",
      borderWidth: "1px",
    },
  },
  "& label": {
    color: "#A0AAB4",
  },
  "& label.Mui-focused": {
    color: "#A0AAB4",
  },
  "& .MuiInputBase-input": {
    "&::placeholder": {
      opacity: 0,
    },
    "&:focus::placeholder": {
      opacity: 0.4,
    },
  },
  "& .MuiFormHelperText-root": {
    color: "#D32F2F",
    position: "absolute",
    bottom: "-20px",
    left: 0,
    width: "100%",
    fontSize: "0.75rem",
    lineHeight: "1.2rem",
  },
  "& .MuiFormHelperText-root.Mui-error": {
    color: "#D32F2F",
  },
  "& label.Mui-error": {
    color: "#D32F2F",
  },
});

export default StyledTextField;
