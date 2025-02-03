import { useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { useContext } from "react"
import { FavouriteContext } from "../../context/FavouriteContext"

export const Detail = () => {
  const location = useLocation()
  const person = location.state

  const { favouriteArr, setFavouriteArr } = useContext(FavouriteContext)

  const [isFavourite, setIsFavourite] = useState(false)

  useEffect(() => {
    if (favouriteArr.some((favPerson) => favPerson.id === person.id)) {
      setIsFavourite(true)
    } else {
      setIsFavourite(false)
    }
  }, [favouriteArr, person.id])

  const toggleFavourite = () => {
    if (isFavourite) {
      setFavouriteArr(favouriteArr.filter((favPerson) => favPerson.id !== person.id))
    } else {
      setFavouriteArr([...favouriteArr, person])
    }
    setIsFavourite(!isFavourite)
  };

  if (!person) {
    return <div>Загрузка...</div>
  }

  return (
    <div className="detail-page">
      <h1>{person.name}</h1>
      <img src={person.image} alt={person.name} />
      <p className="status"><strong>Статус:</strong> {person.status}</p>
      <p className="species"><strong>Раса:</strong> {person.species}</p>
      <p className="gender"><strong>Пол:</strong> {person.gender}</p>
      <p className="origin"><strong>Происхождение:</strong> {person.origin.name}</p>
      <p className="location">
        <strong>Локация:</strong> 
        <a href={person.location.url} target="_blank" rel="noopener noreferrer">
          {person.location.name}
        </a>
      </p>
      <p className="episode-count"><strong>Эпизоды:</strong> {person.episode.length}</p>

      <button 
        className={`fav-button ${isFavourite ? 'active' : ''}`} 
        onClick={toggleFavourite}
      >
        {isFavourite ? "Удалить из избранного" : "Добавить в избранное"}
      </button>

      <button className="back-button" onClick={() => window.history.back()}>
        Вернуться назад
      </button>
    </div>
  )
}