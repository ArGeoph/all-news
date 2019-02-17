//Default news sources buttons
const bbc = document.getElementById('bbc');
const cbc = document.getElementById('cbc');
const cnn = document.getElementById('cnn');
const techcrunch = document.getElementById('techcrunch');
//Add new news sources related objects
const formObject = document.getElementById("sources");
const sourcesList = document.getElementById('newSources');
const sourcesMap = new Map();
const sourcesException = []; //variable used to track all news sources that don't contain proper content, but only description
//Search related HTML objects
const userSearch = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const searchStatus = document.getElementById('searchStatus');
const searchStatusCloseButton = document.getElementById('searchStatusClose');

const main = document.getElementsByTagName('main')[0];

// News API Data
const newsApiURL = 'https://newsapi.org/v2/top-headlines?sources=';
const bbcURL = 'bbc-news';
const cbcURL = 'cbc-news';
const cnnURL = 'cnn';
const techcrunchURL = 'techcrunch';

//Callback function called when page is loaded for the first time
const initialize = () => {
  //Initialize news sources
  initializeNewsSources();
  
  //Add news sources exception that need special handling (in this case proper rendering of cyrillic letters)
  sourcesException.push("rbc", "rt", "google-news-ru", "lenta");

  //Add event listeners
  bbc.addEventListener('click', (event) => { 
    $('.sourceButton').removeClass('jqfocus');
    $(event.currentTarget).addClass('jqfocus');
    addNewsSource(bbcURL);}, false);  
  cbc.addEventListener('click', (event) => { 
    $('.sourceButton').removeClass('jqfocus');
    $(event.currentTarget).addClass('jqfocus');
    addNewsSource(cbcURL);}, false);  
  cnn.addEventListener('click', (event) => { 
    $('.sourceButton').removeClass('jqfocus');
    $(event.currentTarget).addClass('jqfocus');
    addNewsSource(cnnURL);}, false); 
  techcrunch.addEventListener('click', (event) => { 
    $('.sourceButton').removeClass('jqfocus');
    $(event.currentTarget).addClass('jqfocus');
    addNewsSource(techcrunchURL);}, false);   
  formObject.addEventListener('submit', (event) => {
    event.preventDefault();
    searchArticles(userSearch.value);}, false);
  sourcesList.addEventListener('change', (event) => {
    $('.sourceButton').removeClass('jqfocus');
    addNewsSource(event.currentTarget.value);} , false);
  searchStatusCloseButton.addEventListener("click", () => {
    searchStatus.style.visibility = "hidden";
  })

  //Load default news when page is loaded by the first time, and select the corresponding menu button
  addNewsSource(bbcURL); 
  $('#bbc').toggleClass('jqfocus');
};

//Function initializing map containing news sources and their urls, and adding them to html list
const initializeNewsSources = () => {
  //Map used to store urls for new news sources
  sourcesMap.set("Select news", "");
  sourcesMap.set("AlJazeera", "al-jazeera-english");
  sourcesMap.set("Google News Canada", "google-news-ca");
  sourcesMap.set("Google News Russia", "google-news-ru");
  sourcesMap.set("New Scientist", "new-scientist");
  sourcesMap.set("National Geographic", "national-geographic");
  sourcesMap.set("RBC", "rbc");
  sourcesMap.set("The Telegraph", "the-telegraph");
  sourcesMap.set("The Guardian", "the-guardian-uk");
  sourcesMap.set("The Washington Post", "the-washington-post");
  sourcesMap.set("Russia Today", "rt");
  sourcesMap.set("Wired", "wired");
  sourcesMap.set("The Huffington Post", "wired");
  sourcesMap.set("BBC Sport", "bbc-sport");
  sourcesMap.set("Next web", "the-next-web");
  sourcesMap.set("Recode", "recode");
  sourcesMap.set("Crypto News", "crypto-coins-news")
  sourcesMap.set("Hacker News", "hackerNews");
  sourcesMap.set("Buzzfeed", "buzzfeed");
  sourcesMap.set("Time", "time");
  sourcesMap.set("Financial Times", "financial-times");
  sourcesMap.set("Fox News", "fox-news");
  sourcesMap.set("Independent", "independent");
  sourcesMap.set("Lenta", "lenta");
  sourcesMap.set("Reddit /r/all", "reddit-r-all");
  sourcesMap.set("The Economist", "the-economist");
  sourcesMap.set("USA Today", "usa-today");
  sourcesMap.set("Ars Technica", "ars-technica");
  sourcesMap.set("Entertainment Weekly", "entertainment-weekly");
  sourcesMap.set("Business Insider (UK)", "business-insider-uk");
  sourcesMap.set("TechBusiness Insider", "business-insider");

  sourcesMap.forEach((key, value) => {
    
    let newNewsSource = document.createElement("option");
    newNewsSource.setAttribute("value", key);
    newNewsSource.innerHTML = value;
    sourcesList.appendChild(newNewsSource); 
  });
};

//News callback function used to load and render news from the url 
const addNewsSource = (sourceUrl) => {

  if (sourceUrl != "") {
    main.innerHTML = "";

    getNews(sourceUrl).then(articlesArray => renderNews(articlesArray)).
    then(articles => sendTweets(articles)).catch((error) => {
      main.innerHTML = `<p class="error">${error.message}</p>`;
    });
  }
};

//Method 
const searchArticles = (userInput) => {
  if (userInput === "") {
    return;
  }
  else {
    getSearchResults(userInput).then( (articles) => {
      //check if there's any articles to display
      if (articles.length > 0) {
        //remove selection from all buttons
        $('.sourceButton').removeClass('jqfocus');
        //Clean the page
        main.innerHTML = "";
        searchStatus.style.visibility = "hidden";
        renderNews(articles);
      }  
      else {
        searchStatus.style.visibility = "visible";
        userSearch.value = "";
      }    
    });
  }
};

//Request search results from news API 
const getSearchResults = async (userInput) => {
  try {
    const request = await fetch(`https://newsapi.org/v2/everything?sortBy=published&q=${userInput}${apiKey}&pageSize=50`);
    if (request.ok) {
      const requestJson = await request.json();

      return requestJson.articles;
    }
  }
  catch(networkError) {
    console.log(networkError);
  }
};

// Request News Function
const getNews = async (url) => {
    try {
        const response = await fetch(newsApiURL + url + apiKey + "&pageSize=90"); //Send asynchronous request to server 

        if (response.ok) {
          searchStatus.style.visibility = "hidden";
          const responseJson = await response.json();

          return responseJson.articles;
        }                                                                                                                                                                                                                                                                     
    }
    catch(networkError) {
       console.log(networkError);
       throw new Error("News cannot be loaded. Please check your Internet connection or try later");
    }    
};

// Render Function
function renderNews(articles) {
  articles.map((article, index) => {
    if (index > 0 && article.description != null) {
        let articleRow =
        '<div class="articlerow">' +
        ' <div class="article">' +
        '   <div><h2 class="title">' + article.title + '</h2>' +
        '   <h3>By ' + ((article.author !=null) ? article.author : "John Doe")    + ' on ' + new Date(article.publishedAt).toLocaleString() + '</h3>' +
        '   <p class="content"> ' + ((article.content !=null) && (sourcesException.indexOf(article.source.id) === -1)
            ? (article.content.split("[")[0]) : article.description) + '</p>' +
        '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a></div>' +
        '   <div><img class="storyimage" src="' + article.urlToImage + '" /></div>' +
        ' </div>' +
        ' <div class="share">' +
        '   <div class="share-buttons"><button type="button" class="twitter fa fa-twitter" id="tweet ' + index + '">' +
        '   </button>' +
        '   <button type="button" class="facebook fa fa-facebook " id="facebook ' + index + '">' +
        '   </button>' +
        '   <button type="button" class="google fa fa-google" id="google ' + index + '">' +
        '   </button>' + 
        '   <button type="button" class="linkedin fa fa-linkedin" id="linkedin ' + index + '">' +
        '   </button>' +
        '   <button type="button" class="comments fa fa-comments" id="comments ' + index + '">' +
        '   </button>' +
        ' </div>' +
        '</div>';
  
      main.innerHTML += articleRow;      
    }
  });

  return articles;
}

// Post Tweet Function
function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('twitter');
  let facebookButtons = document.getElementsByClassName('facebook');
  let googleButtons = document.getElementsByClassName('google');
  let linkedInButtons = document.getElementsByClassName('linkedin');
  let commentsButtons = document.getElementsByClassName('comments');

  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      Twitter.postStatus(newsObjects[i].url);
      tweetButtons[i].classList.add("rotate");
      tweetButtons[i].classList.add("clicked");
      tweetButtons[i].disabled = true;
    }, false);
    //Add event listeners to facebook buttons
    facebookButtons[i].addEventListener('click', function() {
      facebookButtons[i].classList.add("rotate");
      facebookButtons[i].classList.add("clicked");
      facebookButtons[i].disabled = true;
    }, false);
    //Add event listeners to google buttons
    googleButtons[i].addEventListener('click', function() {
      googleButtons[i].classList.add("rotate");
      googleButtons[i].classList.add("clicked");
      googleButtons[i].disabled = true;
      
    }, false);
    //Add event listeners to linkedIn buttons
    linkedInButtons[i].addEventListener('click', function() {
      linkedInButtons[i].classList.add("rotate");
      linkedInButtons[i].disabled = true;
    }, false);
  }
}

//Eventlistener to add some actions when page is loaded for the first time
window.addEventListener("load", initialize, false);