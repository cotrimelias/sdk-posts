require('dotenv').config();

class SDKApi {
    constructor() {
        this.baseUrl = process.env.API_MAIN_URL;
    }

    // Get all posts
    async getPosts() {
        try {
            const response = await fetch(this.baseUrl + '/posts');
            if (!response.ok) {
                throw new Error('Failed to fetch.');
            }

            // Return post collection
            const posts = response.json();
            return posts;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

module.exports = SDKApi;