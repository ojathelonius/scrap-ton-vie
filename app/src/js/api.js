import axios from 'axios';

const base_url = 'http://localhost:4000';

export function get(path) {
    try {
        return axios.get(base_url + path);
    } catch (error) {
        console.error(`Error fetching resource at ${path} : ${error}`);
    }
}