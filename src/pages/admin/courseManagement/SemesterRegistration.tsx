import { Button, Col, Flex } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomDatePicker from "../../../components/form/CustomDatePicker";
import CustomForm from "../../../components/form/CustomForm";
import CustomInput from "../../../components/form/CustomInput";
import CustomSelect from "../../../components/form/CustomSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { useGetAllSemestersQuery } from "../../../redux/featurs/admin/academicManagement.api";
import { useAddRegisteredSemesterMutation } from "../../../redux/featurs/admin/courseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [addSemester] = useAddRegisteredSemesterMutation();
  const { data: academicSemester } = useGetAllSemestersQuery([{ name: "sort", value: "year" }]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const semesterData = {
      ...data,
      minCredit: Number(data.minCredit),
      maxCredit: Number(data.maxCredit),
    };
    // console.log(semesterData);
    try {
      const res = (await addSemester(semesterData)) as TResponse<any>;
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
            <CustomSelect label="Academic Semester" name="academicSemester" options={academicSemesterOptions} />

            <CustomSelect name="status" label="Status" options={semesterStatusOptions} />
            <CustomDatePicker name="startDate" label="Start Date" />
            <CustomDatePicker name="endDate" label="End Date" />
            <CustomInput type="text" name="minCredit" label="Min Credit" />
            <CustomInput type="text" name="maxCredit" label="Max Credit" />

            <Button htmlType="submit">Submit</Button>
          </CustomForm>
        </Col>
      </Flex>{" "}
    </div>
  );
};

export default SemesterRegistration;
