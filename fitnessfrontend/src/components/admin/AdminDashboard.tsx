import DisplayUsers from "./DisplayUsers.tsx";
import {useState} from "react";

export default function AdminDashboard(){
    const [isSearching,setIsSearching] = useState<boolean>(false);
    const [keyword,setKeyWord] = useState<string>("");
    return(
        <div>
            <div className={"flex justify-center flex-col"}>
                <div className={"border-b-2  w-full text-center pb-5 bg-white border-slate-200 shadow-lg dark:bg-surface " +
                    "dark:border-surface-border"}>
                    <h1 className={"text-2xl lg:text-4xl"}>Admin Control panel</h1>
                </div>

                <div className={"my-10 flex flex-col justify-center mx-20"}>
                    <label>Search username</label>
                    <input id={"searchbar"} className={"border-2 bg-white p-2 text-black w-full rounded-md"} type={"text"} placeholder={"username"}/>
                </div>
                <div className={"mt-5 flex justify-center"}>
                    <button className={"border-2 rounded-xl w-[50%] p-3 bg bg-green-400 hover:bg-green-500 " +
                        "dark:border-surface-border dark:bg-green-800 dark:hover:bg-green-900 text-xl"}
                    onClick={()=>{
                        const searchbar = document.getElementById("searchbar") as HTMLInputElement;
                        setKeyWord(searchbar.value);
                        setIsSearching(true);
                    }}>Search</button>
                </div>
                {
                    isSearching?
                        <div className={"mt-5 flex justify-center"}>
                            <button className={"border-2 rounded-xl w-[50%] p-3 bg bg-red-400 hover:bg-red-500 " +
                                "dark:border-surface-border dark:bg-red-800 dark:hover:bg-red-900 text-xl"}
                            onClick={() => {
                                setIsSearching(false)
                            }}>Clear search</button>
                        </div>:
                        <></>
                }
            </div>
            <div className={"flex justify-center mx-10 mt-10 border-2 p-3 dark:border-surface-border rounded-md bg-white dark:bg-surface"}>
                        <DisplayUsers isSearching={isSearching} keyword={keyword}/>
            </div>
        </div>
    )
}