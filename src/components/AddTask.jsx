import { useState, useContext, useEffect, useRef } from "react";
import { VisibilityContext } from "../context/VisibilityContextProvider";
import Input from "./Input";

export default function AddTask() {
  const { toggle } = useContext(VisibilityContext);
  const [isDisabled, setIsDisabled] = useState(false);

  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        toggle(false);
        setIsDisabled(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [toggle]);

  return (
    <div ref={ref}>
      <div className="absolute bottom-0 right-0 px-3 py-5">
        <button
          onClick={() => {
            toggle(true);
            setIsDisabled(true);
          }}
          className="group flex justify-center items-center fixed right-5 bottom-5 h-10 w-10  overflow-hidden rounded-[50%] bg-[#ff5631] shadow disabled:hidden"
          disabled={isDisabled}
        >
          <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-white group-hover:text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          </span>
        </button>
      </div>
      <Input />
    </div>
  );
}
