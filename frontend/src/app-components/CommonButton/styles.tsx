const buttonStyle = {
  default: {
    marginLeft: "10px",
    borderRadius: "24px",
    backgroundColor: "#1A237E",
    "&:hover": {
      backgroundColor: "#0d47a1", // Darker shade for hover
    },
    "&:active": {
      backgroundColor: "#0a3c77", // Even darker shade for active
    },
    "&:disabled": {
      backgroundColor: "#c5cae9", // Lighter shade for disabled
      color: "#9e9e9e", // Disabled text color
    },
    height: "40px",
  },
};
export default buttonStyle;
