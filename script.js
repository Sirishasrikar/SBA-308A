// script.js

import { fetchCatImages } from './fetchCatImages.js';
import { handleLike } from './handleLikes.js';
import { updateTopLikedImages } from './updateUI.js'; // Update import statement

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('load-more');

let page = 1;
let likedImages = {};

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
