import { useContext, useState, useEffect, useRef } from "react";

import EditTodo from "../components/EditTodo";

import { useDispatch } from "react-redux";
import { deleteTask, toggleTodo } from "../features/Task/tasksSlice";

import { VisibilityContext } from "../context/VisibilityContextProvider";

import { Reorder, motion } from "framer-motion";

export default function Todo({ todo, index }) {
  const { isOpen } = useContext(VisibilityContext);
  const [toEdit, setToEdit] = useState(false);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const textDecoration =
    todo.status === "in progress" ? "default" : "line-through";
  const buttonColor =
    todo.status === "in progress" ? "bg-white" : "bg-[#61ea55]";

  const checkTextColor =
    todo.status === "in progress" ? "text-[#0d0d0d]" : "text-white";

  const handleDragStart = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      e.stopPropagation();
      setToEdit(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setToEdit(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [setToEdit]);

  //motion
  const todoVariants = {
    offscreen: {
      y: 60,
    },
    onscreen: {
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  return (
    <>
      <Reorder.Item
        key={todo.id}
        value={todo}
        onPointerDown={(e) => handleDragStart(e)}
        onDrag={() => setToEdit(false)}
        dragListener={!toEdit}
      >
        <motion.div
          ref={ref}
          onPointerDown={handleDragStart}
          className="flex justify-between items-center mb-3 rounded"
          variants={todoVariants}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.8 }}
        >
          <motion.div
            className={`grid grid-cols-1 overflow-hidden  bg-[#1e1e1e] border border-[#928775] rounded-lg px-3 mx-3 flex-1 h-12`}
            key={todo.id}
          >
            <span className="col-span-1"></span>

            <motion.p
              className={`truncate text-[#c0b298] ${textDecoration}`}
              onClick={() => {
                setToEdit(!toEdit);
              }}
            >
              {todo.text}
            </motion.p>
            <span className="col-span-1"></span>
          </motion.div>
          <div className="flex">
            <motion.button
              onClick={() => {
                dispatch(toggleTodo(index));
              }}
              className={`w-8 h-8 mr-3 rounded-full shadow flex justify-center items-center ${buttonColor} ${checkTextColor} disabled:bg-gray-500`}
              disabled={isOpen || toEdit ? true : false}
              defaultValue={"add"}
              // onTap={handleTap}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </motion.button>
            <button
              onClick={() => dispatch(deleteTask(todo.id))}
              className="w-8 h-8 mr-3 rounded-lg  shadow flex justify-center items-center bg-[#ff5631]  disabled:bg-gray-400"
              disabled={isOpen || toEdit ? true : false}
              defaultValue={"delete"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            <button
              onClick={() => setToEdit(!toEdit)}
              className="hidden w-8 h-8 rounded-lg shadow md:flex justify-center items-center bg-blue-400 disabled:bg-gray-400"
              disabled={isOpen || toEdit ? true : false}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
                defaultValue={"edit"}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                />
              </svg>
            </button>
          </div>
          {toEdit && (
            <EditTodo
              todo={todo}
              index={index}
              toEdit={toEdit}
              setToEdit={setToEdit}
            />
          )}
        </motion.div>
      </Reorder.Item>
    </>
  );
}
