import Button from "./ui/Button";
import useAuthenticatedQuery from "../hook/useAuthenticatedQuery";
import { ITodosData } from "../interfaces";
import Modal from "./ui/Model";
import { useState } from "react";
import Input from "./ui/Input";

const TodoList = () => {
  const [isEditModelOpen,setEditModelOpen] = useState(false)
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null
  

  // Handelers
  function onToggleEditModil(){
    setEditModelOpen(prev => !prev)
  }
  const {isLoading,data} = useAuthenticatedQuery({
    queryKey:["todos"],
    url:"/users/me?populate=todos",
    config:{
      headers:{
        Authorization:`Bearer ${userData.jwt}`
      }
    }
  })
  
  if (isLoading) return <h3>Loading..</h3>;
  console.log(data.todos)
  return (
    
    <div className="space-y-1 ">
      {data.todos.length ? data.todos.map((todo:ITodosData) => (
        <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">1 - {todo.title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={"sm"} onClick={onToggleEditModil}>Edit</Button>
          <Button variant={"danger"} size={"sm"}>
            Remove
          </Button>
        </div>
      </div>
      )) : <h3>No todos yet!</h3>}
      
      <Modal isOpen={isEditModelOpen} closeModal={onToggleEditModil} title="edit this todo">
        <Input value="edit todo"/>
        <div className="flex items-center space-x-2 mt-4">
        <Button className="bg-indigo-700 hover:bgidigo-800">Update</Button>
        <Button variant={"cancel"} onClick={onToggleEditModil}>
          Cancel
        </Button>
        </div>
      </Modal>
      </div>
    
  );
};

export default TodoList;
