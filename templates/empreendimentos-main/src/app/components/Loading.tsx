import { CircularProgress } from "@mui/material";

const LoadingOverlay = () => {
  return (
    <CircularProgress
      size={30}
      color="primary"
      sx={{
        position: "fixed",
        top: "1%",
        right: "1%",
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    />
  );
};

export default LoadingOverlay;
