// import TodoScilton from "../components/todoScilton";
import { ChangeEvent, useState } from "react";
import Paginator from "../components/ui/Paginator";
import useAuthenticatedQuery from "../hook/useAuthenticatedQuery"
import Button from "../components/ui/Button";
import { onGenerateTodos } from "../utlis/function";

const TodosPage = ()=>{
    const storageKey = "loggedInUser";
    const userDataString = localStorage.getItem(storageKey);
    const userData = userDataString ? JSON.parse(userDataString) : null;

    const [page,setPage] = useState<number>(1);
    const [pageSize,setPageSize] = useState<number>(10)
    const [sotrBy,setSortBy] = useState<string>('DESC')
    const {isLoading,data,isFetching} = useAuthenticatedQuery({
        queryKey:[`todos-page-${page}`, `${pageSize}`,`${sotrBy}`],
        url:`/todos?pagination[${pageSize}]=10&pagination[page]=${page}&sort=createdAt:${sotrBy}`,
        config:{
            headers:{
            Authorization:`Bearer ${userData.jwt}`
            }
        }
    })
    // handlers
    const onClickPrev = ()=>{
        setPage(prev => prev - 1)
    }
    const onClickNext = ()=>{
        setPage(prev => prev + 1)
    }
    const onChangePageSize= (e:ChangeEvent<HTMLSelectElement>)=>{
            setPageSize(+e.target.value)
    }
    const onChangeSortBy= (e:ChangeEvent<HTMLSelectElement>)=>{
        setSortBy(e.target.value)
}
    if (isLoading) return <h3>loading....</h3>

    return(
        <section className="max-w-2xl mx-auto">
            <div className="flex item-center justify-between space-x-2">
                <Button size={"sm"} onClick={onGenerateTodos} title="Genrate 100 records">
                    Genrate todos
                    </Button>
                    <div className="flex items-center justify-between space-x-2 text-md">
                        <select className="border-2 border-indigo-600 rounded-md p-2" value={sotrBy} onChange={onChangeSortBy}>
                            <option disabled>sort by</option>
                            <option value="ASC">Oldest</option>
                            <option value="DESC">Latest</option>
                        </select>
                        <select className="border-2 border-indigo-600 rounded-md p-2" value={pageSize} onChange={onChangePageSize}> 
                            <option disabled>Page size</option>
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
            </div>
    <div className="my-10">
        {data.data.length ? data.data.map(({attributes,id}:{id:number,attributes:{title:string}}) => (
            <div key={id} className="flex items-center justify-between hover:bg-gray-100 duration-300 p-3 rounded-md even:bg-gray-100">
                <h3 className="w-full font-semibold">{id}  - {attributes.title}</h3>
            </div>
)) : (<h3>No todos yet!</h3>)}
        <Paginator 
        page = {page}
        pageCount={data.meta.pagination.pageCount} 
        onClickNext={onClickNext} onClickPrev={onClickPrev} 
        total={data.meta.pagination.total}
        isLoading={isLoading || isFetching}/>
    </div>
    </section>
    )
};


export default TodosPage