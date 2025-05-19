import { GoogleLogin } from "@react-oauth/google";
import { Box } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const LogInPage = () => {
  const navigate = useNavigate();
  const handleLoginSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      // Send token to backend
      const res = await axios.post(
        "http://localhost:5000/auth/google",
        { token: credential },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Server response:", res.data);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);
    }
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
        />
      </Box>
    </>
  );
};

export default LogInPage;
