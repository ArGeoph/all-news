// Default news sources buttons
const bbc = document.getElementById('bbc');
const cbc = document.getElementById('cbc');
const cnn = document.getElementById('cnn');
const techCrunch = document.getElementById('techCrunch');

// Add new news sources related objects
const formObject = document.getElementById('sources');
const sourcesList = document.getElementById('newSources');

// Search related DOM objects
const userSearch = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const main = document.getElementsByTagName('main')[0];

// News API Data
const newsApiURL = 'https://newsapi.org/v2/top-headlines?sources=';
const topHeadlinesURL = 'https://newsapi.org/v2/top-headlines?country=ca';
const bbcURL = 'bbc-news';
const cbcURL = 'cbc-news';
const cnnURL = 'cnn';
const techCrunchURL = 'techcrunch';

/**
 * Callback function called when page is loaded for the first time
 */
const initialize = () => {
  // Initialize news sources
  initializeNewsSources();

  // Add event listeners to the top menu buttons
  addEventListenerToNewsButton(bbc, bbcURL);
  addEventListenerToNewsButton(cbc, cbcURL);
  addEventListenerToNewsButton(cnn, cnnURL);
  addEventListenerToNewsButton(techCrunch, techCrunchURL);

  // Add event listeners to the search field and news sources dropdown list
  formObject.addEventListener('submit', (event) => {
      event.preventDefault();
      searchArticles(userSearch.value);
    }, false);
  sourcesList.addEventListener('change', (event) => {
      $('.sourceButton').removeClass('jqfocus');
      addNewsSource(event.currentTarget.value);
    } , false);

  // Load default news when page is loaded by the first time, and select the corresponding menu button
  addNewsSource(cbcURL);
  $('#cbc').toggleClass('jqfocus');
}; // End of initialize() method

/**
 * Adds click event listener to the dom object passed as a parameter
 * @param newsButton
 * @param newsURL
 */
const addEventListenerToNewsButton = (newsButton, newsURL) => {
  newsButton.addEventListener('click', (event) => {
    // Check if user clicked news source different from the currently selected
    if (!event.currentTarget.classList.contains('jqfocus')) {
      $('.sourceButton').removeClass('jqfocus');
      $(event.currentTarget).addClass('jqfocus');
      addNewsSource(newsURL);
    }
  }, false);
}; // End of addEventListenerToNewsButton() method

/**
 * Initializes map containing news sources and their urls, and adding them to html list
 */
const initializeNewsSources = () => {

  // Create and fill up dropdown list with categories
  newsCategories.forEach(category => {
    const categoryObject = document.createElement('optgroup');
    categoryObject.setAttribute('label', category);

    // Iterate through all news sources and populate news categories with corresponding news sources
    sourcesMap.forEach((key, value) => {

      if (key.category === category) {
        let newNewsSource = document.createElement('option');
        newNewsSource.setAttribute('value', key.url);
        newNewsSource.innerHTML = value;

        if (category === '') {
          sourcesList.appendChild(newNewsSource);
        }
        else {
          categoryObject.appendChild(newNewsSource);
        }
      }
    });

    // Append category to select HTML object
    if (category !== '') {
      sourcesList.appendChild(categoryObject);
    }
  });
}; // End of initializeNewsSources() method

/**
 * News callback function used to load and render news from the url passed as a parameter
 * @param sourceUrl
 */
const addNewsSource = (sourceUrl) => {
  if (sourceUrl !== '') {
    // Add spinner
    main.innerHTML = '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

    getNews(sourceUrl)
        .then(articlesArray => renderNews(articlesArray))
        .then(articles => addSocialNetworksFunctionality(articles))
        .catch((error) => {
          main.innerHTML = `<p class="error">${error.message}</p>`;
    });
  }
}; // End of addNewsSource() method

/**
 * Send user search request to News API
 * @param userInput
 */
const searchArticles = (userInput) => {
  if (userInput === '') {
    return null;
  }
  else {
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
  }
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

    const request = await fetch(`https://newsapi.org/v2/everything?sortBy=publishedAt&q=${userInput}${apiKey}&pageSize=50`);
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
 * Request News Function
 * @param url
 * @returns {Promise<*>}
 */
const getNews = async (url) => {
    try {
        //Send asynchronous request to server to get news search results
        const response = await fetch(newsApiURL + url + apiKey + "&pageSize=90");

        if (response.ok) {
          const responseJson = await response.json();

          return responseJson.articles;
        }
    }
    catch(networkError) {
       throw new Error("News cannot be loaded. Please check your Internet connection or try later");
    }
}; // End of getNews() method


/**
 * Render News Function
 * @param articles
 * @returns {*}
 */
const renderNews = (articles) => {
  // Clear the currently rendered content if there's any
  main.innerHTML = '';

  // Create new HTML for new content
  articles.map((article, index) => {
    if (index > 0 && article.description != null) {
        let articleRow =
        '<div class="articlerow">' +
        ' <div class="article">' +
        '   <div><h2 class="title">' + article.title + '</h2>' +
        '   <h3>By ' + ((article.author !=null) ? article.author : "John Doe")    + ' on ' + new Date(article.publishedAt).toLocaleString() + '</h3>' +
        '   <p class="content"> ' + ((article.content != null) && (sourcesException.indexOf(article.source.id) === -1)
            ? (article.content.split("[")[0]) : article.description) + '</p>' +
        '   <a href="' + article.url + '" target="_blank noopenner norefferer" class="readmore">Read More</a></div>' +
        '   <div class="imageContainer"><img class="storyimage" src="' + article.urlToImage + '" alt="`${article.description}`" /></div>' +
        ' </div>' +
        ' <div class="share">' +
        '   <div class="share-buttons"><button type="button" class="twitter fa fa-twitter" id="tweet ' + index + '" aria-label="twitter button"">' +
        '   </button>' +
        '   <button type="button" class="facebook fa fa-facebook " id="facebook ' + index + '" aria-label="facebook button"">' +
        '   </button>' +
        '   <button type="button" class="google fa fa-google" id="google ' + index + '" aria-label="google button"">' +
        '   </button>' +
        '   <button type="button" class="linkedin fa fa-linkedin" id="linkedin ' + index + '" aria-label="google button"">' +
        '   </button>' +
        '   <button type="button" class="comments fa fa-comments" id="comments ' + index + '" aria-label="google button"">' +
        '   </button>' +
        ' </div>' +
        '</div>';

      main.innerHTML += articleRow;
    }
  });

  return articles;
}; // End of renderNews() method

/**
 * Add some functionality to social network buttons
 * @param newsObjects
 */
const addSocialNetworksFunctionality = (newsObjects) => {

  // Get the DOM objects for all social media buttons on the page
  let tweetButtons = document.getElementsByClassName('twitter');
  let facebookButtons = document.getElementsByClassName('facebook');
  let googleButtons = document.getElementsByClassName('google');
  let linkedInButtons = document.getElementsByClassName('linkedin');
  let commentsButtons = document.getElementsByClassName('comments');

  // Iterate through all social media dom objects and add event listeners to them
  for (let i = 0; i < tweetButtons.length; i++) {
    [tweetButtons[i], facebookButtons[i], googleButtons[i], googleButtons[i], linkedInButtons[i], commentsButtons[i]].map(
        (currentButton) => {
          currentButton.addEventListener('click', function () {
            currentButton.classList.add("rotate");
            currentButton.classList.add("clicked");
            // currentButton.disabled = true;
          }, false);
        }
    );
  }
}; // End of addSocialNetworksFunctionality() method

// Event listener to add some actions when page is loaded for the first time
window.addEventListener("load", initialize, false);
// End of file
