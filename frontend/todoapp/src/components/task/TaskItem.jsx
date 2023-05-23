import React, { useEffect, useState } from 'react';
import moment from 'moment';
import axios from 'axios';
import toast from 'react-hot-toast';
import classes from './TaskItem.module.scss';

function TaskItem({ task, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);
  const [tasktitle , setTaskTitle]= useState("");

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getTasks = async () => {
    try {
      const  {data}  = await axios.get('/api/tasks/mytasks');
      console.log("task data is " + data.title)
    } catch (err) {
      console.log(err);
    }
  };


  const editTask = async ()=>{
    try{
      await axios.put(`/api/tasks/${task._id}`, {
        title:tasktitle ,
      })
    }catch(err){
      console.log(err);
    }
  }
  
  useEffect (() => {
    getTasks();
  }, []);

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox} onChange={handleCheckboxClick} role="checkbox" aria-checked>
          <input type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
        </div>
        <p contentEditable="true" value ={setTaskTitle}>{task.title}</p>
      </td>
      <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td>{moment(task.createdAt).format('MMM Do YY')}</td>
      <td>
        <button
          type="button"
          className={classes.deleteBtn}
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
        <button  type="button"
          className={classes.deleteBtn}
          onClick={() => editTask(task._id)}
          >
          Edit
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
