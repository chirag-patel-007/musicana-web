import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import TaskFormModal from "./TaskFormModal";

import { useDispatch, useSelector } from "react-redux";
// Adjust the import path as per your store location

import { AppDispatch, RootState } from "../../../store/store";
import {
  autoScheduleTaskThunk,
  createTaskThunk,
  deleteTaskThunk,
  fetchTasksThunk,
  updateTaskThunk,
} from "../../../redux/auth/taskSlice";
import { Task } from "../../../services/taskapi";
import { Button } from "antd";
import toast from "react-hot-toast";

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar);

export type Priority = "scheduled" | "pending" | "conflict";

export interface CalendarEvent {
  id: number;
  title: string;
  date: string; // YYYY-MM-DD format
  start: string; // "HH:mm"
  end: string; // "HH:mm"
  priority: Priority;
  isFlexible: boolean;
  reminder: boolean;
  reminderTime?: Date | null;
  status: Priority;
}

const PRIORITY_COLORS: Record<Priority, string> = {
  scheduled: "#28a745",
  conflict: "#dc3545",
  pending: "#ffc107",
};

const ScheduleTask: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const events = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);
  console.log(events);

  // Convert your CalendarEvent shape to react-big-calendar event format
  const convertToRBCEvent = (event: Task) => {
    const startDateTime = moment(
      event.date + " " + event.startTime,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    const endDateTime = moment(
      event.date + " " + event.endTime,
      "YYYY-MM-DD HH:mm"
    ).toDate();
    return {
      ...event,
      start: startDateTime,
      end: endDateTime,
      title: event.title,
    };
  };
  // Local UI state
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [editingEvent, setEditingEvent] = useState<Task | null>(null);

  // Fetch tasks on mount
  useEffect(() => {
    dispatch(fetchTasksThunk());
  }, [dispatch]);

  // Convert react-big-calendar event back to your CalendarEvent shape
  const convertFromRBCEvent = (rbcEvent: any): Task => {
    return {
      ...rbcEvent,
      date: moment(rbcEvent.date).format("YYYY-MM-DD"),
      start: moment(rbcEvent.start).format("HH:mm"),
      end: moment(rbcEvent.end).format("HH:mm"),
    };
  };

  const eventStyleGetter = (event: any) => {
    const backgroundColor = PRIORITY_COLORS[event.status] || "#3174ad";
    return {
      style: {
        backgroundColor,
        color: "white",
        borderRadius: "4px",
        border: "none",
        padding: "2px 5px",
      },
    };
  };

  const handleSelectSlot = (slotInfo: any) => {
    setSelectedSlot({
      start: slotInfo.start,
      end: slotInfo.end,
    });
    setEditingEvent(null);
    setModalVisible(true);
  };

  const handleSelectEvent = (event: any) => {
    const calEvent = convertFromRBCEvent(event);
    setEditingEvent(calEvent);
    setModalVisible(true);
  };

  const moveEvent = ({ event, start, end }: any) => {
    const updatedEvent = {
      ...event,
      date: moment(start).format("YYYY-MM-DD"),
      startTime: moment(start).format("HH:mm"),
      endTime: moment(end).format("HH:mm"),
    };
    dispatch(
      updateTaskThunk({ id: event._id?.toString(), task: updatedEvent })
    );
    setTimeout(() => {
      // Optionally, you can refetch tasks after auto-scheduling
      dispatch(fetchTasksThunk());
      toast.success("Task updated successfully!");
    }, 1000); // Adjust the timeout as needed
  };

  const resizeEvent = ({ event, start, end }: any) => {
    const updatedEvent = {
      ...event,
      date: moment(start).format("YYYY-MM-DD"),
      startTime: moment(start).format("HH:mm"),
      endTime: moment(end).format("HH:mm"),
    };
    dispatch(
      updateTaskThunk({ id: event._id?.toString(), task: updatedEvent })
    );
    setTimeout(() => {
      // Optionally, you can refetch tasks after auto-scheduling
      dispatch(fetchTasksThunk());
      toast.success("Task updated successfully!");
    }, 1000); // Adjust the timeout as needed
  };

  const handleFormSubmit = (event: Task) => {
    if (editingEvent) {
      dispatch(
        updateTaskThunk({ id: editingEvent._id?.toString() || "", task: event })
      );
    } else {
      dispatch(createTaskThunk(event));
    }
    setModalVisible(false);
    // dispatch(fetchTasksThunk());
    setEditingEvent(null);
    setSelectedSlot(null);
    setTimeout(() => {
      // Optionally, you can refetch tasks after auto-scheduling
      dispatch(fetchTasksThunk());
      if (editingEvent) {
        toast.success("Task updated successfully!");
      } else {
        toast.success("Task created successfully!");
      }
    }, 1000); // Adjust the timeout as needed
  };

  // Limit calendar visible time to business hours (9 AM - 5 PM)
  const minTime = new Date();
  minTime.setHours(9, 0, 0);

  const maxTime = new Date();
  maxTime.setHours(17, 0, 0);

  if (loading) return <div>Loading tasks...</div>;
  if (error) return <div>Error: {error}</div>;
  const handleAutoSchedule = () => {
    dispatch(autoScheduleTaskThunk({}));
    setTimeout(() => {
      // Optionally, you can refetch tasks after auto-scheduling
      dispatch(fetchTasksThunk());
      toast.success("Task auto scheduled successfully!");
    }, 1000); // Adjust the timeout as needed
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex gap-2 items-center">
        <h2 className="text-start font-bold">Task Scheduler</h2>
        <Button onClick={handleAutoSchedule} variant="solid">
          {" "}
          Auto Schedule
        </Button>
      </div>
      <div style={{ height: "90vh", margin: "20px" }}>
        <DragAndDropCalendar
          localizer={localizer}
          events={events.map(convertToRBCEvent)}
          defaultView={Views.WEEK}
          views={[Views.MONTH, Views.WEEK]}
          step={30}
          timeslots={2}
          selectable
          resizable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={moveEvent}
          onEventResize={resizeEvent}
          eventPropGetter={eventStyleGetter}
          style={{ height: "100%" }}
          min={minTime}
          max={maxTime}
        />
      </div>

      <TaskFormModal
        visible={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingEvent(null);
          setSelectedSlot(null);
        }}
        onSubmit={handleFormSubmit}
        editingEvent={editingEvent}
        selectedSlot={selectedSlot}
        // onDelete={handleDeleteEvent} // optional prop if your modal supports delete
      />
    </DndProvider>
  );
};

export default ScheduleTask;
