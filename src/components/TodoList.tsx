import Button from "./ui/Button";
import useAuthenticatedQuery from "../hook/useAuthenticatedQuery";
import { ITodo } from "../interfaces";
import Modal from "./ui/Model";
import { useState , ChangeEvent , FormEvent } from "react";
import Input from "./ui/Input";
import Textarea from "./ui/Textarea";
import axiosInstance from "../config/axios.config";
import toast from "react-hot-toast";
import TodoScilton from "./todoScilton";

const TodoList = () => {
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null
  
  const [isEditModelOpen,setEditModelOpen] = useState(false)
  const [isUpdating,setIsUpdating] = useState(false)
  const [deleteModel,setDeleteModel] = useState(false)
  const [todoToEdite,setTodoToEdit] = useState<ITodo>({
    id: 0,
    title: "",
    description:""
  })
  const [todoToAdd,setTodoToAdd] = useState({
    title: "",
    description:""
  })
  const [isOpenAddModel,setIsAddModel] = useState(false)

  // Handelers
  const onCloseAddModil= () => {
    setTodoToAdd(
      {
        title: "",
        description:""
    }
    )
    setIsAddModel(false)
  };
  const onOpenAddModil= () => {
    setIsAddModel(true)
  }
  const onCloseEditModil= () => {
    setTodoToEdit(
      {
        id: 0,
        title: "",
        description:""
    }
    )
    setEditModelOpen(false)
  };
  const onOpenEditModil= (todo:ITodo) => {
    setTodoToEdit(todo)
    setEditModelOpen(true)
  }
  const {isLoading,data} = useAuthenticatedQuery({
    queryKey:["todoList",`${todoToEdite.id}`],
    url:"/users/me?populate=todos",
    config:{
      headers:{
        Authorization:`Bearer ${userData.jwt}`
      }
    }
  })

  const openDeleteModel = (todo:ITodo)=>{
    setTodoToEdit(todo)
    setDeleteModel(true)
  }
  const closeDeleteModel = ()=>{
    setTodoToEdit(
      {
        id: 0,
        title: "",
        description:""
    }
    )
    setDeleteModel(false)
  }

  const onChangeHandler = ( evt :ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value,name} = evt.target
    setTodoToEdit({
      ...todoToEdite,
      [name]:value
    })
  }
  const onChangeAddHandler = ( evt :ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {value,name} = evt.target
    setTodoToAdd({
      ...todoToAdd,
      [name]:value
    })
  }
  const onRemove = async ()=>{
    try {
    const {status} =  await axiosInstance.delete(`/todos/${todoToEdite.id}`,{
        headers:{
          Authorization:`Bearer ${userData.jwt}`
        }  
      })
      if (status === 200){
        closeDeleteModel()
      }
    } catch (error) {
      console.log(error)
    }
  }
  const submitHandler = async (evt:FormEvent<HTMLFormElement>) =>{
    setIsUpdating(true)
    evt.preventDefault()
    const {title,description} = todoToEdite;
    try {
    const {status} =  await axiosInstance.put(`/todos/${todoToEdite.id}`,{
      data:{title,description}
    },{
      headers:{
        Authorization:`Bearer ${userData.jwt}`
      }
    })
    if (status === 200){
      setTimeout(()=>{
        onCloseEditModil()
        toast.success("It will be deleted this todo after 500 ms", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        })
      },500)
    }
    } catch (error) {
      console.log(error)
    }finally{
      setIsUpdating(false)
    }
  }
  const submitAddTodoHandler = async (evt:FormEvent<HTMLFormElement>) =>{
    setIsUpdating(true)
    evt.preventDefault()
    const {title,description} = todoToAdd;
    try {
    const {status} =  await axiosInstance.post(`/todos`,{
      data:{title,description}
    },{
      headers:{
        Authorization:`Bearer ${userData.jwt}`
      }
    })
    if (status === 200){
      setTimeout(()=>{
        onCloseAddModil()
        toast.success("It will be deleted this todo after 500 ms", {
          position: "bottom-center",
          duration: 1500,
          style: {
            backgroundColor: "black",
            color: "white",
            width: "fit-content",
          },
        })
      },500)
    }
    } catch (error) {
      console.log(error)
    }finally{
      setIsUpdating(false)
    }
  }
  
  
  if (isLoading) return <>
  <div className="space-y-1 p-3">
  {Array.from({length : 3},(_,idx)=> <TodoScilton key={idx}/>)}
  </div>
  </>
  return (
    <div className="space-y-1 ">
      <div className="w-fit mx-auto my-10">
          <Button size={"sm"} onClick={onOpenAddModil}>Post new todo</Button>
      </div>
      {data.todos.length ? data.todos.map((todo:ITodo) => (
        <div key={todo.id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
        <p className="w-full font-semibold">{todo.id}- {todo.title}</p>
        <div className="flex items-center justify-end w-full space-x-3">
          <Button size={"sm"} onClick={()=> onOpenEditModil(todo)}>Edit</Button>
          <Button variant={"danger"} size={"sm"} onClick={()=>openDeleteModel(todo)}>
            Remove
          </Button>
        </div>
      </div>
      )) : <h3>No todos yet!</h3>}
      {/* add todo  */}
      <Modal isOpen={isOpenAddModel} closeModal={onCloseAddModil} title="Add A new todo">
        <form className="space-y-3" onSubmit={submitAddTodoHandler}>
        <Input name="title" value={todoToAdd.title} onChange={onChangeAddHandler}/>
        <Textarea name="description" value={todoToAdd.description} onChange={onChangeAddHandler}/>
        <div className="flex items-center space-x-2 mt-4">
        <Button className="bg-indigo-700 hover:bgidigo-800" isLoading={isUpdating}>Add Todo</Button>
        <Button variant={"cancel"} onClick={onCloseEditModil}>
          Cancel
        </Button>
        </div>
        </form>
      </Modal>
      {/* edit model */}
      <Modal isOpen={isEditModelOpen} closeModal={onCloseEditModil} title="edit this todo">
        <form className="space-y-3" onSubmit={submitHandler}>
        <Input name="title" value={todoToEdite.title} onChange={onChangeHandler}/>
        <Textarea name="description" value={todoToEdite.description} onChange={onChangeHandler}/>
        <div className="flex items-center space-x-2 mt-4">
        <Button className="bg-indigo-700 hover:bgidigo-800" isLoading={isUpdating}>Update</Button>
        <Button variant={"cancel"} onClick={onCloseEditModil}>
          Cancel
        </Button>
        </div>
        </form>
      </Modal>
          
      <Modal isOpen={deleteModel}
      closeModal={closeDeleteModel}
      title="are you sure you want to remove this Todo from your store?"
      description="deleting this todo will remove it permanently from your inventory. any associated data, sales history and other related information
      will also be deleted , plase make sure this is the intended action."
      >
        <div className="flex items-center space-x-3">
          <Button variant={"danger"} onClick={onRemove}>
            Yes. remove
            </Button>
            <Button variant={"cancel"} onClick={closeDeleteModel}>Cansel</Button>
        </div>
      </Modal>
      </div>
    
  );
};

export default TodoList;

// ChangeEvent<HTMLInputElement>
