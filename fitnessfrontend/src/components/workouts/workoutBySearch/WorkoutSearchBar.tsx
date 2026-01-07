export default function WorkoutSearchBar(prop:{setSearchTerm:(term:string) => void, handleSearchEnable:()=>void}){
    return(
      <div className={"flex justify-center"}>
          <div className={"flex flex-col border p-5 w-[50%] rounded-md bg-slate-50 shadow-md mb-5 mt-5"}>
              <label>Enter a Search Term to search a workout!</label>
              <input required={true} id={"searchBar"} className={"border-2 rounded-lg text-center"} placeholder={"push-up"}/>
              <div className={"grid lg:grid-cols-2 md:grid-cols-1 mt-5 gap-1"}>
                  <button className={"bg-green-300 px-5 rounded-lg transition delay-50 ease-in-out hover:bg-green-500"}
                  onClick={() => {
                      const searchBar = document.getElementById("searchBar") as HTMLInputElement;
                      const value = searchBar.value;
                      prop.setSearchTerm(value);
                  }}>Search</button>
                  <button className={"bg-red-300 px-5 rounded-lg transition delay-50 ease-in-out hover:bg-red-500 lg:mt-0 sm:mt-2"}
                  onClick={prop.handleSearchEnable}>Clear Search</button>
              </div>
          </div>
      </div>
    );
}