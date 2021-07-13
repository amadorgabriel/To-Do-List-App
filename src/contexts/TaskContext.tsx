import React, { createContext, useState } from "react";
import { TaskItemProps } from "../components/TaskItem";

type TaskContextProps = {
  children: React.ReactNode;
};

interface TaskProviderProps {
  taskList: TaskItemProps[];

  addTask: (task: TaskItemProps) => void;
  deleteTaskById: (id: number) => void;
  overWriteTaskList: (tasks: TaskItemProps[]) => void;
}

export const TaskContext = createContext({} as TaskProviderProps);

export const TaskProvider = ({ children }: TaskContextProps) => {
  const [taskList, setTaskList] = useState([] as TaskItemProps[]);

  function addTask(task: TaskItemProps) {
    setTaskList([...taskList, task]);
  }

  function deleteTaskById(id: number) {
    //remove o id especificado
    let newTaskList = taskList.filter(newTask => {
      if (id !== newTask.id) {
        return newTask;
      }
    });

    //atualiza o id
    newTaskList.map((task, index) => {
      let newTaskId = {
        id: index,
        name: task.name
      };

      newTaskList[index] = newTaskId;
    });

    setTaskList(newTaskList);
  }

  function overWriteTaskList(tasks: TaskItemProps[]) {
    setTaskList(tasks);
  }

  return (
    <TaskContext.Provider
      value={{ taskList, addTask, deleteTaskById, overWriteTaskList }}
    >
      {children}
    </TaskContext.Provider>
  );
};
