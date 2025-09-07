import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.jsx';
import Profile from './Profile.jsx';
import MyMentor from './MyMentor.jsx';
import Chat from './Chat.jsx';
import Petition from './Petition.jsx';
import Apply from './Apply.jsx';
import MyMentee from './MyMentee.jsx';
import ListOfStudents from './ListOfStudents.jsx';
// import MentorApplications from './ListOfMentors.jsx';
import AssignMentor from './AssignMentor.jsx';
import AssignStudentUnion from './AssignStudentUnion.jsx';
import Login from './Login.jsx';
import ListOfMentors from "./ListOfMentors.jsx"
import Schedule from './Schedule.jsx';
import MentorApplications from './MentorApplications.jsx';
import ListOfPetitions from './ListOfPetition.jsx';
import Session from './Session.jsx';
import ChatCard from './ChatCard.jsx';
import Attendence from './Attendence.jsx';
import Forgot from './Forgot.jsx';
import ResetPassword from './ResetPassword.jsx';
import ChangePassword from './ChangePassword.jsx';
import AddTask from './AddTask.jsx';
import AssignedTasks from './AssignedTasks.jsx';
import MentorTasks from './MentorTasks.jsx';
import ChangeMentor from './ChangeMentor.jsx';
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="profile" element={<Profile/>} />
                    <Route path="my-mentor" element={<MyMentor/>} />
                    <Route path="chat" element={<Chat />} />
                    <Route path="petition" element={<Petition />} />
                    <Route path="apply" element={<Apply />} />
                    <Route path="my-mentee" element={<MyMentee />} />
                    <Route path="list-of-students" element={<ListOfStudents/>} />
                    <Route path="list-of-mentors" element={<ListOfMentors/>} />
                    <Route path="assign-mentor" element={<AssignMentor/>} />
                    <Route path="assign-student-union" element={<AssignStudentUnion />} />
                    <Route path="schedule" element={<Schedule />} />
                    <Route path="mentor-applications" element={<MentorApplications />} />
                    <Route path="list-of-petition" element={<ListOfPetitions />} />
                    <Route path="session" element={<Session />} />
                    <Route path="change-password" element={<ChangePassword />} />
                    <Route path="add-task" element={<AddTask />} />
                    <Route path="assignedtasks" element={<AssignedTasks />} />
                    <Route path="mentor-tasks" element={<MentorTasks />} />
                    <Route path='change-mentor' element={<ChangeMentor />} />

                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<Forgot />} /> 
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                {/* for temporary testing */}
                    <Route path="attendance" element={<Attendence />} />
                <Route path="/chatcard" element={<ChatCard />} />
            </Routes>
        </Router>
    );
}

export default App;
