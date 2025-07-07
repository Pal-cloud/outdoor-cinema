// CREATE
async function createMovie(newMovie) {
// pendiente de implementar
}

// READ
async function getMovies() {
  const result = await fetch('http://localhost:3000/movies');
  const data = await result.json();
  return data;
}

// UPDATE
async function updateMovie(id, editedMovie) {
  // pendiente de implementar
}

// DELETE
async function deleteMovie(id){
    const response = await fetch(`http://localhost:3000/movies/${id}`, {
        method: "DELETE", // Método para eliminar un recurso
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(`Película con id ${id} eliminada`);
    return response.ok; // Devuelve true si fue exitoso
}

// IMPRIMIR
let moviesContainer = document.querySelector('#movies-container');

async function printMovies() {
  moviesContainer.innerHTML = ""; // Limpiar contenedor
  const movies = await getMovies();

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("movie-card");

    card.innerHTML = `
      <h3>${movie.title}</h3>
      <p><strong>Año:</strong> ${movie.year}</p>
      <p><strong>Género:</strong> ${movie.gender}</p>
      <p><strong>Ciencia:</strong> ${movie.scienceField}</p>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Actores:</strong> ${movie.actors}</p>
      <p><strong>Descripción:</strong> ${movie.movie_description}</p>
      ${movie.video_url ? `<iframe src="${movie.video_url}" frameborder="0" allowfullscreen></iframe>` : ""}
   `;
    moviesContainer.appendChild(card);
  });
}