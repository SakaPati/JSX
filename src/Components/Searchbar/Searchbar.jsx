export const Searchbar = ({ onSubmit }) => {
    const handleSubmite = (e) => { 
        e.preventDefault();
        onSubmit(e.target.elements[1].value);
    }

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmite}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};