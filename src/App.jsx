//styles
import "./index.css";

//components
import AddTask from "./components/AddTask";
import Navbar from "./components/Navbar";
import Todos from "./features/Task/Todos";

//framer motion

//context
import VisibilityContextProvider from "./context/VisibilityContextProvider";

function App() {
  return (
    <div className="w-screen h-screen overflow-auto scrollbar-hide bg-[#0d0d0d] grid place-content-start grid-cols-1 pb-5">
      <Navbar />
      <VisibilityContextProvider>
        <Todos />
        <AddTask />
      </VisibilityContextProvider>
    </div>
  );
}

export default App;
