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
      if (userSearch.value !== '') {
        searchArticles(userSearch.value);
      }
    }, false);
  sourcesList.addEventListener('change', (event) => {
      $('.sourceButton').removeClass('jqfocus');
      addNewsSource(`${event.currentTarget.value}&pageSize=90`);
    } , false);

  // Load default news when page is loaded by the first time, and select the corresponding menu button
  addNewsSource(`&country=ca`);
}; // End of initialize() method

/**
 * Adds click event listener to the dom object passed as a parameter
 * @param newsButton
 * @param newsURL
 */
const addEventListenerToNewsButton = (newsButton, newsSource) => {
  newsButton.addEventListener('click', (event) => {
    // Check if user clicked news source different from the currently selected
    if (!event.currentTarget.classList.contains('jqfocus')) {
      $('.sourceButton').removeClass('jqfocus');
      $(event.currentTarget).addClass('jqfocus');
      addNewsSource(`${newsSource}&pageSize=90`);
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
    // Show spinner
    main.innerHTML = '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

    // Fetch news
    getNews(sourceUrl)
        .then(articlesArray => renderNews(articlesArray))
        .then(articles => addSocialNetworksFunctionality(articles))
        .catch((error) => {
          main.innerHTML = `<p class="error">${error.message}</p>`;
    });
  }
}; // End of addNewsSource() method

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
        '   <div class="imageContainer"><img class="storyimage" loading="lazy" src="' + article.urlToImage + '" alt="' + article.description + '" /></div>' +
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
