export const InputMain = ({ setSearchQuery }) => {
    return (
      <input
        className="inputMain"
        placeholder="Введите имя персонажа..."
        onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
      />
    )
  }
  