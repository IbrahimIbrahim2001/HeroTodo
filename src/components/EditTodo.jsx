import { useState } from "react";
import { useDispatch } from "react-redux";
import { editTask } from "../features/Task/tasksSlice";

export default function EditTodo({ todo, index, setToEdit }) {
  const [textInput, setTextInput] = useState(todo?.text);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(editTask({ index, todo: { ...todo, text: textInput } }));
    setToEdit(false);
  };
  return (
    <div className="grid grid-cols-2 w-64 sm:px-5 xs:w-[64]  gap-2 px-2 py-2 rounded-2xl absolute left-[50%] translate-x-[-50%] top-[30%]  z-10 bg-[#1e1e1e] border border-[#c0b298]">
      <textarea
        cols="10"
        rows="5"
        autoFocus
        className="col-span-2 appearance-none bg-transparent border border-[#c0b298] p-2  text-[#c0b298] rounded-lg outline-1 mx-2 my-3  focus:ring-0  overflow-auto scrollbar-hide "
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      ></textarea>
      <button
        onClick={handleClick}
        className="col-span-2 place-self-end px-2 py-1 mx-3 mb-3 bg-[#c0b298] text-[#0D0D0D] btn rounded-full text-center disabled:bg-transparent disabled:text-gray-500"
        disabled={textInput.length > 0 ? false : true}
      >
        Done
      </button>
    </div>
  );
}
