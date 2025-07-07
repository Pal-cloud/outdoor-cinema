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
let moviesContainer = document.querySelector('section');

async function printMovies() {
  const movies = await getMovies();
  const movieList = movies.map(movie => {
    return moviesContainer.innerHTML += 
    `<h1>${movie.title}</h1>
    <p>${movie.scienceField}</p>`;
  });

  return movieList;
}