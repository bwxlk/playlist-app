// --- Data store in memory for now ---
let playlists = [];
let selectedPlaylistId = null;

// Utility: create a simple id
function generateId() {
  return Date.now().toString() + Math.random().toString(16).slice(2);
}

// --- DOM elements ---
const playlistForm = document.getElementById("playlist-form");
const playlistNameInput = document.getElementById("playlist-name");
const playlistDescInput = document.getElementById("playlist-description");

const playlistListEl = document.getElementById("playlist-list");

const playlistTitleEl = document.getElementById("playlist-title");
const playlistDescEl = document.getElementById("playlist-desc");

const songForm = document.getElementById("song-form");
const songTitleInput = document.getElementById("song-title");
const songArtistInput = document.getElementById("song-artist");
const songLinkInput = document.getElementById("song-link");
const songListEl = document.getElementById("song-list");

// --- Event listeners ---

// Handle new playlist form submit
playlistForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = playlistNameInput.value.trim();
  const description = playlistDescInput.value.trim();

  if (!name) {
    alert("Playlist needs a name, fam.");
    return;
  }

  const newPlaylist = {
    id: generateId(),
    name,
    description,
    songs: []
  };

  playlists.push(newPlaylist);

  // Clear form
  playlistNameInput.value = "";
  playlistDescInput.value = "";

  // Set the new one as selected
  selectedPlaylistId = newPlaylist.id;

  renderPlaylists();
  renderSelectedPlaylist();
});

// Handle new song form submit
songForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selectedPlaylistId) {
    alert("Select a playlist first before adding songs.");
    return;
  }

  const title = songTitleInput.value.trim();
  const artist = songArtistInput.value.trim();
  const link = songLinkInput.value.trim();

  if (!title || !artist) {
    alert("Song needs at least a title and an artist.");
    return;
  }

  const playlist = playlists.find((p) => p.id === selectedPlaylistId);
  if (!playlist) return;

  const newSong = { title, artist, link };

  playlist.songs.push(newSong);

  // Clear form
  songTitleInput.value = "";
  songArtistInput.value = "";
  songLinkInput.value = "";

  renderSelectedPlaylist();
});

// --- Render functions ---

function renderPlaylists() {
  playlistListEl.innerHTML = "";

  playlists.forEach((playlist) => {
    const li = document.createElement("li");
    li.textContent = playlist.name;

    if (playlist.id === selectedPlaylistId) {
      li.classList.add("active");
    }

    // When you click a playlist, set it as selected
    li.addEventListener("click", () => {
      selectedPlaylistId = playlist.id;
      renderPlaylists();
      renderSelectedPlaylist();
    });

    playlistListEl.appendChild(li);
  });

  // If there are no playlists
  if (playlists.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "No playlists yet. Make one above.";
    playlistListEl.appendChild(emptyMsg);
  }
}

function renderSelectedPlaylist() {
  const playlist = playlists.find((p) => p.id === selectedPlaylistId);

  songListEl.innerHTML = "";

  if (!playlist) {
    playlistTitleEl.textContent = "No playlist selected";
    playlistDescEl.textContent = "";
    return;
  }

  playlistTitleEl.textContent = playlist.name;
  playlistDescEl.textContent = playlist.description || "";

  if (playlist.songs.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No songs yet. Add one above.";
    songListEl.appendChild(li);
    return;
  }

  playlist.songs.forEach((song) => {
    const li = document.createElement("li");
    const text = `${song.title} — ${song.artist}`;

    if (song.link) {
      const linkEl = document.createElement("a");
      linkEl.href = song.link;
      linkEl.target = "_blank";
      linkEl.textContent = text;
      li.appendChild(linkEl);
    } else {
      li.textContent = text;
    }

    songListEl.appendChild(li);
  });
}

// Initial render on load
renderPlaylists();
renderSelectedPlaylist();
