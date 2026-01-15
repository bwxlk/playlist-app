console.log("playlist app loaded")



const playlistForm = document.getElementById("playlist-form");
const playlistNameInput = document.getElementById("playlist-name");
const playlistListE1 = document.getElementById("playlist-list");    



playlistForm.addEventListner("submit", (e) => {
    e.preventDefault();
    const name = playlistNameInput.vaslue.trim();
    console.log("creating playlist", name);
});