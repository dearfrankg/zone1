"use client";

import "./users.css";
import React, { useState } from "react";
import { useQuery, useMutation, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Form, Input, Button, Table, Modal } from "antd";

const queryClient = new QueryClient();

// eslint-disable-next-line prefer-destructuring
const API_URL = process.env.API_URL;

type User = {
  id: string;
} | null;

const getUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  return response.json();
};

const updateUser = async (userId: string, values: User) => {
  const response = await fetch(`https://api.example.com/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(values),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

const Users = () => {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User>(null);

  const { data: users, isLoading } = useQuery(["users"], getUsers);

  const updateUserMutation = useMutation((values: User) => updateUser(selectedUser!.id, values), {
    onSuccess: () => {
      setModalVisible(false);
      form.resetFields();
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleRowClick = (record: User) => {
    setSelectedUser(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  const handleFormSubmit = (values: User) => {
    updateUserMutation.mutate(values);
  };

  const handleModalClose = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Table
        dataSource={users}
        columns={columns}
        loading={isLoading}
        rowKey="id"
        style={{ cursor: "pointer" }}
        onRow={record => ({
          onClick: () => handleRowClick(record),
        })}
      />
      <Modal title="Edit User" open={modalVisible} onOk={form.submit} onCancel={handleModalClose}>
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter the name" }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter the email" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={updateUserMutation.isLoading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

const Root = () => (
  <QueryClientProvider client={queryClient}>
    <Users />
  </QueryClientProvider>
);

export default Root;
