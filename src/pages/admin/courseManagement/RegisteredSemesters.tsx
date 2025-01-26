import { Button, Dropdown, Table, TableColumnsType, Tag } from "antd";
import moment from "moment";
import { useState } from "react";
import { toast } from "sonner";
import { useGetAllRegisteredSemestersQuery, useUpdateRegisteredSemesterMutation } from "../../../redux/featurs/admin/courseManagement.api";
import { TResponse } from "../../../types";
import { TSemester } from "../../../types/courseManagement.type";

export type TTableData = Pick<TSemester, "startDate" | "endDate" | "status">;

const items = [
  {
    label: "Upcoming",
    key: "UPCOMING",
  },
  {
    label: "Ongoing",
    key: "ONGOING",
  },
  {
    label: "Ended",
    key: "ENDED",
  },
];

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");

  const { data: semesterData, isFetching } = useGetAllRegisteredSemestersQuery(undefined);

  const [updateSemesterStatus] = useUpdateRegisteredSemesterMutation();

  const tableData = semesterData?.data?.map(({ _id, academicSemester, startDate, endDate, status }) => ({
    key: _id,
    name: `${academicSemester.name} ${academicSemester.year}`,
    startDate: moment(new Date(startDate)).format("D MMM YYYY"),
    endDate: moment(new Date(endDate)).format("D MMM YYYY"),
    status,
  }));

  const handleStatusUpdate = async (statusData) => {
    const updateData = {
      id: semesterId,
      data: {
        status: statusData.key,
      },
    };
    const res = (await updateSemesterStatus(updateData)) as TResponse<any>;
    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success(res.data.message);
    }
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (item) => {
        let color;
        if (item === "UPCOMING") {
          color = "blue";
        }
        if (item === "ONGOING") {
          color = "green";
        }
        if (item === "ENDED") {
          color = "red";
        }

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item.key)}>Update</Button>
          </Dropdown>
        );
      },
    },
  ];

  // const onChange: TableProps<TTableData>['onChange'] = (
  //   _pagination,
  //   filters,
  //   _sorter,
  //   extra
  // ) => {
  //   if (extra.action === 'filter') {
  //     const queryParams: TQueryParam[] = [];
  //     setParams(queryParams);
  //   }
  // };

  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

export default RegisteredSemesters;
