import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Index() {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    token || navigate("/signin");
  }, [navigate]);

  return <div>{localStorage.getItem("token")}</div>;
}

export default Index;
