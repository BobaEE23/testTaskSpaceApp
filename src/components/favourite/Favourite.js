import { Link } from "react-router-dom"
import { FavouriteContext } from "../../context/FavouriteContext"
import { useContext } from "react"

export const Favourite = () => {
  const { favouriteArr, setFavouriteArr } = useContext(FavouriteContext)

  
  const removeFromFavourite = (id) => {
    setFavouriteArr(favouriteArr.filter((person) => person.id !== id))
  };

  return (
    <div>
      <h1 className="favouriteTitle">Персонажи, которых вы добавили в избранное</h1>

      {favouriteArr.length > 0 ? (
        favouriteArr.map((person) => (
          <div key={person.id} className="person-wrapper">
            <Link to={`/testTaskSpaceApp/detail/${person.id}`} state={person} className="person-card">
              <img src={person.image} alt={person.name} />
              <h3>{person.name}</h3>
            </Link>
            <button
              className="fav-button"
              onClick={() => removeFromFavourite(person.id)}
            >
              Удалить из избранного
            </button>
          </div>
        ))
      ) : (
        <p>Вы не добавили персонажей в избранное.</p>
      )}
    </div>
  )
}
