import { Button, Col, Flex } from "antd";
import moment from "moment";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import CustomForm from "../../../components/form/CustomForm";
import CustomInput from "../../../components/form/CustomInput";
import CustomSelect from "../../../components/form/CustomSelect";
import CustomSelectWithWatch from "../../../components/form/CustomSelectWithWatch";
import CustomTimePicker from "../../../components/form/CustomTimePicker";
import { weekDaysOptions } from "../../../constants/global";
import { useGetAllAcademicDepartmentQuery, useGetAllAcademicFacultiesQuery } from "../../../redux/featurs/admin/academicManagement.api";
import {
  useCreateOfferedCourseMutation,
  useGetAllCoursesQuery,
  useGetAllRegisteredSemestersQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/featurs/admin/courseManagement.api";
import { TResponse } from "../../../types";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  // ----------

  const { data: semesterRegistrationData } = useGetAllRegisteredSemestersQuery([
    { name: "sort", value: "year" },
    { name: "status", value: "UPCOMING" },
  ]);

  const { data: academicFacultyData } = useGetAllAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } = useGetAllAcademicDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCoursesQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } = useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  // --------------------------------------

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map((item) => ({
    value: item._id,
    label: `${item.academicSemester.name} ${item.academicSemester.year}`,
  }));

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));
  //-------------------------

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log("🚀 ~ constonSubmit:SubmitHandler<FieldValues>= ~ data:", data);

    const toastId = toast.loading("Creating...");
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: moment(new Date(data.startTime)).format("HH:mm"),
      endTime: moment(new Date(data.endTime)).format("HH:mm"),
    };

    try {
      const res = (await addOfferedCourse(offeredCourseData)) as TResponse<any>;
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
      <h1>This is OfferCourse Component</h1>
      <Flex justify="center" align="center">
        <Col span={6}>
          <CustomForm onSubmit={onSubmit}>
            <CustomSelect name="semesterRegistration" label="Semester Registration" options={semesterRegistrationOptions} />

            <CustomSelect name="academicFaculty" label="Academic Faculty" options={academicFacultyOptions} />
            <CustomSelect name="academicDepartment" label="Academic Department" options={academicDepartmentOptions} />

            <CustomSelectWithWatch onValueChange={setCourseId} options={courseOptions} name="course" label="Course" />
            <CustomSelect disabled={!courseId || fetchingFaculties} name="faculty" label="Faculty Member" options={facultiesOptions} />

            <CustomInput type="text" name="section" label="Section :" />
            <CustomInput type="text" name="maxCapacity" label="Max Capacity" />
            <CustomSelect mode="multiple" options={weekDaysOptions} name="days" label="Days" />
            <CustomTimePicker name="startTime" label="Start Time" />
            <CustomTimePicker name="endTime" label="End Time" />

            <Button htmlType="submit">Submit</Button>
          </CustomForm>
        </Col>
      </Flex>
    </div>
  );
};

export default OfferCourse;
