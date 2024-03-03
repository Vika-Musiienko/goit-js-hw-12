import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchData } from "./js/pixabay-api.js";
import { renderMurcup } from "./js/render-functions.js";

const lightbox = new SimpleLightbox(".gallery-link", {
    captionsData: "alt",
    captionDelay: 250,
});

const form = document.querySelector("#searchForm");
const container = document.querySelector(".gallery");
const loader = document.querySelector('.loader');
const loadMoreBtn = document.getElementById('loadMoreBtn');
let searchQuery = "";
let currentPage = 1;
const perPage = 15;

form.addEventListener("submit", onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function onSubmit(event) {
    event.preventDefault();
    container.innerHTML = "";
    currentPage = 1;
    searchQuery = form.elements.searchQuery.value.trim();
    fetchAndRenderImages();
}

async function onLoadMore() {
    currentPage++;
    fetchAndRenderImages();
}


function renderImageGallery(images) {
    const murcup = renderMurcup(images);
    container.insertAdjacentHTML('beforeend', murcup);
    hideLoader();
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showLoadMoreButton() {
    loadMoreBtn.style.display = 'block';
}

function hideLoadMoreButton() {
    loadMoreBtn.style.display = 'none';
}


async function fetchAndRenderImages() {
    try {
        showLoader();
        const data = await fetchData(searchQuery, currentPage, perPage);
        const images = data.hits;
        const totalHits = data.totalHits || 0;

        if (images.length === 0) {
            showNoImagesMessage();
        } else {
            renderImageGallery(images);
            if (currentPage * perPage >= totalHits) {
                hideLoadMoreButton();
                showEndOfSearchMessage();
            } else {
                showLoadMoreButton();
                smoothScroll();
                lightbox.refresh();
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        hideLoader();
    }
}
function showEndOfSearchMessage() {
    iziToast.info({
        fontSize: 'large',
        close: false,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        backgroundColor: 'gray',
        message: "We're sorry, but you've reached the end of search results.",
    });
}
function smoothScroll() {
    window.scrollBy({
        top: container.getBoundingClientRect().height * 2,
        behavior: 'smooth'
    });
}