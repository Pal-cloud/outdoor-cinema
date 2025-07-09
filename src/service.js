const API_URL = 'http://localhost:3000/movies';
const BAD_WORDS = ["idiota", "imbécil", "estúpido", "mierda", "puta", "gilipollas"];

// 📦 API Functions
async function getMovies() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function updateMovie(id, data) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.ok;
}

async function createMovie(movie) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie)
  });
  return await res.json();
}

function containsBadWords(comment) {
  return BAD_WORDS.some(word => comment.toLowerCase().includes(word));
}

// 🎞️ UI Elements
const moviesContainer = document.querySelector("#cycle-movies");
const introSection = document.querySelector("#intro-section");

// 🧱 Create each card
function createMovieCard(movie) {
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
    <div class="likes">
      <span class="like-btn">👍 <span class="like-count">${movie.likes || 0}</span></span>
      <span class="dislike-btn">👎 <span class="dislike-count">${movie.dislikes || 0}</span></span>
      <span class="love-btn">❤️ <span class="love-count">${movie.hearts || 0}</span></span>
    </div>
    <input type="text" placeholder="Agrega un comentario..." class="comment-input">
    <button class="comment-btn">Comentar</button>
    <ul class="comment-list"></ul>
  `;

  // 🧡 Likes
  const likeCount = card.querySelector(".like-count");
  const dislikeCount = card.querySelector(".dislike-count");
  const loveCount = card.querySelector(".love-count");

  card.querySelector(".like-btn").addEventListener("click", async () => {
    movie.likes = (movie.likes || 0) + 1;
    await updateMovie(movie.id, { likes: movie.likes });
    likeCount.textContent = movie.likes;
  });

  card.querySelector(".dislike-btn").addEventListener("click", async () => {
    movie.dislikes = (movie.dislikes || 0) + 1;
    await updateMovie(movie.id, { dislikes: movie.dislikes });
    dislikeCount.textContent = movie.dislikes;
  });

  card.querySelector(".love-btn").addEventListener("click", async () => {
    movie.hearts = (movie.hearts || 0) + 1;
    await updateMovie(movie.id, { hearts: movie.hearts });
    loveCount.textContent = movie.hearts;
  });

  // 💬 Comentarios
  const input = card.querySelector(".comment-input");
  const btn = card.querySelector(".comment-btn");
  const list = card.querySelector(".comment-list");

  const renderComments = () => {
    list.innerHTML = "";
    (movie.comments || []).forEach(c => {
      const li = document.createElement("li");
      li.textContent = c;
      list.appendChild(li);
    });
  };

  btn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) return;
    if (containsBadWords(text)) return alert("Comentario inapropiado");

    movie.comments = movie.comments || [];
    movie.comments.push(text);
    await updateMovie(movie.id, { comments: movie.comments });
    renderComments();
    input.value = "";
  });

  renderComments();

  return card;
}

// 🎯 Ciclos con introducción
const cycleIntros = {
  sharks: "🦈 Bienvenido al ciclo de Tiburones: explora la ciencia y el suspense de las criaturas marinas más temidas.",
  literature: "📚 Bienvenido al ciclo de Literatura Científica: películas inspiradas en los grandes clásicos de la ciencia.",
  suggestion: "🎥 Películas sugeridas por la comunidad para futuros ciclos. ¡Gracias por participar!"
};

// 🚀 Mostrar películas por ciclo
async function renderMoviesByCycle(cycle) {
  const all = await getMovies();
  const filtered = all.filter(m => m.cycle === cycle);

  // Intro
  introSection.innerHTML = `
    <h2>${cycleIntros[cycle]}</h2>
  `;

  // Cards
  moviesContainer.innerHTML = "";
  filtered.forEach(m => moviesContainer.appendChild(createMovieCard(m)));
}

// 📩 Sugerencias
async function handleSuggestionSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const title = form.title.value.trim();
  if (!title) return;

  const movie = {
    title,
    year: "",
    gender: "Sugerencia",
    scienceField: "",
    director: "",
    actors: "",
    movie_description: form.reason.value,
    video_url: "",
    comments: [],
    likes: 0,
    dislikes: 0,
    hearts: 0,
    cycle: "suggestion"
  };
  await createMovie(movie);
  form.reset();
  alert("¡Gracias por tu sugerencia!");
  renderMoviesByCycle("suggestion");
}

// 🧠 Eventos
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#btn-sharks").addEventListener("click", () => renderMoviesByCycle("sharks"));
  document.querySelector("#btn-literature").addEventListener("click", () => renderMoviesByCycle("literature"));
  document.querySelector("#suggestion-form").addEventListener("submit", handleSuggestionSubmit);

  // Mostrar sugerencias al cargar
  renderMoviesByCycle("sharks");
});

//para ver sugerencias ya grabadas
document.querySelector("#btn-suggestions").addEventListener("click", () => renderMoviesByCycle("suggestion"));