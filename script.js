 //Gets our movies container where we display all our movies
 const moviesContainer = document.getElementById('moviesContainer');

 //Gets our SearchInput where we will be writing our movie name
 const searchInput = document.getElementById('searchInput');



// Get Our API key from the OMDB API
const API_KEY = 'b7194fb5';

//create a variable with function for our favorites movie part
const favorites = loadFavorites();

//Add an Event listener to searchInput and fetch the movie and render it on display
searchInput.addEventListener('input', async () => {
  const searchQuery = searchInput.value;
  if (searchQuery.length > 2) {
    const movies = await fetchMovies(searchQuery);
    renderMovies(movies);
  }
});


// Function to fetch movies from the OMDB API and returns empty array if found none.
async function fetchMovies(searchQuery) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchQuery}`);
 
  const data = await response.json();
  console.log(data);
  return data.Search || [];
}

// Function to render movie cards on the page
function renderMovies(movies, isFavoritesSection = false) {
  moviesContainer.innerHTML = '';

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    movieCard.innerHTML = `
      <img src="${movie.Poster}" alt="${movie.Title}">
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
      ${isFavoritesSection ? `<button class="delete-button" onclick="removeFromFavorites('${movie.imdbID}')">Remove</button>` : `<button onclick="addToFavorites('${movie.imdbID}')">Add to Favorites</button>`}
    `;
    moviesContainer.appendChild(movieCard);
  });

  if (movies.length === 0) {
    moviesContainer.innerHTML = '<p>No movies found.</p>';
  }
}


//Function to store the favorites in the local storage of our browser
function loadFavorites() {
  const storedFavorites = localStorage.getItem('favorites');
  return storedFavorites ? JSON.parse(storedFavorites) : [];
}

function saveFavorites() {
  localStorage.setItem('favorites', JSON.stringify(favorites));
}

function showFavorites() {
  renderMovies(favorites, true); // Pass `true` to indicate that it's the favorites section
}

//Function used to remove movies from favorites
function removeFromFavorites(movieID) {
  const index = favorites.findIndex((movie) => movie.imdbID === movieID);
  if (index !== -1) {
    favorites.splice(index, 1);
    saveFavorites(); // Save favorites to localStorage
    showFavorites();
  }
}

//Function used to add movies to favorite
function addToFavorites(movieID) {
  const isMovieInFavorites = favorites.some((movie) => movie.imdbID === movieID);

  if (!isMovieInFavorites) {
    fetchMovieDetails(movieID)
      .then((movie) => {
        favorites.push(movie);
        saveFavorites(); // Save favorites to localStorage
        showFavorites();
      })
      .catch((error) => {
        console.error('Error fetching movie details:', error);
      });
  }
}
// Function to fetch movie details using OMDB API
async function fetchMovieDetails(movieID) {
  const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieID}`);
  const data = await response.json();
  return data;
}



function showHindiMovies() {
  const defaultHindiMovies = [
    { Title: "Raees", Year: "2017", Poster: 'https://m.media-amazon.com/images/M/MV5BMTc2NTYwMTE1NV5BMl5BanBnXkFtZTgwODQ5MzAwMTI@._V1_SX300.jpg', imdbID: "tt3405236" },
    { Title: "Don", Year: "1978", Poster:"https://m.media-amazon.com/images/M/MV5BMzc0OGU4NGYtNzgwMy00NThjLWJmYWItZDUzZTVlZjg0YjdjXkEyXkFqcGdeQXVyNjQ1MDcxNzM@._V1_SX300.jpg", imdbID: "tt0077451" },
    { Title: "Sholay", Year: "1975", Poster:"https://m.media-amazon.com/images/M/MV5BOWQ0YTUzYzItYjI0MC00OTZmLWE1MWQtY2EzMzU2MTlmMmJjXkEyXkFqcGdeQXVyMDkwNTkwNg@@._V1_SX300.jpg", imdbID: "tt0073707" },
    { Title: "Jab We Met", Year: "2007", Poster: "https://m.media-amazon.com/images/M/MV5BYmIzYmY4MGItM2I4YS00OWZhLWFmMzQtYzI2MWY1MmM3NGU1XkEyXkFqcGdeQXVyNjQ2MjQ5NzM@._V1_SX300.jpg", imdbID: "tt10933370" },
    { Title: "Border", Year: "1997", Poster: "https://m.media-amazon.com/images/M/MV5BNWYwYmExOWQtYzNkOS00NWY5LWE4NTEtYTcwY2FiYmQ0OTg5XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg", imdbID: "tt0118751" },
    { Title: "Bajrangi Bhaijaan", Year: "2015", Poster:"https://m.media-amazon.com/images/M/MV5BMjE1NjQ5ODc2NV5BMl5BanBnXkFtZTgwOTM5ODIxNjE@._V1_SX300.jpg", imdbID: "tt3863552" },
    { Title: "Airlist", Year: "2016", Poster:"https://m.media-amazon.com/images/M/MV5BMGE1ZTkyOTMtMTdiZS00YzI2LTlmYWQtOTE5YWY0NWVlNjlmXkEyXkFqcGdeQXVyNjQ3ODkxMjE@._V1_SX300.jpg", imdbID: 'tt4387040' },
    { Title: "Gangs of Wasseypur", Year: "2012", Poster:"https://m.media-amazon.com/images/M/MV5BMTc5NjY4MjUwNF5BMl5BanBnXkFtZTgwODM3NzM5MzE@._V1_SX300.jpg", imdbID: 'tt1954470' },
    { Title: "Delhi Belly", Year: "2011", Poster:  "https://m.media-amazon.com/images/M/MV5BZjJmOTNjNDgtY2E3ZC00OTRmLTlmYWItNjRkMzQ4NzZlY2M2XkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg", imdbID: "tt1934231"},
    { Title: "Khuda Hafiz", Year: "2023", Poster:"https://m.media-amazon.com/images/M/MV5BODI2MTQxYjItNmZiNi00NTdkLWJmMzktZjA5YmViNjI2Y2UzXkEyXkFqcGdeQXVyMTIyNzY0NTMx._V1_SX300.jpg", imdbID: "tt13022984" },
    { Title: "Queen", Year: "2013", Poster:"https://m.media-amazon.com/images/M/MV5BNWYyOWRlOWItZWM5MS00ZjJkLWI0MTUtYTE3NTI5MDAwYjgyXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_SX300.jpg", imdbID: 'tt3322420' },
  ];
  renderMovies(defaultHindiMovies,false);

}
