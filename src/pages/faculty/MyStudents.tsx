import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomForm from "../../components/form/CustomForm";
import CustomInput from "../../components/form/CustomInput";
import { useAddMarkMutation, useGetAllFacultyCoursesQuery } from "../../redux/featurs/faculty/facultyCourses.api";

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: registerSemesterId },
    { name: "course", value: courseId },
  ]);

  console.log(facultyCoursesData);

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Roll",
      key: "roll",
      dataIndex: "roll",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <div>
            <AddMarksModal studentInfo={item} />
          </div>
        );
      },
    },
  ];

  const tableData = facultyCoursesData?.data?.map(({ _id, student, semesterRegistration, offeredCourse }) => ({
    key: _id,
    name: student.fullName,
    roll: student.id,
    semesterRegistration: semesterRegistration._id,
    student: student._id,
    offeredCourse: offeredCourse._id,
  }));

  return (
    <div>
      <h1>This is MyStudents Component</h1>
      <Table columns={columns} dataSource={tableData} />
    </div>
  );
};

// add modal

const AddMarksModal = ({ studentInfo }) => {
  console.log(studentInfo);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addMark] = useAddMarkMutation();

  const handleSubmit = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: Number(data.classTest1),
        midTerm: Number(data.midTerm),
        classTest2: Number(data.classTest2),
        finalTerm: Number(data.finalTerm),
      },
    };

    console.log(studentMark);
    const res = await addMark(studentMark);

    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel} footer={null}>
        <CustomForm onSubmit={handleSubmit}>
          <CustomInput type="text" name="classTest1" label="Class Test 1" />
          <CustomInput type="text" name="classTest2" label="Class Test 2" />
          <CustomInput type="text" name="midTerm" label="Midterm" />
          <CustomInput type="text" name="finalTerm" label="Final" />
          <Button htmlType="submit">Submit</Button>
        </CustomForm>
      </Modal>
    </>
  );
};

//

export default MyStudents;