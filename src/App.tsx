import { FormEvent, useState } from "react";

import "./App.css";

import { TaskItem, TaskItemProps } from "./components/TaskItem/index";

function App() {
  const [currentInputValue, setCurrentInputValue] = useState("");
  const [taskList, setTaskList] = useState([] as TaskItemProps[]);

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();

    if (currentInputValue !== "") {
      const currentTask: TaskItemProps = {
        id: taskList.length,
        name: currentInputValue,
        isFinished: false,
      };

      setTaskList([...taskList, currentTask]);

      alert("Tarefa adicionada com sucesso!");

      setCurrentInputValue("");
    } else {
      alert("O campo nome não foi preenchido corretamente");
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1>Todo List </h1>

        <form
          className="content_form"
          onSubmit={event => {
            handleAddTask(event);
          }}
        >
          <input
            type="text"
            value={currentInputValue}
            placeholder="Tarefa"
            onChange={event => {
              setCurrentInputValue(event.target.value);
            }}
          />
          <button>Adicionar</button>
        </form>

        <div className="content_task">
          {taskList.map(task => (
            <TaskItem id={task.id} name={task.name} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
