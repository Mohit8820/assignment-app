import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import File from "./student/components/details/ModalElements/File";
import Home from "./student/pages/Home";
import AssignmentsPage from "./student/pages/AssignmentsPage";
import MainNavigation from "./shared/components/Navigation/MainNavigation";
import GlobalState from "./contexts/GlobalState";
import "./App.css";

const App = () => {
  const queryParams = new URLSearchParams(window.location.search);
  const student_id = queryParams.get("student_id");
  const subject_id = queryParams.get("subject_id");

  const [ids, setIds] = useState({
    student_id: student_id,
    subject_id: subject_id,
  });

  return (
    <GlobalState.Provider value={[ids, setIds]}>
      <Router>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/assignment" element={<AssignmentsPage ids={ids} />} />
            <Route path="/mentor" element={<h3>mentor</h3>} />
            <Route path="*" element={<Navigate replace to="/assignment" />} />
          </Routes>
        </main>
      </Router>
    </GlobalState.Provider>
  );
};

export default App;
