import { Route, Routes } from "react-router-dom";

import Index from "./pages/index";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";

function App() {
  return (
    <Routes>
      <Route element={<SignUp />} path="/signup" />
      <Route element={<SignIn />} path="/signin" />
      <Route element={<Index />} path="/" />
    </Routes>
  );
}

export default App;
