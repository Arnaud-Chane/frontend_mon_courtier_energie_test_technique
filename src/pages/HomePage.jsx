import { useState, useEffect } from "react";
import axios from "axios";

function HomePage() {
  const [taskList, setTaskList] = useState([]);

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

  return (
    <div className="HomePage">
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
