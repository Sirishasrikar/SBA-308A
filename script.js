// script.js

import { fetchCatImages } from './fetchCatImages.js';
import { handleLike } from './handleLikes.js';
import { updateTopLikedImages } from './updateUI.js'; // Update import statement

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let page = 1;
let likedImages = {};


async function sendFakePostRequest(imageId) {
    try {
        const response = await fetch('https://example.com/like', {
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


async function displayCatImages() {
    const catImages = await fetchCatImages(page);
    catImages.forEach(cat => {
        const img = document.createElement('img');
        img.src = cat.url;
        img.setAttribute('data-id', cat.id); // Set data-id attribute for tracking likes

        const likeBtn = document.createElement('button');
        likeBtn.textContent = '❤️';
        likeBtn.classList.add('like-btn');
        likeBtn.addEventListener('click', () => {
            const likeData = handleLike(cat.id);
            if (!likedImages[likeData.imageId]) {
                likedImages[likeData.imageId] = 1;
            } else {
                likedImages[likeData.imageId]++;
            }
            updateTopLikedImages(likedImages); // Update function call
        });

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
