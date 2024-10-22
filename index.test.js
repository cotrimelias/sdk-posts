const SDKApi = require('./index.js');
global.fetch = jest.fn();

jest.mock('node-fetch');

describe('SDKApi', () => {
    let api = SDKApi;
    beforeEach(() => {
        api = new SDKApi;
        jest.clearAllMocks();
    });
    test('errors are handled', async () => {
        fetch.mockImplementation(() => Promise.reject(new Error('Failed to fetch.')));
        await expect(api.getPosts()).rejects.toThrow();
    });

    test('getPosts returns a list of posts', async () => {
        fetch.mockResolvedValue({
            ok: true,
            json: async () => [{
                "userId": 1,
                "id": 1,
                "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
            }]
        });
        const posts = await api.getPosts();

        expect(posts).toBeDefined();
        expect(Array.isArray(posts)).toBe(true);
    });
    test('list of posts is not empty', async () => {
        const posts = await api.getPosts();
        expect(posts.length).toBeGreaterThan(0);
    });

});