import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomSelect from "../../components/form/CustomSelect";
import { useGetAllFacultyCoursesQuery } from "../../redux/featurs/faculty/facultyCourses.api";

const FacultyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);
  const navigate = useNavigate();

  console.log(facultyCoursesData);

  const semesterOptions = facultyCoursesData?.data?.map((item) => ({
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item) => ({
    label: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };

  return (
    <div>
      <h1>This is FacultyCourses Component</h1>
      <Flex justify="center" align="center">
        <Col span={6}>
          <CustomForm onSubmit={onSubmit}>
            <CustomSelect options={semesterOptions} name="semesterRegistration" label="Semester" />
            <CustomSelect options={courseOptions} name="course" label="Course" />
            <Button htmlType="submit">Submit</Button>
          </CustomForm>
        </Col>
      </Flex>
    </div>
  );
};

export default FacultyCourses;
