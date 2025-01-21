import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomForm from "../../../components/form/CustomForm";
import CustomInput from "../../../components/form/CustomInput";
import { useAddAcademicFacultyMutation } from "../../../redux/featurs/admin/academicManagement.api";
import { academicFacultySchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const res = (await addAcademicFaculty(data)) as TResponse<any>;
      if (res.error) {
        toast.error(res?.error?.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <Flex justify="center" align="center">
        <Col span={10}>
          <CustomForm onSubmit={onSubmit} resolver={zodResolver(academicFacultySchema)}>
            <CustomInput type="text" name="name" label="Faculty Name" />

            <Button htmlType="submit">Submit</Button>
          </CustomForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicFaculty;
