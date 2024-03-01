export function renderMurcup(images) {
    return images.map(image => `
        <div class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
            </a>
            <div class="gallery-image-info">
                <p class="image-info-item"><span class="image-items-text">Likes: </span>${image.likes}</p>
                <p class="image-info-item"><span class="image-items-text">Views: </span>${image.views}</p>
                <p class="image-info-item"><span class="image-items-text">Comments: </span>${image.comments}</p>
                <p class="image-info-item"><span class="image-items-text">Downloads: </span>${image.downloads}</p>
            </div>
        </div>
    `).join('');
}


 