import { useGetAllSemestersQuery } from "../../../redux/featurs/academicSemester/academicSemesterApi";

const AcademicSemester = () => {
  const { data } = useGetAllSemestersQuery(undefined);
  console.log("🚀 ~ AcademicSemester ~ data:", data);

  return (
    <div>
      <h1>This is AcademicSemester Component</h1>
    </div>
  );
};

export default AcademicSemester;
