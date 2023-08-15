import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Input } from "antd";

function TaskDetailPage() {
  const { id } = useParams();
  const [taskDetail, setTaskDetail] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/${id}`)
      .then((response) => {
        setTaskDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div className="TaskDetailPage">
      <Input value={taskDetail.title} />
    </div>
  );
}

export default TaskDetailPage;
