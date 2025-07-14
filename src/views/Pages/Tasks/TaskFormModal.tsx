import React, { useEffect } from "react";
import { Modal, Form, Input, Select, DatePicker, TimePicker, Checkbox, Button } from "antd";
import dayjs from "dayjs";

const { Option } = Select;

const TaskFormModal = ({
  visible,
  onCancel,
  onSubmit,
  editingEvent,
  selectedSlot,
}) => {
  const [form] = Form.useForm();

  // Pre-fill form when editingEvent or selectedSlot changes
  useEffect(() => {
    if (editingEvent) {
      form.setFieldsValue({
        title: editingEvent.title,
        priority: editingEvent.priority,
        status: editingEvent.status,
        date: dayjs(editingEvent.date),
        startTime: dayjs(editingEvent.start, "HH:mm"),
        endTime: dayjs(editingEvent.end, "HH:mm"),
        isFlexible: editingEvent.isFlexible,
        reminder: editingEvent.reminder,
      });
    } else if (selectedSlot) {
      form.setFieldsValue({
        date: dayjs(selectedSlot.start),
        startTime: dayjs(selectedSlot.start),
        endTime: dayjs(selectedSlot.end),
      });
    } else {
      form.resetFields();
    }
  }, [editingEvent, selectedSlot, form]);

  const handleFinish = (values) => {
    const finalData = {
      ...values,
      date: values.date.format("YYYY-MM-DD"),
      startTime: values.startTime.format("HH:mm"),
      endTime: values.endTime.format("HH:mm"),
    };
    console.log("Submitted:", finalData);
    onSubmit?.(finalData);
    form.resetFields();
  };

  return (
    <Modal
      open={visible}
      title={editingEvent ? "Edit Task" : "Add Task"}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter task title" />
        </Form.Item>

        <Form.Item
          label="Priority"
          name="priority"
          initialValue="low"
          rules={[{ required: true }]}
        >
          <Select>
            <Option value="low">Low</Option>
            <Option value="medium">Medium</Option>
            <Option value="high">High</Option>
          </Select>
        </Form.Item>
        
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <DatePicker
            format="YYYY-MM-DD"
            style={{ width: "100%" }}
            inputReadOnly
            defaultPickerValue={dayjs()}
          />
        </Form.Item>

        <Form.Item
          label="Start Time"
          name="startTime"
          rules={[{ required: true, message: "Please select start time" }]}
        >
          <TimePicker
            use12Hours={false}
            format="HH:mm"
            style={{ width: "100%" }}
            disabledTime={() => ({
              disabledHours: () => [...Array(24).keys()].filter((h) => h < 9 || h > 17),
              disabledMinutes: () => [],
              disabledSeconds: () => [],
            })}
            inputReadOnly
          />
        </Form.Item>

        <Form.Item
          label="End Time"
          name="endTime"
          rules={[{ required: true, message: "Please select end time" }]}
        >
          <TimePicker
            use12Hours={false}
            format="HH:mm"
            style={{ width: "100%" }}
            disabledTime={() => ({
              disabledHours: () => [...Array(24).keys()].filter((h) => h < 9 || h > 17),
              disabledMinutes: () => [],
              disabledSeconds: () => [],
            })}
            inputReadOnly
          />
        </Form.Item>

        <Form.Item name="isFlexible" valuePropName="checked">
          <Checkbox>Flexible Task</Checkbox>
        </Form.Item>

        <Form.Item name="reminder" valuePropName="checked">
          <Checkbox>Set Reminder</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default TaskFormModal;
