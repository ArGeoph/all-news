/**
 * Send user search request to News API
 * @param userInput
 */
const searchArticles = (userInput) => {
    getSearchResults(userInput).then( (articles) => {
        // Check if there's any articles to render
        if (articles.length > 0) {

            // Remove selection from all buttons
            $('.sourceButton').removeClass('jqfocus');
            renderNews(articles);
            addSocialNetworksFunctionality(articles);
        }
        else {
            // Render error message if search hasn't returned any results
            main.innerHTML = `<p class='error'>Your search hasn't returned any results. 
                Please try again later or check your Internet connection</p>`;
        }
    });

}; // End of searchArticles() method

/**
 * Get search results from news API
 * @param userInput
 * @returns {Promise<*>}
 */
const getSearchResults = async (userInput) => {
    try {
        // Clean the page and put spinner element
        main.innerHTML = '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';
        const searchNewsUrl = 'http://ec2-18-188-113-120.us-east-2.compute.amazonaws.com:8080/searchNews?sortBy=publishedAt&pageSize=50&q=';

        const request = await fetch(`${searchNewsUrl}${userInput}`);
        if (request.ok) {
            const requestJson = await request.json();

            return requestJson.articles;
        }
    }
    catch(networkError) {
        throw new Error("News cannot be loaded. Please check your Internet connection or try later");
    }
}; // End of getSearchResults() method

/**
 * Fetches News articles
 * @param url
 * @returns {Promise<*>}
 */
const getNews = async (url) => {
    try {
        //Send asynchronous request to server to get news search results
        const response = await fetch(url);

        if (response.ok) {
            const responseJson = await response.json();

            return responseJson.articles;
        }
    }
    catch(networkError) {
        throw new Error("News cannot be loaded. Please check your Internet connection or try later");
    }
}; // End of getNews() method
