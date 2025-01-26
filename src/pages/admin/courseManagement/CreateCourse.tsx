import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomForm from "../../../components/form/CustomForm";
import CustomInput from "../../../components/form/CustomInput";
import CustomSelect from "../../../components/form/CustomSelect";
import { useAddCourseMutation, useGetAllCoursesQuery } from "../../../redux/featurs/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const [createCourse] = useAddCourseMutation();
  const { data: courses } = useGetAllCoursesQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: Number(data.code),
      credits: Number(data.credits),
      isDeleted: false,
      preRequisiteCourses: data.preRequisiteCourses
        ? data.preRequisiteCourses?.map((item) => ({
            course: item,
            isDeleted: false,
          }))
        : [],
    };

    // console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;
      // console.log(res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={6}>
          <CustomForm onSubmit={onSubmit}>
            <CustomInput type="text" name="title" label="Title" />
            <CustomInput type="text" name="prefix" label="Prefix" />
            <CustomInput type="text" name="code" label="Code" />
            <CustomInput type="text" name="credits" label="Credits" />
            <CustomSelect mode="multiple" options={preRequisiteCoursesOptions} name="preRequisiteCourses" label="preRequisiteCourses" />
            <Button htmlType="submit">Submit</Button>
          </CustomForm>
        </Col>
      </Flex>{" "}
    </div>
  );
};

export default CreateCourse;
