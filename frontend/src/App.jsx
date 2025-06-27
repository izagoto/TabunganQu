import { Routes, Route, Navigate } from "react-router-dom";
import { Dashboard, Auth } from "@/layouts";
import { SignIn, SignUp } from "@/pages/auth";

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />
      {/* <Route path="/auth/*" element={<Auth />} /> */}
      <Route path="/*" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/income" replace />} />
    </Routes>
  );
}

export default App;
