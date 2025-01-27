import { Button, Row } from "antd";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CustomForm from "../components/form/CustomForm";
import CustomInput from "../components/form/CustomInput";
import { useChangePasswordMutation } from "../redux/featurs/admin/userManagement.api";
import { logout } from "../redux/featurs/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { TResponse } from "../types";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);

    const res = (await changePassword(data)) as TResponse<any>;
    console.log(res?.data?.success);
    if (res?.data?.success) {
      dispatch(logout());
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>This is ChangePassword Component</h1>
      <Row justify="center" align="middle" style={{ height: "100vh" }}>
        <CustomForm onSubmit={onSubmit}>
          <CustomInput type="text" name="oldPassword" label="Old Password" />
          <CustomInput type="text" name="newPassword" label="New Password" />
          <Button htmlType="submit">Login</Button>
        </CustomForm>
      </Row>
    </div>
  );
};

export default ChangePassword;
