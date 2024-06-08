const apiKey = '2e840906';
const searchInput = document.getElementById('search');
const resultsDiv = document.getElementById('results');

searchInput.addEventListener('input', () => {
    const query = searchInput.value;
    if (query.length > 2) {
        fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
            .then(response => response.json())
            .then(data => displayResults(data.Search))
            .catch(error => console.error('Error:', error));
    }
});

function displayResults(movies) {
    resultsDiv.innerHTML = '';
    if (movies) {
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie');
            movieDiv.innerHTML = `
                <span><a href="movie.html?id=${movie.imdbID}">${movie.Title} (${movie.Year})</a></span>
                <button class="btn btn-primary" onclick="addToFavorites('${movie.imdbID}')">Favorite</button>
            `;
            resultsDiv.appendChild(movieDiv);
        });
    }
}

function addToFavorites(imdbID) {
    let favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (!favorites.includes(imdbID)) {
        favorites.push(imdbID);
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
        alert('Added to favorites!');
    }
}
