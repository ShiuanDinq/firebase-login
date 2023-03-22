import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Link from "next/link";

const SignInModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorResponse, setErrorResponse] = useState("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleError = (error: string) => {
    setErrorResponse(error);
    setTimeout(function () {
      setErrorResponse("");
    }, 5000);
  };

  interface SignInParams {
    email: string;
    password: string;
  }

  const signIn = async (values: SignInParams) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsModalOpen(false);
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/quota-exceeded":
            handleError("Exceeded daily quota for email sign-in");
            break;
          case "auth/user-not-found":
            handleError("Invalid credentials");
            break;
          default:
            handleError("An unknown error has occured");
        }
      });
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Sign In
      </Button>
      {/* ***** can't find a way to change antd modal title style ***** */}
      <Modal
        title="Log into your account"
        open={isModalOpen}
        footer={null}
        onCancel={handleCancel}
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <h2>
          Don't have an account? <Link href="/signup">Sign up here</Link>{" "}
        </h2>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={signIn}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            name="remember"
            valuePropName="checked"
            wrapperCol={{ offset: 8, span: 16 }}
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
        <div className="error_response">{errorResponse}</div>
      </Modal>
    </>
  );
};

export default SignInModal;
