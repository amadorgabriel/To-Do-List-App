import { useState, useContext, forwardRef, ForwardRefRenderFunction } from "react";
import { toast } from 'react-toastify';

import { BiTrash } from "react-icons/bi";
import { TaskContext } from "../../contexts/TaskContext";

import "./style.scss";
import 'react-toastify/dist/ReactToastify.css';

export interface TaskItemProps  {
  id: number;
  name: string;
}

export const TaskItemRenderFn: ForwardRefRenderFunction<HTMLDivElement, TaskItemProps> = ({id, name, ...rest}, ref ) => {
  const [checkValue, setCheckValue] = useState(false);
  const { deleteTaskById } = useContext(TaskContext);

  const handleWithDeleteTask = () => {
    deleteTaskById(id);

    toast('🚀 Removido com sucesso! ', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

  return (
    <div
      {...rest}
      ref={ref}
      className={`container-input ${checkValue ? "container-checked" : null}`}
      onClick={() => {
        setCheckValue(!checkValue);
      }}
    >
      <div>
        <input
          type="checkbox"
          onChange={() => {
            setCheckValue(!checkValue);
          }}
          checked={checkValue}
        />
        <p>{name}</p>
      </div>

      <button
        disabled={checkValue}
        onClick={() => {
          window.confirm("Tem certeza que deseja deletar este item?") &&
            handleWithDeleteTask()
        }}
      >
        <BiTrash size={22} className="icon" />
      </button>
    </div>
  );
};


export const TaskItem = forwardRef(TaskItemRenderFn) 