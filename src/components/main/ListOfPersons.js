import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { FavouriteContext } from "../../context/FavouriteContext"
import { InputMain } from "./InputMain"

export const ListOfPersons = () => {
  const [arrOfPersons, setArrOfPersons] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [personsPerPage] = useState(9)
  const [notification, setNotification] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const { favouriteArr, setFavouriteArr } = useContext(FavouriteContext)
  
  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => response.json())
      .then((data) => setArrOfPersons(data.results));
  }, [])

  
  const filteredPersons = arrOfPersons.filter(person =>
    person.name.toLowerCase().includes(searchQuery)
  )

  const currentPersons = filteredPersons.slice(
    (currentPage - 1) * personsPerPage,
    currentPage * personsPerPage
  )

  const nextPage = () => {
    if (currentPage * personsPerPage < filteredPersons.length) {
      setCurrentPage(currentPage + 1);
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const chooseFavourite = (id, person) => {
    if (favouriteArr.some((favPerson) => favPerson.id === person.id)) {
      setFavouriteArr(favouriteArr.filter((favPerson) => favPerson.id !== person.id))
      setNotification(`Персонаж ${person.name} удален из избранного!`)
    } else {
      setFavouriteArr((prevArr) => [...prevArr, person]);
      setNotification(`Персонаж ${person.name} добавлен в избранное!`)
    }
    setTimeout(() => setNotification(""), 3000)
  }

  return (
    <div className="list-of-persons-container">
      
      {notification && <div className="notification">{notification}</div>}

      
      <InputMain setSearchQuery={setSearchQuery} />

      <div className="list-of-persons">
        {currentPersons.length > 0 ? (
          currentPersons.map((person) => (
            <div key={person.id} className="person-wrapper">
              <Link to={`/detail/${person.id}`} state={person} className="person-card">
                <img src={person.image} alt={person.name} />
                <h3>{person.name}</h3>
              </Link>
              <button
                className="fav-button"
                onClick={() => chooseFavourite(person.id, person)}
              >
                {favouriteArr.some((favPerson) => favPerson.id === person.id)
                  ? "Удалить из избранного"
                  : "Добавить в избранное"}
              </button>
            </div>
          ))
        ) : (
          <p>Персонажи не найдены...</p>
        )}
      </div>

      
      {filteredPersons.length > personsPerPage && (
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Предыдущая
          </button>
          <span>
            Страница {currentPage} из {Math.ceil(filteredPersons.length / personsPerPage)}
          </span>
          <button onClick={nextPage} disabled={currentPage * personsPerPage >= filteredPersons.length}>
            Следующая
          </button>
        </div>
      )}
    </div>
  )
}
