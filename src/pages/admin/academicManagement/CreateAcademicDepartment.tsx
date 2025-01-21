import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomForm from "../../../components/form/CustomForm";
import CustomInput from "../../../components/form/CustomInput";
import CustomSelect from "../../../components/form/CustomSelect";
import { useAddAcademicDepartmentMutation, useGetAllAcademicFacultiesQuery } from "../../../redux/featurs/admin/academicManagement.api";
import { academicDepartmentSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types";

const CreateAcademicDepartment = () => {
  const { data: academicFacultiesData } = useGetAllAcademicFacultiesQuery(undefined);
  const academicFacultyOptions =
    academicFacultiesData?.data?.map(({ _id, name }) => ({
      value: _id,
      label: name,
    })) || [];

  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const res = (await addAcademicDepartment(data)) as TResponse<any>;
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
        <Col span={12}>
          <CustomForm onSubmit={onSubmit} resolver={zodResolver(academicDepartmentSchema)}>
            <CustomInput label="Academic Department Name" type="text" name="name" />
            <CustomSelect label="Academic Faculty" name="academicFaculty" options={academicFacultyOptions} />

            <Button htmlType="submit">Submit</Button>
          </CustomForm>
        </Col>
      </Flex>
    </div>
  );
};

export default CreateAcademicDepartment;
