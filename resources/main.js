// Default news sources buttons
const bbc = document.getElementById('bbc');
const cbc = document.getElementById('cbc');
const cnn = document.getElementById('cnn');
const techcrunch = document.getElementById('techcrunch');

// Add new news sources related objects
const formObject = document.getElementById("sources");
const sourcesList = document.getElementById('newSources');

// Search related DOM objects
const userSearch = document.getElementById('search');
const searchButton = document.getElementById('searchButton');

const main = document.getElementsByTagName('main')[0];

// News API Data
const newsApiURL = 'https://newsapi.org/v2/top-headlines?sources=';
const topHeadlinesURL = 'https://newsapi.org/v2/top-headlines?country=ca&apiKey=';
const bbcURL = 'bbc-news';
const cbcURL = 'cbc-news';
const cnnURL = 'cnn';
const techcrunchURL = 'techcrunch';

// Callback function called when page is loaded for the first time
const initialize = () => {
  // Initialize news sources
  initializeNewsSources();

  // Add event listeners
  bbc.addEventListener('click', (event) => {
    // Check if user clicked news source different from the currently selected
    if (!event.currentTarget.classList.contains('jqfocus')) {
      $('.sourceButton').removeClass('jqfocus');
      $(event.currentTarget).addClass('jqfocus');
      addNewsSource(bbcURL);
    }
  }, false);
  cbc.addEventListener('click', (event) => {
    if (!event.currentTarget.classList.contains('jqfocus')) {  // Check if user clicked news source different from the currently selected
      $('.sourceButton').removeClass('jqfocus');
      $(event.currentTarget).addClass('jqfocus');
      addNewsSource(cbcURL);
    }
  }, false);
  cnn.addEventListener('click', (event) => {
    if (!event.currentTarget.classList.contains('jqfocus')) { // Check if user clicked news source different from the currently selected
      $('.sourceButton').removeClass('jqfocus');
      $(event.currentTarget).addClass('jqfocus');
      addNewsSource(cnnURL);
    }
  }, false);
  techcrunch.addEventListener('click', (event) => {
    if (!event.currentTarget.classList.contains('jqfocus')) { // Check if user clicked news source different from the currently selected
      $('.sourceButton').removeClass('jqfocus');
      $(event.currentTarget).addClass('jqfocus');
      addNewsSource(techcrunchURL);
    }
  }, false);
  formObject.addEventListener('submit', (event) => {
    event.preventDefault();
    searchArticles(userSearch.value);}, false);
  sourcesList.addEventListener('change', (event) => {
    $('.sourceButton').removeClass('jqfocus');
    addNewsSource(event.currentTarget.value);} , false);

  // Load default news when page is loaded by the first time, and select the corresponding menu button
  addNewsSource(bbcURL);
  $('#bbc').toggleClass('jqfocus');
};

// Function initializing map containing news sources and their urls, and adding them to html list
const initializeNewsSources = () => {

  // Create and fill up dropdownlist with categories
  newsCategories.forEach(category => {
    let categoryObject = document.createElement('optgroup');
    categoryObject.setAttribute('label', category);

    // Iterate through all news sources and populate news categories with corresponding news sources
    sourcesMap.forEach((key, value) => {

      if (key.category === category) {
        let newNewsSource = document.createElement("option");
        newNewsSource.setAttribute("value", key.url);
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
};

// News callback function used to load and render news from the url passed as a parameter
const addNewsSource = (sourceUrl) => {
  if (sourceUrl != "") {
    // Add spinner html code
    main.innerHTML = '<div class="lds-grid"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>';

    getNews(sourceUrl).then(articlesArray => renderNews(articlesArray)).
    then(articles => addSocialNetworksFunctionality(articles)).catch((error) => {
      main.innerHTML = `<p class="error">${error.message}</p>`;
    });
  }
};

// Method sending user seach request to News API
const searchArticles = (userInput) => {
  if (userInput === "") {
    return;
  }
  else {
    getSearchResults(userInput).then( (articles) => {
      // Check if there's any articles to display
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
};

// Request search results from news API
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
};

// Request News Function
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
};

// Render News Function
function renderNews(articles) {
  main.innerHTML = "";
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
}

// Add some functionality to social network buttons
function addSocialNetworksFunctionality(newsObjects) {

  let tweetButtons = document.getElementsByClassName('twitter');
  let facebookButtons = document.getElementsByClassName('facebook');
  let googleButtons = document.getElementsByClassName('google');
  let linkedInButtons = document.getElementsByClassName('linkedin');
  let commentsButtons = document.getElementsByClassName('comments');

  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      tweetButtons[i].classList.add("rotate");
      tweetButtons[i].classList.add("clicked");
      tweetButtons[i].disabled = true;
    }, false);

    // Add event listeners to facebook buttons
    facebookButtons[i].addEventListener('click', function() {
      facebookButtons[i].classList.add("rotate");
      facebookButtons[i].classList.add("clicked");
      facebookButtons[i].disabled = true;
    }, false);

    // Add event listeners to google buttons
    googleButtons[i].addEventListener('click', function() {
      googleButtons[i].classList.add("rotate");
      googleButtons[i].classList.add("clicked");
      googleButtons[i].disabled = true;

    }, false);

    // Add event listeners to linkedIn buttons
    linkedInButtons[i].addEventListener('click', function() {
      linkedInButtons[i].classList.add("rotate");
      linkedInButtons[i].disabled = true;
    }, false);
  }
}

// Eventlistener to add some actions when page is loaded for the first time
window.addEventListener("load", initialize, false);
// End of file
