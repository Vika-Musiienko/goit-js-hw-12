import axios from 'axios';

const API_KEY = '42576318-0e1c04293cd098153cdda1833';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchData(searchQuery, page, perPage = 15) { // Додавання perPage як параметру за замовчуванням
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                key: API_KEY,
                q: searchQuery,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: perPage,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}