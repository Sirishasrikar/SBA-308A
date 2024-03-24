// fetchCatImages.js

const API_URL = 'https://api.thecatapi.com/v1/images/search';
const API_KEY = 'live_QlYbacOMfszzi2SUOeQas3cBfUzQMa1mYEbxVm6n30Amf8ZaraCXxmwZFZosW2MN';

export async function fetchCatImages(page) {
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
