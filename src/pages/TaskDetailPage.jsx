import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";

function TaskDetailPage() {
  const { id } = useParams();
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`)
      .then((response) => {
        const taskInfo = response.data;
        setTaskTitle(taskInfo.title);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="TaskDetailPage">
      <Input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} />
    </div>
  );
}

export default TaskDetailPage;
