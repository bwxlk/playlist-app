console.log("playlist app loaded")
let playlists = [];
let selectedPlaylistId = null;



const playlistForm = document.getElementById("playlist-form");
const playlistNameInput = document.getElementById("playlist-name");
const playlistListE1 = document.getElementById("playlist-list");    



playlistForm.addEventListner("submit", (e) => {
    e.preventDefault();
    const name = playlistNameInput.value.trim();
    if (!name) return;

const newPlaylist = {
  id: Date.now().toString(),  // cheap unique id
  name: name,
  songs: []
};

playlists.push(newPlaylist);
selectedPlaylistId = newPlaylist.id;

// clear the input
playlistNameInput.value = "";

renderPlaylists();
;
});