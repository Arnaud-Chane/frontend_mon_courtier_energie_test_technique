import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import { Button, Input, Checkbox, DatePicker, Space } from "antd";

import { UserInfoContext } from "../context/UserRoleContext";

import EditIcon from "../assets/images/edit-icon.svg";
import InputPriority from "../components/InputPriority";

function HomePage() {
  const { userInfo } = useContext(UserInfoContext);

  const [taskList, setTaskList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [fetchData, setFetchData] = useState(false);
  const [datePicker, setDatePicker] = useState("");
  const [inDueDate, setInDueDate] = useState("");

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
      user_id: userInfo.userId,
      task_done: 0,
      task_archived: 0,
      task_priority: taskList.length + 1,
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

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`
      );
      if (response.status === 204) {
        setFetchData(!fetchData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChecked = async (tasked) => {
    const mapped = taskList.map((task) => {
      return task.task_id === Number(tasked.task_id)
        ? { ...task, task_done: !task.task_done }
        : { ...task };
    });
    setTaskList(mapped);
    const body = tasked;
    body.task_done = !tasked.task_done;
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/tasks/is-done/${
          tasked.task_id
        }`,
        body
      );
      if (response.status === 204) {
        setFetchData(!fetchData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleTimePicker = (value, dateString) => {
    const date1 = dayjs();
    const date2 = dateString.split(" ")[0];
    setInDueDate(Math.abs(date1.diff(date2, "day")));
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
            A finir avant :
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
            <li className="task" key={task.task_id}>
              <InputPriority
                task={task}
                setFetchData={setFetchData}
                fetchData={fetchData}
              />
              <Checkbox
                checked={task.task_done}
                onChange={() => handleChecked(task)}
              />
              <div
                className={
                  task.task_done ? "task-to-edit strike" : "task-to-edit"
                }
              >
                {task.title}
              </div>
              <div className="delete-btn-task">
                <Link to={`/task/${task.task_id}`}>
                  <img className="edit-icon-homepage" src={EditIcon} alt="" />
                </Link>
                <Button
                  type="submit"
                  onClick={() => handleDelete(task.task_id)}
                >
                  delete
                </Button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
