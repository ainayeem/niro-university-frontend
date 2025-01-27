import { Card, Col, Row, Tag, Typography } from "antd";
import { useGetAllEnrolledCoursesQuery } from "../../redux/featurs/student/studentCourseManagement.api";

const { Title, Text } = Typography;

const MySchedule = () => {
  const { data } = useGetAllEnrolledCoursesQuery(undefined);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "30px" }}>
        My Schedule
      </Title>
      <Row gutter={[20, 20]}>
        {data?.data?.length ? (
          data.data.map((item) => (
            <Col span={24} key={item._id}>
              <Card
                title={<Text strong>{item.course.title}</Text>}
                bordered={false}
                style={{
                  borderRadius: "10px",
                  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
                }}
                bodyStyle={{ padding: "20px" }}
              >
                <Row gutter={[10, 10]} align="middle">
                  <Col span={6}>
                    <Text strong>Section:</Text> {item.offeredCourse.section}
                  </Col>
                  <Col span={6}>
                    <Text strong>Days:</Text>{" "}
                    {item.offeredCourse.days.map((day, index) => (
                      <Tag key={index} color="blue">
                        {day}
                      </Tag>
                    ))}
                  </Col>
                  <Col span={6}>
                    <Text strong>Time:</Text> {item.offeredCourse.startTime} - {item.offeredCourse.endTime}
                  </Col>
                  <Col span={6} style={{ marginTop: "10px" }}>
                    <Text strong>Faculty Name:</Text> {item.faculty.fullName}
                  </Col>
                </Row>
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Card
              style={{
                textAlign: "center",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Title level={4} style={{ color: "#888" }}>
                No courses enrolled yet.
              </Title>
              <Text style={{ color: "#aaa" }}>Enroll in courses to see your schedule here.</Text>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default MySchedule;
