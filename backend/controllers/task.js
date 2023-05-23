import Task from '../models/Task.js';
import createError from '../utils/createError.js';

export const createTask = async (req, res, next) => {
  const newTask = new Task({
    title: req.body.title,
    user: req.user.id,
    completed: req.body.completed,
  });
  try {
    const savedTask = await newTask.save();
    return res.status(200).json(savedTask);
  } catch (err) {
    return next(err);
  }
};

export const deleteAllTasks =()=>{

}

export const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
};

export const getCurrentUserTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    return res.status(200).json(tasks);
  } catch (err) {
    return next(err);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    console.log("task id is " + req.params.taskId);
    console.log(req.user.id)
    if (task.user === req.user.id) {
      console.log(req.user.id)
      return next(createError({ status: 401, message: "It's not your todo." }));
    }
   const mytask = await Task.findById(req.params.taskId);
   //console.log(mytask);
    return res.json('Task Deleted Successfully');
  } catch (err) {
    return next(err);
  }
};



export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).message("Task Not Found");

    const updatedTask = await Task.findByIdAndUpdate(req.params.taskId, {
      title: req.body.title
    });
    return res.status(200).json(updatedTask);
  } catch (err) {
    return next(err);
  }
};

