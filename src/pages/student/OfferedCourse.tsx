import { Button, Card, Col, Row } from "antd";
import { toast } from "sonner";
import { useEnrollCourseMutation, useGetAllOfferedCoursesQuery } from "../../redux/featurs/student/studentCourseManagement.api";
import { TResponse } from "../../types";

type TCourse = {
  [index: string]: any;
};

const OfferedCourse = () => {
  const { data: offeredCourseData } = useGetAllOfferedCoursesQuery(undefined);

  const [enroll] = useEnrollCourseMutation();

  const singleObject = offeredCourseData?.data?.reduce((acc: TCourse, item) => {
    const key = item.course.title;
    acc[key] = acc[key] || { courseTitle: key, sections: [] };
    acc[key].sections.push({
      section: item.section,
      _id: item._id,
      days: item.days,
      startTime: item.startTime,
      endTime: item.endTime,
    });
    return acc;
  }, {});

  const modifiedData = Object.values(singleObject ? singleObject : {});

  const handleEnroll = async (id: string) => {
    const enrollData = {
      offeredCourse: id,
    };

    const res = (await enroll(enrollData)) as TResponse<any>;
    console.log(res);
    if (res.error) {
      toast.error(res.error.data.message);
    } else {
      toast.success(res.data.message);
    }
  };

  if (!modifiedData.length) {
    return (
      <div style={{ textAlign: "center", padding: "50px", color: "#555" }}>
        <p
          style={{
            fontSize: "20px",
            fontWeight: "500",
            color: "#888",
            marginBottom: "20px",
          }}
        >
          No available courses at the moment.
        </p>
        <p style={{ fontSize: "16px", color: "#aaa" }}>Please check back later for new courses.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Offered Courses</h1>
      <Row gutter={[20, 20]}>
        {modifiedData.map((item) => (
          <Col span={24} key={item.courseTitle}>
            <Card style={{ borderRadius: "12px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }} bodyStyle={{ padding: "20px" }}>
              <h2 style={{ marginBottom: "10px" }}>{item.courseTitle}</h2>
              <div>
                {item.sections.map((section) => (
                  <Card
                    key={section.section}
                    style={{
                      marginBottom: "15px",
                      border: "1px solid #eaeaea",
                      borderRadius: "8px",
                    }}
                  >
                    <Row justify="space-between" align="middle" gutter={[10, 10]}>
                      <Col span={5}>
                        <strong>Section:</strong> {section.section}
                      </Col>
                      <Col span={5}>
                        <strong>Days:</strong>
                        {section.days.map((day, index) => (
                          <span key={index} style={{ marginLeft: "5px" }}>
                            {day}
                          </span>
                        ))}
                      </Col>
                      <Col span={5}>
                        <strong>Start Time:</strong> {section.startTime}
                      </Col>
                      <Col span={5}>
                        <strong>End Time:</strong> {section.endTime}
                      </Col>
                      <Col span={4}>
                        <Button
                          // type="primary"
                          onClick={() => handleEnroll(section._id)}
                          style={{
                            borderRadius: "6px",
                          }}
                        >
                          Enroll
                        </Button>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OfferedCourse;
