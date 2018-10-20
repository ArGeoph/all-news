const engadget = document.getElementById('engadget');
const recode = document.getElementById('recode');
const nextWeb = document.getElementById('nextWeb');
const hackerNews = document.getElementById('hackerNews');
const sourcesList = document.getElementById('newSources');
const main = document.getElementsByTagName('main')[0];
const sourcesMap = new Map();

// News API Data

const engadgetUrl = 'https://newsapi.org/v2/top-headlines?sources=engadget&apiKey=';
const recodeUrl = 'https://newsapi.org/v2/top-headlines?sources=recode&apiKey=';
const nextWebUrl = 'https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey=';
const hackerNewsUrl = 'https://newsapi.org/v2/top-headlines?sources=hacker-news&apiKey=';

//Callback function called when page is loaded for the first time

const initialize = () => {
  //Map used to store urls for new sources
  sourcesMap.set("AlJazeera", "https://newsapi.org/v2/top-headlines?sources=al-jazeera-english&apiKey=");
  sourcesMap.set("ABC", "https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=");
  sourcesMap.set("ABC", "https://newsapi.org/v2/top-headlines?sources=abc-news&apiKey=");
  //Add event listeners
  engadget.addEventListener('click', () => addNewsSource(engadgetUrl), false);  
  recode.addEventListener('click', () => addNewsSource(recodeUrl), false);  
  nextWeb.addEventListener('click', () => addNewsSource(nextWebUrl), false);  
  hackerNews.addEventListener('click', () => addNewsSource(hackerNewsUrl), false);
  sourcesList.addEventListener('change', () => addNewsSource(sourcesMap.get(sourcesList.value)));

  //Load default news when page is loaded by the first time, and select the corresponding menu button

  addNewsSource(recodeUrl); 
  $('#recode').addClass('jqfocus');
};

//News callback function used to load and render news from the url 

const addNewsSource = (sourceUrl) => {
  //Remove focus from menu button loaded by default
  $('#recode').removeClass('jqfocus');

  main.innerHTML = "";
  getNews(sourceUrl).then(articlesArray => renderNews(articlesArray)).then(articles => sendTweets(articles));
};

// Request News Function
const getNews = async (url) => {
    try {
        const response = await fetch(url + apiKey); //Send asynchronous request to server 

        if (response.ok) {
            const responseJson = await response.json();
            console.log(responseJson);
            return responseJson.articles;
        }
    }
    catch(networkError) {
       console.log(networkError);
    }    
};

// Render Function
function renderNews(articles) {
  articles.map((article, index) => {
    if (index > 0 && article.description != null) {
        let articleRow =
        '<div class="articlerow">' +
        ' <div class="article">' +
        '   <h2 class="title">' + article.title + '</h2>' +
        '   <h3>By ' + ((article.author !=null) ? article.author : "John Doe")    + ' on ' + new Date(article.publishedAt).toLocaleString() + '</h3>' +
        '   <p class="content"> ' + (article.content !=null ? (article.content.split("[")[0]) : article.description) + '</p>' +
        '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
        ' </div>' +
        ' <div class="share">' +
        '   <img class="storyimage" src="' + article.urlToImage + '" />' +
        '   <div class="share-buttons"><button type="button" class="tweet" id="tweet ' + index + '">' +
        '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet</button>' +
            '<button type="button" class="facebook" id="facebook ' + index + '">' +
        '   <i class="fa fa-facebook fa-2"" aria-hidden="true"></i>Post</button></div>' +
        ' </div>' +
        '</div>';
  
      main.innerHTML += articleRow;
    }

  });
  return articles;
}

// Post Tweet Function
function sendTweets(newsObjects) {
  let tweetButtons = document.getElementsByClassName('tweet');
  for (let i = 0; i < tweetButtons.length; i++) {
    tweetButtons[i].addEventListener('click', function() {
      console.log(newsObjects[i].url);
      Twitter.postStatus(newsObjects[i].url);
      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

//Eventlistener to add some actions when page is loaded for the first time
window.addEventListener("load", initialize, false);