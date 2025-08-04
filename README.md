# 🎬 Outdoor Cinema - Cine de Verano 🌞🩱

Bienvenida al proyecto **Outdoor Cinema**, una aplicación web donde podrás disfrutar de un cine de verano con dos ciclos temáticos especiales:

🦈 **Ciclo de Tiburones**  
📚 **Ciclo de Literatura**

Este proyecto es una excelente oportunidad para practicar JavaScript, consumir APIs simuladas y dominar el flujo completo de operaciones CRUD.

---

## 📚 ¿Qué aprenderás?

- Leer, crear, editar y eliminar datos dinámicamente (CRUD)
- Usar `fetch` en JavaScript para consumir una API
- Trabajar con HTML, CSS y JavaScript
- Simular un backend usando `json-server`
- Organizar y estructurar un proyecto frontend desde cero

---

## 📁 Estructura del proyecto

```
OUTDOOR-CINEMA/
├── server/
│   └── db.json
├── src/
│   ├── service.js
│   └── styles.css
├── index.html
├── .gitignore
├── package.json
├── package-lock.json
└── README.md
```
🚀 Instalación y ejecución

1. Clona el repositorio
   
```
git clone https://github.com/Pal-cloud/outdoor-cinema
cd OUTDOOR-CINEMA

```
2. Instala las dependencias del proyecto
   
```
npm install
```
3. Agrega el script en package.json

```
"scripts": {
  "api": "json-server --watch server/db.json"
}
```

4. Inicia el servidor simulado

```
npm run api

```
Esto levantará la API en:

```
http://localhost:3000/movies

```
🔌 Consumo de la API
Desde src/service.js se manejan todas las operaciones a la API usando fetch.
La URL base utilizada es:

```
http://localhost:3000/movies

```

Operaciones disponibles:

GET → Obtener todas las películas

POST → Crear una nueva película

PATCH / PUT → Actualizar una película existente

DELETE → Eliminar una película

🤝 Contribuciones

¿Quieres colaborar con el proyecto?

Puedes: Sugerir nuevas películas o ciclos temáticos, mejorar el diseño visual con CSS, refactorizar el código JavaScript, agregar más funcionalidades o modularidad. ¿Cómo?

1. Haz un fork del repositorio

2. Crea una rama con tu funcionalidad:

```
git checkout -b mejora-nueva

```

3. Haz tus cambios y haz commit:

```
git commit -m "Agrega nueva funcionalidad"

```

4. Sube tus cambios:

```
git push origin mejora-nueva

```

5. Abre un Pull Request


🧠 Autoría y créditos

Proyecto desarrollado como práctica de desarrollo frontend para simular una API y aprender a consumirla desde el navegador junto a [Aday25](https://github.com/Aday25)


Gracias por formar parte del cine de verano. 🌅

🎬 ¡Que empiece la función! 🍿


