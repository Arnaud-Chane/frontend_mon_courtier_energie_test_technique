import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, DatePicker, Space } from "antd";

import TaskLine from "../components/TaskLine";

function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks`
        );
        setTaskList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [fetchData]);

  function compareByPriority(a, b) {
    return a.task_priority - b.task_priority;
  }

  const handleOnChange = (e) => {
    e.preventDefault();
    setTaskTitle(e.target.value);
  };

  const handleSubmit = async () => {
    const body = {
      title: taskTitle,
      detail: "",
      task_done: 0,
      task_archived: 0,
      task_priority: taskList.length + 1,
      due_date: dueDate,
    };
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
        body
      );
      if (response.status === 201) {
        setTaskTitle("");
        setFetchData(!fetchData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTimePicker = (value, dateString) => {
    setDueDate(dateString);
  };

  return (
    <div className="HomePage">
      <div className="input-task">
        <Input
          value={taskTitle}
          placeholder="Ecrire une tâche"
          onChange={handleOnChange}
          className="task-input"
        />
        <div className="time-picker">
          <Space direction="vertical" size={12}>
            À finir avant :
            <DatePicker
              onChange={handleTimePicker}
              placeholder="Choisir une date"
            />
          </Space>
        </div>
      </div>
      <div className="add-btn-task">
        <Button type="submit" onClick={() => handleSubmit()}>
          +
        </Button>
      </div>
      <ul className="task-list">
        {taskList.sort(compareByPriority).map((task) => {
          return (
            <TaskLine
              task={task}
              taskInfo={task}
              setFetchData={setFetchData}
              fetchData={fetchData}
              taskList={taskList}
              setTaskList={setTaskList}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
