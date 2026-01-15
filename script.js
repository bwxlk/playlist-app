// Just to confirm file is loaded
console.log("playlist app loaded");

// ===== State =====
let playlists = [];
let selectedPlaylistId = null;

// ===== Grab DOM elements =====
const playlistForm = document.getElementById("playlist-form");
const playlistNameInput = document.getElementById("playlist-name");
const playlistListEl = document.getElementById("playlist-list");

// We'll use these later when we show details & songs
const playlistTitleEl = document.getElementById("playlist-title");
const playlistDescEl = document.getElementById("playlist-desc");
const playlistDescInput = document.getElementById("playlist-description");
const songForm = document.getElementById("song-form");
const songTitleInput = document.getElementById("song-title");
const songArtistInput = document.getElementById("song-artist");
const songLinkInput = document.getElementById("song-link");
const songListEl = document.getElementById("song-list");

// ===== Event: create playlist =====
playlistForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = playlistNameInput.value.trim();
  const description = playlistDescInput.value.trim();

  if (!name) {
    console.log("No name entered, skipping");
    return;
  }

  const newPlaylist = {
    id: Date.now().toString(),
    name: name,
    description: description,
    songs: []
  };

  playlists.push(newPlaylist);
  selectedPlaylistId = newPlaylist.id;

  // Clear form
  playlistNameInput.value = "";
  playlistDescInput.value = "";

  console.log("Playlists after add:", playlists);

  renderPlaylists();
  renderSelectedPlaylist();
});

// ===== Event: add song to selected playlist =====
songForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!selectedPlaylistId) {
    alert("Select a playlist first.");
    return;
  }

  const title = songTitleInput.value.trim();
  const artist = songArtistInput.value.trim();
  const link = songLinkInput.value.trim();

  if (!title || !artist) {
    alert("Song needs a title and artist.");
    return;
  }

  const playlist = playlists.find((p) => p.id === selectedPlaylistId);
  if (!playlist) return;

  const newSong = { title, artist, link };
  playlist.songs.push(newSong);

  // Clear song form
  songTitleInput.value = "";
  songArtistInput.value = "";
  songLinkInput.value = "";

  renderSelectedPlaylist();
});

// ===== Render playlists (left side) =====
function renderPlaylists() {
  console.log("renderPlaylists called");
  playlistListEl.innerHTML = "";

  if (playlists.length === 0) {
    const emptyMsg = document.createElement("li");
    emptyMsg.textContent = "No playlists yet. Add one ✨";
    playlistListEl.appendChild(emptyMsg);
    return;
  }

 playlists.forEach((playlist) => {
  const li = document.createElement("li");

  // name span
  const nameSpan = document.createElement("span");
  nameSpan.textContent = playlist.name;
  li.appendChild(nameSpan);

  if (playlist.id === selectedPlaylistId) {
    li.classList.add("active");
  }

  // click on the name selects playlist
  nameSpan.addEventListener("click", () => {
    selectedPlaylistId = playlist.id;
    renderPlaylists();
    renderSelectedPlaylist();
  });

  // delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "x";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // don’t trigger the select click

    // remove this playlist from the array
    playlists = playlists.filter((p) => p.id !== playlist.id);

    // if we deleted the selected one, clear selection
    if (selectedPlaylistId === playlist.id) {
      selectedPlaylistId = playlists[0]?.id || null;
    }

    renderPlaylists();
    renderSelectedPlaylist();
  });

  li.appendChild(deleteBtn);

  playlistListEl.appendChild(li);
});
 


// ===== Render selected playlist (right side) =====
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
      const a = document.createElement("a");
      a.href = song.link;
      a.target = "_blank";
      a.textContent = text;
      li.appendChild(a);
    } else {
      li.textContent = text;
    }

    songListEl.appendChild(li);
  });
}

// ===== Initial render =====
renderPlaylists();
renderSelectedPlaylist();
