import { Button, Modal, Table } from "antd";
import { useState } from "react";
import { toast } from "sonner";
import CustomForm from "../../../components/form/CustomForm";
import CustomSelect from "../../../components/form/CustomSelect";
import { useAddFacultiesIntoCourseMutation, useGetAllCoursesQuery } from "../../../redux/featurs/admin/courseManagement.api";
import { useGetAllFacultiesQuery } from "../../../redux/featurs/admin/userManagement.api";
import { TResponse } from "../../../types";

const Courses = () => {
  const { data: courses, isFetching } = useGetAllCoursesQuery(undefined);

  const tableData = courses?.data?.map(({ _id, title, prefix, code }) => ({
    key: _id,
    title,
    code: `${prefix} ${code}`,
  }));

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Action",
      render: (item) => {
        return <AddFacultyModal facultyInfo={item} />;
      },
    },
  ];

  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};

// add modal

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: facultiesData } = useGetAllFacultiesQuery(undefined);
  const [addFacultiesIntoCourse] = useAddFacultiesIntoCourseMutation();

  const facultiesOption = facultiesData?.data?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const handleSubmit = async (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    // console.log(facultyData);

    const res = (await addFacultiesIntoCourse(facultyData)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success(res.data.message);
    }
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
          <CustomSelect mode="multiple" options={facultiesOption} name="faculties" label="Faculty" />
          <Button htmlType="submit">Submit</Button>
        </CustomForm>
      </Modal>
    </>
  );
};

//

export default Courses;
