import FacultyCourses from "../pages/faculty/FacultyCourses";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyStudents from "../pages/faculty/MyStudents";
import OfferedCourse from "../pages/faculty/OfferedCourse";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferedCourse />,
  },
  {
    name: "My Courses",
    path: "courses",
    element: <FacultyCourses />,
  },
  {
    path: "courses/:registerSemesterId/:courseId",
    element: <MyStudents />,
  },
];
