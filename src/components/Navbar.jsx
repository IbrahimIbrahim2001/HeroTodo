//date fromat
import { format } from "date-fns";

import { useSelector } from "react-redux";
export default function Navbar() {
  const currentDate = new Date();
  const formattedDate = format(currentDate, "dd/MMM/yyyy");

  const todos = useSelector((state) => state.todos?.todos);
  const complatedTodosLength = todos.filter(
    (todo) => todo.status === "complated"
  ).length;
  return (
    <div className="h-12 mb-4 px-5 sm:px-6 flex items-center justify-between text-[#c0b298] font-bold border-b border-[#ff5631]">
      <div className="flex">
        <p>HERO</p>
        <p className="text-[#ff5631]">TODO</p>
      </div>
      {todos.length > 0 && (
        <p className=" text-[#c0b298]  font-bold ">
          {complatedTodosLength}/{todos.length}
        </p>
      )}
      <p>{formattedDate}</p>
    </div>
  );
}
