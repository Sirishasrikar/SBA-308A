// updateUI.js

export function updateLikesCount(likedImages) {
    const totalLikes = Object.values(likedImages).reduce((acc, cur) => acc + cur, 0);
    document.getElementById('likes-count').textContent = `Total Likes: ${totalLikes}`;
}

export function updateTopLikedImages(likedImages) {
    // Sort the likedImages object by the number of likes in descending order
    const sortedLikedImages = Object.entries(likedImages).sort((a, b) => b[1] - a[1]);

    // Select the top 3 most liked images
    const topLikedImages = sortedLikedImages.slice(0, 3);

    // Clear the container before updating
    const topLikedContainer = document.getElementById('top-liked-container');
    topLikedContainer.innerHTML = '';

    // Update UI for each of the top 3 most liked images
    topLikedImages.forEach(([imageId, likes]) => {
        const img = document.createElement('img');
        img.src = document.querySelector(`[data-id="${imageId}"]`).src;

        const likesCount = document.createElement('div');
        likesCount.textContent = `Likes: ${likes}`;

        const imgContainer = document.createElement('div');
        imgContainer.classList.add('top-liked-img-container');
        imgContainer.appendChild(img);
        imgContainer.appendChild(likesCount);
        topLikedContainer.appendChild(imgContainer);
    });
}
