import { Button, Form, Input, Typography } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginThunk } from "../../../redux/auth/authSlice";


const LoginForm = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (formData: any) => {
    const resultAction = await dispatch(loginThunk(formData));
    if (loginThunk.fulfilled.match(resultAction)) {
      navigate("/home");
    }
  };

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <div className="border rounded-xl border-gray-300 p-6 text-start">
        <h2 className="text-xl font-semibold text-center mb-6">Login</h2>

        {/* Email */}
        <Form.Item
          label={<span className="font-medium">Email</span>}
          labelCol={{ span: 24 }}
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email format",
              },
            }}
            render={({ field }) => (
              <Input {...field} placeholder="Enter your email" />
            )}
          />
        </Form.Item>

        {/* Password */}
        <Form.Item
          label={<span className="font-medium">Password</span>}
          labelCol={{ span: 24 }}
          validateStatus={errors.password ? "error" : ""}
          help={errors.password?.message}
        >
          <Controller
            name="password"
            control={control}
            rules={{ required: "Password is required" }}
            render={({ field }) => (
              <Input.Password {...field} placeholder="Enter your password" />
            )}
          />
        </Form.Item>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit Button */}
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          className="mt-4 bg-indigo-600 hover:bg-indigo-700"
        >
          Login
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
