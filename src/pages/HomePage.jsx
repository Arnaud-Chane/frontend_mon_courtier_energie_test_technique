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
      <div className="header">
        <div className="page-title">Mes tâches de courtier</div>
        <div class="h_line"></div>
      </div>
      <div className="task-input-ctn">
        <Input
          value={taskTitle}
          placeholder="Ecrire une tâche"
          onChange={handleOnChange}
          className="task-input"
        />
        <div className="time-picker">
          <Space direction="vertical" size={12} className="date-picker">
            À finir avant :
            <DatePicker
              onChange={handleTimePicker}
              placeholder="Choisir une date"
              className="calendar"
            />
          </Space>
        </div>
        <div className="add-btn-task">
          <Button
            type="submit"
            onClick={() => handleSubmit()}
            className="task-add-btn"
          >
            +
          </Button>
        </div>
      </div>

      <ul className="task-list">
        <div className="task-header">
          <div className="priority">Priorité</div>
          <div className="done">Fait</div>
          <div className="task-title">Titre</div>
          <div className="due-in">Date</div>
        </div>
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
