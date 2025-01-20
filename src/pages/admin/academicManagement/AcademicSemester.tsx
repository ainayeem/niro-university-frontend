import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { useGetAllSemestersQuery } from "../../../redux/featurs/admin/academicManagement.api";
import { TQueryParam } from "../../../types";
import { TAcademicSemester } from "../../../types/academicManagement.type";

export type TTableData = Pick<TAcademicSemester, "name" | "year" | "startMonth" | "endMonth">;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>([]);
  const { data: semesterData, isLoading, isFetching } = useGetAllSemestersQuery(params);
  console.log("🚀 ~ AcademicSemester ~ semesterData:", semesterData);

  const tableData = semesterData?.data?.map(({ _id, name, startMonth, endMonth, year }) => ({
    key: _id,
    name,
    startMonth,
    endMonth,
    year,
  }));

  //ant tablt
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Fall",
          value: "Fall",
        },
        {
          text: "Summer",
          value: "Summer",
        },
      ],
    },
    {
      title: "Year",
      dataIndex: "year",
      filters: [
        {
          text: "2025",
          value: "2025",
        },
        {
          text: "2026",
          value: "2026",
        },
        {
          text: "2027",
          value: "2027",
        },
        {
          text: "2028",
          value: "2028",
        },
        {
          text: "2029",
          value: "2029",
        },
      ],
    },
    {
      title: "Start Month",
      dataIndex: "startMonth",
    },
    {
      title: "End Month",
      dataIndex: "endMonth",
    },
    {
      title: "Action",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (_pagination, filters, _sorter, extra) => {
    // console.log("params", pagination, filters, sorter, extra);
    console.log("params", filters);
    if ((extra.action = "filter")) {
      const queryParams: TQueryParam[] = [];

      filters.name?.forEach((item) => queryParams.push({ name: "name", value: item }));
      filters.year?.forEach((item) => queryParams.push({ name: "year", value: item }));

      setParams(queryParams);
    }
  };
  //
  // if (isLoading) {
  //   return <p>loaidng</p>;
  // }

  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} onChange={onChange} showSorterTooltip={{ target: "sorter-icon" }} />
    </div>
  );
};

export default AcademicSemester;
