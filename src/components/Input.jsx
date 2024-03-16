import { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { VisibilityContext } from "../context/VisibilityContextProvider";
import { addTask } from "../features/Task/tasksSlice";

export default function Input() {
  const { isOpen, toggle } = useContext(VisibilityContext);

  const [textInput, setTextInput] = useState("");

  const dispatch = useDispatch();

  const unique_id = uuid();

  const handleClick = () => {
    dispatch(
      addTask({ id: unique_id, text: textInput, status: "in progress" })
    );
    toggle(false);
    setTextInput("");
  };

  if (!isOpen) return null;
  return (
    <div className="grid grid-cols-2 w-64 sm:px-5 xs:w-[64]  gap-2 px-2 py-2 rounded-xl absolute left-[50%] translate-x-[-50%] top-[30%] bg-[#1e1e1e] border border-[#c0b298]">
      <textarea
        cols="10"
        rows="5"
        autoFocus
        className="col-span-2 appearance-none bg-transparent  border border-[#c0b298] p-2  text-[#c0b298] rounded-lg outline-1 mx-2 my-3  focus:ring-0  overflow-hidden  resize-y"
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
      ></textarea>
      <button
        onClick={handleClick}
        className="col-span-2 place-self-end px-2 py-1 mx-3 mb-3 bg-[#c0b298] text-[#0D0D0D] btn rounded-full text-center disabled:bg-transparent disabled:text-gray-500 "
        disabled={textInput.length > 0 ? false : true}
      >
        Done
      </button>
    </div>
  );
}
