# spoty-clone


# 🎵 Proyecto tipo Spotify - Documentación Técnica

## 🧱 Estructura General del Proyecto

### Frontend: React + Vite

#### 🔧 Tecnologías:
- **React** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **React Router**
- **Axios**
- **Context API** o **Zustand**
- **Chart.js / Recharts** (para estadísticas)

#### 🧠 Funcionalidades:
- 🔐 Inicio de sesión con Spotify
- 🧾 Perfil del usuario (nombre, avatar, email)
- 🎵 Listas de reproducción del usuario
- ❤️ Canciones guardadas
- 👨‍🎤 Top artistas más escuchados
- 📊 Top canciones más escuchadas
- 💿 Detalles de artistas o canciones (opcional)
- 🔊 Intento de reproducción con validación de cuenta Premium
- 🚫 Modal para usuarios no Premium al intentar reproducir

---

### Backend: Node.js + Express

#### 🔧 Tecnologías:
- **Node.js + Express**
- **Axios**
- **dotenv**
- **cookie-parser**
- **cors**
- **helmet** (opcional)

#### 📦 Funcionalidades:
- 🔐 Login con Spotify (OAuth 2.0 Authorization Code Flow)
- 🔄 Intercambio de código por tokens
- 🍪 Guardado de tokens en cookies seguras
- ♻️ Renovación automática de tokens
- 📡 Endpoints:
  - `GET /api/me`
  - `GET /api/playlists`
  - `GET /api/liked-tracks`
  - `GET /api/top-artists`
  - `GET /api/top-tracks`
  - `POST /api/play` → Intento de reproducción (solo Premium)
- ⚠️ Validación de cuenta Premium

- ---

## 🔐 Scopes de Spotify

Los **scopes** son permisos que definen qué puede hacer tu app con la cuenta del usuario.

| Scope                        | Descripción                                                 |
|-----------------------------|-------------------------------------------------------------|
| `user-read-email`           | Ver el email del usuario.                                   |
| `user-read-private`         | Ver información privada del perfil.                         |
| `playlist-read-private`     | Ver playlists privadas del usuario.                         |
| `user-library-read`         | Ver canciones guardadas.                                    |
| `user-top-read`             | Ver artistas y canciones más escuchadas.                    |
| `user-read-playback-state`  | Ver el estado actual de reproducción.                       |
| `user-modify-playback-state`| Controlar la reproducción (solo usuarios Premium).          |

### 📎 URL de autorización ejemplo

```url
https://accounts.spotify.com/authorize?
  client_id=TU_CLIENT_ID
  &response_type=code
  &redirect_uri=TU_REDIRECT_URI
  &scope=user-read-email%20user-read-private%20playlist-read-private%20user-library-read%20user-top-read%20user-read-playback-state%20user-modify-playback-state


