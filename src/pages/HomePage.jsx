import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, Checkbox } from "antd";

function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [fetchData, setFetchData] = useState(false);

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

  const handleOnChange = (e) => {
    e.preventDefault();
    setTaskTitle(e.target.value);
  };

  const handleSubmit = async () => {
    const body = {
      title: taskTitle,
      detail: "",
      user_id: 1,
      task_done: 0,
      task_archived: 0,
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

  return (
    <div className="HomePage">
      <div className="input-task">
        <Input
          value={taskTitle}
          placeholder="Basic usage"
          onChange={handleOnChange}
          className="task-input"
        />
      </div>
      <div className="add-btn-task">
        <Button type="submit" onClick={() => handleSubmit()}>
          +
        </Button>
      </div>
      <ul className="task-list">
        {taskList.map((task) => {
          return (
            <li className="task" key={task.task_id}>
              <Checkbox
                checked={task.task_done}
                onChange={() => console.info(task.task_done)}
              />
              <div className="task-to-edit">{task.title}</div>
              <div className="delete-btn-task">
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
