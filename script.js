// script.js

const API_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_QlYbacOMfszzi2SUOeQas3cBfUzQMa1mYEbxVm6n30Amf8ZaraCXxmwZFZosW2MN';

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');
const likesCount = document.getElementById('likes-count');
const mostLikedImage = document.getElementById('most-liked-image');

let page = 1;
let likedImages = {};

async function fetchCatImages(page) {
    try {
        const response = await fetch(`${API_URL}?page=${page}&limit=10&mime_types=jpg,png,gif`, {
            headers: {
                'x-api-key': API_KEY
            }
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching cat images:', error);
    }
}

//as the Cat API can't be modified, I tried to simulate how to use the POST request
async function sendFakePostRequest(imageId) {
    try {
        // Simulate a fake POST request to a fake endpoint
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imageId: imageId, // Include the ID of the liked image
                userId: 1 // Assuming user ID
            })
        });
        const data = await response.json();
        console.log('Fake POST request response:', data);
    } catch (error) {
        console.error('Error sending fake POST request:', error);
    }
}


function handleLike(imageId) {
    if (!likedImages[imageId]) {
        likedImages[imageId] = 1;
    } else {
        likedImages[imageId]++;
    }
    updateLikesCount();
    updateMostLikedImage();
    sendFakePostRequest(imageId); // Send fake POST request when image is liked
}

function updateLikesCount() {
    const totalLikes = Object.values(likedImages).reduce((acc, cur) => acc + cur, 0);
    likesCount.textContent = `Total Likes: ${totalLikes}`;
}

function updateMostLikedImage() {
    const mostLiked = Object.keys(likedImages).reduce((a, b) => likedImages[a] > likedImages[b] ? a : b);
    const mostLikedUrl = document.querySelector(`[data-id="${mostLiked}"]`).src;
    mostLikedImage.src = mostLikedUrl;
}

async function displayCatImages() {
    const catImages = await fetchCatImages(page);
    catImages.forEach(cat => {
        const img = document.createElement('img');
        img.src = cat.url;
        img.setAttribute('data-id', cat.id); // Set data-id attribute for tracking likes

        const likeBtn = document.createElement('button');
        likeBtn.textContent = '❤️';
        likeBtn.classList.add('like-btn');
        likeBtn.addEventListener('click', () => handleLike(cat.id));

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');
        imgContainer.appendChild(img);
        imgContainer.appendChild(likeBtn);
        gallery.appendChild(imgContainer);
    });
}

loadMoreBtn.addEventListener('click', async () => {
    page++;
    await displayCatImages();
});

// Initial load
displayCatImages();
