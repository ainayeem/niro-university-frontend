import { Button, Row } from "antd";
import { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import CustomForm from "../components/form/CustomForm";
import CustomInput from "../components/form/CustomInput";
import { useLoginMutation } from "../redux/featurs/auth/authApi";
import { setUser, TUser } from "../redux/featurs/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // const defaultValues = {
  //   userId: "A-0001",
  //   password: "admin123",
  // };
  const defaultValues = {
    userId: "2025010001",
    password: "1234",
  };
  const [login] = useLoginMutation();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Logging in");

    try {
      const userInfo = {
        id: data.userId,
        password: data.password,
      };

      const res = await login(userInfo).unwrap();
      console.log("🚀 ~ onSubmit ~ res:", res);

      const user = verifyToken(res.data.accessToken) as TUser;

      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success(res.message, { id: toastId, duration: 3000 });

      if (res.data.needsPasswordChange) {
        navigate(`/change-password`);
      } else {
        navigate(`/${user.role}/dashboard`);
      }
    } catch (err) {
      toast.error("Not found!", { id: toastId });
    }
  };
  return (
    <Row justify="center" align="middle" style={{ height: "100vh" }}>
      <CustomForm onSubmit={onSubmit} defaultValues={defaultValues}>
        <CustomInput type="text" name="userId" label="ID:" />
        <CustomInput type="text" name="password" label="Password" />
        <Button htmlType="submit">Login</Button>
      </CustomForm>
    </Row>
  );
};

export default Login;
