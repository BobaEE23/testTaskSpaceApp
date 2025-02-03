import { ListOfPersons } from "./ListOfPersons"
import { MainHeader } from "./MainHeader"


import { Link } from "react-router-dom"

export const Main = ()=>{
    
    return(
        <div className="MainPage">
            <MainHeader/>
            <Link to={"/testTaskSpaceApp/favourite"}><button className="fav-button">избранное</button></Link>
            
            <ListOfPersons />

            
        </div>
    )
}