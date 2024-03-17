import { Reorder, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../../components/Todo";
import { reorderTodos } from "./tasksSlice";

export default function Tasks() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleReorder = (reorderedTodos) => {
    dispatch(reorderTodos(reorderedTodos));
  };

  return (
    <>
      {todos.length > 0 && (
        <>
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 10 }}
            className="relative left-[50%] translate-x-[-50%] overflow-auto scrollbar-hide p-6 sm:border border-[#928775] rounded-lg  min-h-96 w-full sm:min-w-64 sm:max-w-96"
          >
            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  type: "spring",
                  duration: 2,
                  bounce: 0.4,
                },
              }}
              className=" px-4 mb-3 text-[#c0b298]"
            >
              your tasks:
            </motion.p>
            <Reorder.Group axis="y" values={todos} onReorder={handleReorder}>
              {todos.map((todo, index) => (
                <Todo key={todo.id} todo={todo} index={index} />
              ))}
            </Reorder.Group>
          </motion.div>
        </>
      )}
    </>
  );
}
