const API_URL = "http://localhost:3000/movies";

const movieList = document.getElementById("movie-list");
const form = document.getElementById("add-movie-form");
const searchInput = document.getElementById("search-input");

let movies = [];

// Render movies
function render(list) {
    movieList.innerHTML = "";
    list.forEach(m => {
        const div = document.createElement("div");
        div.className = "movie-item";
        div.innerHTML = `
            <p><strong>${m.title}</strong> (${m.year}) - ${m.genre}</p>
            <div class="controls">
                <button onclick="editMovie('${m.id}')">Edit</button>
                <button onclick="deleteMovie('${m.id}')">Delete</button>
            </div>
        `;
        movieList.appendChild(div);
    });
}

// Load movies from server
function loadMovies() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            movies = data;
            render(movies);
        })
        .catch(err => console.error("Error loading movies:", err));
}

// Add movie
form.addEventListener("submit", e => {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const genre = document.getElementById("genre").value.trim();
    const year = parseInt(document.getElementById("year").value);

    if (!title || !year) return alert("Please provide valid title and year");

    fetch(API_URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ title, genre, year })
    })
    .then(() => {
        form.reset();
        loadMovies();
    })
    .catch(err => console.error("Error adding movie:", err));
});

// Edit movie
function editMovie(id) {
    const m = movies.find(movie => movie.id.toString() === id.toString());
    if (!m) return alert("Movie not found!");

    const title = prompt("New Title:", m.title);
    const genre = prompt("New Genre:", m.genre);
    const year = prompt("New Year:", m.year);

    if (!title || !year) return alert("Title and Year cannot be empty");

    fetch(`${API_URL}/${id}`, { 
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ title, genre, year: parseInt(year) })
    })
    .then(loadMovies)
    .catch(err => console.error("Error editing movie:", err));
}

// Delete movie
function deleteMovie(id) {
    if (!confirm("Delete this movie?")) return;

    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(loadMovies)
        .catch(err => console.error("Error deleting movie:", err));
}

// Search movies
searchInput.addEventListener("input", () => {
    const term = searchInput.value.toLowerCase();
    const filtered = movies.filter(m =>
        m.title.toLowerCase().includes(term) ||
        m.genre.toLowerCase().includes(term)
    );
    render(filtered);
});

// Load movies on page load
loadMovies();
