import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomForm from "../../../components/form/CustomForm";
import CustomSelect from "../../../components/form/CustomSelect";
import { monthOptions } from "../../../constants/global";
import { semesterOptions } from "../../../constants/semester";
import { useAddAcademicSemesterMutation } from "../../../redux/featurs/admin/academicManagement.api";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { TResponse } from "../../../types/global";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");
    const name = semesterOptions[Number(data?.name) - 1]?.label;

    const semesterData = {
      name,
      code: data.name,
      year: data.year,
      startMonth: data.startMonth,
      endMonth: data.endMonth,
    };

    //* submit data
    try {
      const res = (await addAcademicSemester(semesterData)) as TResponse<any>;
      // console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ res:", res);
      if (res.error) {
        toast.error(res.error.data.message, { id: toastId });
      } else {
        toast.success(res.data.message, { id: toastId });
      }
    } catch (err) {
      toast.error("something went wrong", { id: toastId });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <CustomForm onSubmit={onSubmit} resolver={zodResolver(academicSemesterSchema)}>
          <CustomSelect label="Name" name="name" options={semesterOptions} />
          <CustomSelect label="Year" name="year" options={yearOptions} />
          <CustomSelect label="Start Month" name="startMonth" options={monthOptions} />
          <CustomSelect label="End Month" name="endMonth" options={monthOptions} />

          <Button htmlType="submit">Submit</Button>
        </CustomForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
