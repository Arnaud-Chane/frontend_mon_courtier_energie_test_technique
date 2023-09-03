import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Input, DatePicker, Space } from "antd";
import { UserInfoContext } from "../context/UserRoleContext";

import TaskLine from "../components/TaskLine";

function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [dueDate, setDueDate] = useState("");

  const { userInfo } = useContext(UserInfoContext);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${
            userInfo.userId
          }/tasks`
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
      user_id: userInfo.userId,
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
        <div className="h_line" />
      </div>
      <div className="task-section">
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
        <div className="task-list-section">
          <table className="task-list">
            <thead className="task-header">
              <tr>
                <th className="priority">Priorité</th>
                <th className="done">Fait</th>
                <th className="task-title">Titre</th>
                <th className="due-in">Date</th>
                <th className="due-in">Options</th>
              </tr>
            </thead>
            <tbody className="task-body">
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
