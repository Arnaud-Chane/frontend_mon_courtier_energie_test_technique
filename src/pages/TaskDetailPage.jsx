import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";

function TaskDetailPage() {
  const { id } = useParams();
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`)
      .then((response) => {
        const taskInfo = response.data;
        setTaskTitle(taskInfo.title);
        setTaskDescription(taskInfo.detail);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="TaskDetailPage">
      <div className="task-title">
        <Input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />
      </div>
      <div className="task-description">
        <Input
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>
    </div>
  );
}

export default TaskDetailPage;
