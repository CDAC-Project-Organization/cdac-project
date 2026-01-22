import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import { Route, Routes } from "react-router";
import ShowDoctors from "./components/ShowDoctors";
import Registration from "./components/Registration";
import AdminDashboard from "./components/Admin/AdminDashboard";
import DoctorList from "./components/Admin/DoctorList";
import PatientList from "./components/Admin/PatientList";
import AddDoctor from "./components/Admin/AddDoctor";
import EditPatient from "./components/Patient/EditPatient";
import Feedback from "react-bootstrap/esm/Feedback";
import FeedbackPage from "./components/Patient/FeedbackPage";
import DoctorEditProfile from "./components/Doctor/DoctorEditProfile";
import PatientDashboard from "./components/Patient/PatientDashboard";
import DoctorDashboard from "./components/Doctor/DoctorDashboard";
import EditDoctor from "./components/Admin/EditDoctor";
import Appointments from "./components/Admin/Appointments ";

function App() {
  return (
    <>
      <Routes>
        <Route index element=<LandingPage /> />
        <Route path="/login" element=<Login /> />
        <Route path="/doctors" element=<ShowDoctors /> />
        <Route path="/signup" element=<Registration /> />
        <Route path="/admin" element=<AdminDashboard /> />
        <Route path="/admin/doctorList" element=<DoctorList /> />
        <Route path="/admin/patientList" element=<PatientList /> />
        <Route path="/admin/addDoctor" element=<AddDoctor /> />
        <Route path="/patient/EditPatient" element=<EditPatient /> />
        <Route path="/patient/FeedbackPage" element=<FeedbackPage /> />
        <Route path="/patient" element=<PatientDashboard /> />
        <Route path="/doctor/doctorEdit" element=<DoctorEditProfile /> />
        <Route path="/doctor" element=<DoctorDashboard /> />
        <Route path="/admin/editDoctor/:id" element= <EditDoctor/> />
        <Route path="/admin/appointments" element=<Appointments/> />
      </Routes>
    </>
  );
}

export default App;
