import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";

function HomePage() {
  const [taskList, setTaskList] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

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
  }, []);

  const handleOnChange = (e) => {
    e.preventDefault();
    setTaskTitle(e.target.value);
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
      <ul className="task-list">
        {taskList.map((task) => {
          return (
            <li className="task" key={task.task_id}>
              <div className="task-to-edit">{task.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default HomePage;
