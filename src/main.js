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
const perPage = 15; // Додавання perPage як константи

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

async function fetchAndRenderImages() {
    try {
        showLoader();
        const data = await fetchData(searchQuery, currentPage, perPage); // Додавання perPage як третього аргументу
        const images = data.hits;

        if (images.length === 0) {
            showNoImagesMessage();
        } else {
            renderImageGallery(images);
            showLoadMoreButton();
            smoothScroll();
            lightbox.refresh();
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        hideLoader();
    }
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

function showNoImagesMessage() {
    iziToast.error({
        fontSize: 'large',
        close: false,
        position: 'topRight',
        messageColor: 'white',
        timeout: 2000,
        backgroundColor: 'red',
        message: 'Sorry, there are no images matching your search query. Please try again!',
    });
}

function smoothScroll() {
    window.scrollBy({
        top: container.getBoundingClientRect().height * 2,
        behavior: 'smooth'
    });
}