import { FormEvent, useState, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DraggableProvided,
  DroppableProvided,
} from "react-beautiful-dnd";

import "./App.scss";

import { TaskItem, TaskItemProps } from "./components/TaskItem/index";
import { TaskContext } from "./contexts/TaskContext";

function App() {
  const [currentInputValue, setCurrentInputValue] = useState("");

  const { taskList, addTask, overWriteTaskList } = useContext(TaskContext);

  const handleAddTask = (event: FormEvent) => {
    event.preventDefault();

    if (currentInputValue !== "") {
      const currentTask: TaskItemProps = {
        id: taskList?.length,
        name: currentInputValue,
      };

      addTask(currentTask);

      toast.success("🎉 Tarefa adicionada com sucesso!!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setCurrentInputValue("");
    } else {
      toast.error("📌 Preencha o campo corretamente.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    let newTaskList = taskList;

    const [reorderedItem] = newTaskList.splice(result.source.index, 1);
    newTaskList.splice(result.destination.index, 0, reorderedItem);

    overWriteTaskList(newTaskList);
  }

  return (
    <div className="container">
      <div className="content">
        <h1>Todo List </h1>
        <p>Reorder your list by dragging and dropping!</p>

        <form onSubmit={handleAddTask}>
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
          {taskList[0] !== undefined ? (
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <Droppable droppableId="tasks">
                {(provided: DroppableProvided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {taskList?.map((task, index) => (
                      <Draggable
                        key={index}
                        draggableId={String(index)}
                        index={index}
                      >
                        {(provided: DraggableProvided) => {                        
                          return (
                            <TaskItem
                              id={task.id}
                              name={task.name}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              ref={provided.innerRef}
                            />
                          );
                        }}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          ) : (
            <div className="empty">
              <p>Você ainda não tem nenhum item a fazer.</p>
            </div>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
