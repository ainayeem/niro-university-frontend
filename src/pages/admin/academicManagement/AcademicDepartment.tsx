import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/featurs/admin/academicManagement.api";

type TTableData = {
  key: string;
  name: string;
  facultyName: string;
};

const AcademicDepartment = () => {
  const { data, isFetching } = useGetAllAcademicDepartmentQuery(undefined);

  const tableData = data?.data?.map(({ _id, name, academicFaculty }) => ({
    key: _id,
    name,
    facultyName: academicFaculty.name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Academic Department Name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty Name",
      dataIndex: "facultyName",
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
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        // onChange={onChange}
      />
    </div>
  );
};

export default AcademicDepartment;
