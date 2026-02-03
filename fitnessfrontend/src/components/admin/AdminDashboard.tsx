export default function AdminDashboard(){
    return(
        <div>
            <div className={"flex justify-center flex-col"}>
                <div className={"border-b-2  w-full text-center pb-5 bg-white border-slate-200 shadow-lg dark:bg-surface " +
                    "dark:border-surface-border"}>
                    <h1 className={"text-2xl lg:text-4xl"}>Admin Control panel</h1>
                </div>

                <div className={"my-10 flex flex-col justify-center mx-20"}>
                    <label>Search username</label>
                    <input className={"border-2 bg-white p-2 text-black w-full rounded-md"} type={"text"} placeholder={"username"}/>
                </div>
                <div className={"mt-5 flex justify-center"}>
                    <button className={"border-2 rounded-xl w-[50%] p-3 bg bg-green-400 hover:bg-green-500 " +
                        "dark:border-surface-border dark:bg-green-800 dark:hover:bg-green-900 text-xl"}>Search</button>
                </div>
            </div>
        </div>
    )
}