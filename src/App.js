import { Route ,Routes} from 'react-router-dom'
import './App.css'
import { Main } from './components/main/Main'
import { Detail } from './components/detail/Detail'
import { Favourite } from './components/favourite/Favourite'
import { FavouriteProvider } from './context/FavouriteContext'

export const App =()=> {
  return (
    <FavouriteProvider>
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path="/detail/:id" element={<Detail/>}/>
        <Route path="/favourite" element={<Favourite/>}/>
      </Routes>
    
    </FavouriteProvider>
  );
}


