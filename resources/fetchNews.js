
// Urls used to fetch news or search results
const newsApiBaseUrl = 'https://allnewsapp.com';
const fetchNewsApiURL = '/getNews?sources=';
const searchNewsApiURL = '/searchNews?sortBy=publishedAt&pageSize=50&q=';

/**
 * Send user search request to News API
 * @param userInput
 */
const searchArticles = (userInput) => {
    getSearchResults(userInput)
        .then( (articles) => {
        // Check if there's any articles to render
        if (articles.length > 0) {

            // Remove selection from all buttons
            $('.sourceButton').removeClass('jqfocus');
            renderNews(articles);
            addSocialNetworksFunctionality(articles);
        }
        else {
            // Render error message if search hasn't returned any results
            main.innerHTML = `<p class='error'>Your search hasn't returned any results. Please try again later.</p>`;
        }
    }).catch((error) => {
        main.innerHTML = `<p class='error'>Something went wrong. Please try again later</p>`;
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

        const request = await fetch(`${newsApiBaseUrl}${searchNewsApiURL}${userInput}`);
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
const getNews = async (newsSource) => {
    try {
        //Send asynchronous request to server to get news search results
        const response = await fetch(`${newsApiBaseUrl}${fetchNewsApiURL}${newsSource}`);

        if (response.ok) {
            const responseJson = await response.json();

            return responseJson.articles;
        }
    }
    catch(networkError) {
        throw new Error("News cannot be loaded. Please check your Internet connection or try later");
    }
}; // End of getNews() method
