import { useParams } from "react-router-dom";

const StudentDetails = () => {
  const { studentId } = useParams();
  // console.log("🚀 ~ StudentDetails ~ param:", param);
  return (
    <div>
      <h1>This is StudentDetails Component of {studentId}</h1>
    </div>
  );
};

export default StudentDetails;
