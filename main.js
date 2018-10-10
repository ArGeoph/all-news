// Page Elements
//This added
const engadget = document.getElementById('engadget');
const recode = document.getElementById('recode');
const nextWeb = document.getElementById('nextWeb');
const main = document.getElementsByTagName('main')[0];

// News API Data

const apiKey = '38454a5683fc41a6bda61e927cb5bae0';
const engadgetUrl = 'https://newsapi.org/v2/top-headlines?sources=engadget&apiKey=';
const recodeUrl = 'https://newsapi.org/v2/top-headlines?sources=recode&apiKey=';
const nextWebUrl = 'https://newsapi.org/v2/top-headlines?sources=the-next-web&apiKey=';

// Request News Function
const getNews = async (url) => {
    

    try {
        const response = await fetch(url + apiKey);

        if (response.ok) {
            const responseJson = await response.json();
            console.log(responseJson)
            renderNews(responseJson.articles);
        }
    }
    catch(networkError) {
       console.log(networkError);
    }
    
};
// Render Function

function renderNews(articles) {
  articles.map((article, index) => {
    if (index > 0) {
        let articleRow =
        '<div class="articlerow">' +
        ' <div class="article">' +
        '   <h2 class="title">' + article.title + '</h2>' +
        '   <h3>By ' + article.author + '</h3>' +
        '   <p> ' + article.description + '</p>' +
        '   <a href="' + article.url + '" target="_blank" class="readmore"><p>Read More</p></a>' +
        ' </div>' +
        ' <div class="share">' +
        '   <img class="storyimage" src="' + article.urlToImage + '" />' +
        '   <a href="https://twitter.com/<your user name>" target="_blank"><button type="button" class="tweet" id="tweet ' + index + '">' +
        '   <i class="fa fa-twitter" aria-hidden="true"></i>Tweet This</button></a>' +
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
      // Call Post Status function here
      tweetButtons[i].innerHTML = "Tweeted";
    }, false);
  }
}

// Button Event Listeners

engadget.addEventListener('click', function() {
  main.innerHTML = "";
  getNews(engadgetUrl);
  // Call getNews() here
}, false);

recode.addEventListener('click', function() {
  main.innerHTML = "";
  getNews(recodeUrl);
  // Call getNews() here
}, false);

nextWeb.addEventListener('click', function() {
  main.innerHTML = "";
  getNews(nextWebUrl);
  // Call getNews() here
}, false);
///////
