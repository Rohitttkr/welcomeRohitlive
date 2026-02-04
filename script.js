// DOM Elements
const songInput = document.getElementById('songInput');
const searchBtn = document.getElementById('searchBtn');
const loader = document.getElementById('loader');
const songCard = document.getElementById('songCard');
const errorMessage = document.getElementById('errorMessage');

// Data Elements
const songThumb = document.getElementById('songThumb');
const songTitle = document.getElementById('songTitle');
const audioPlayer = document.getElementById('audioPlayer');

const API_ENDPOINT = "http://127.0.0.1:8000/api/search/"; // Change this to your live URL later

searchBtn.addEventListener('click', async () => {
    const songName = songInput.value.trim();

    if (!songName) {
        showError("Bhai, song ka naam toh likho!");
        return;
    }

    // UI Reset
    showError(""); // Clear previous errors
    songCard.classList.add('hidden');
    loader.classList.remove('hidden');
    searchBtn.disabled = true;

    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ song_name: songName })
        });

        const result = await response.json();

        if (response.ok) {
            // Success: Populate Data
            songTitle.innerText = result.title;
            songThumb.src = result.thumbnail;
            audioPlayer.src = result.url;
            
            // Show Card
            songCard.classList.remove('hidden');
        } else {
            // API Error (e.g., 404 or 500)
            showError(result.error || "Song nahi mila. Kuch aur try karo?");
        }
    } catch (error) {
        // Network Error
        showError("Backend server band hai shayad. Please check karein.");
        console.error("Fetch Error:", error);
    } finally {
        // Hide Loader
        loader.classList.add('hidden');
        searchBtn.disabled = false;
    }
});

function showError(msg) {
    if (msg) {
        errorMessage.innerText = msg;
        errorMessage.classList.remove('hidden');
    } else {
        errorMessage.classList.add('hidden');
    }
}
