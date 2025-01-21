import { Button, Table, TableColumnsType } from "antd";
import { useState } from "react";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/featurs/admin/academicManagement.api";
import { TAcademicFaculty } from "../../../types/academicManagement.type";

type TTableData = Pick<TAcademicFaculty, "name">;

const AcademicFaculty = () => {
  const [params, _setParams] = useState(undefined);
  const { data, isFetching } = useGetAllAcademicFacultiesQuery(params);

  const tableData = data?.data?.map(({ _id, name }) => ({
    key: _id,
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Faculty Name",
      dataIndex: "name",
    },
    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>Update</Button>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Table loading={isFetching} columns={columns} dataSource={tableData} />
    </div>
  );
};

export default AcademicFaculty;
