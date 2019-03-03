const sourcesMap = new Map();
let newsCategories = ['', 'World News', 'Business News', 'Technologies', 'Entertainment', 'Russian News', 'Sport'];

// Add news sources exception that need special handling (in this case proper rendering of cyrillic letters)
const sourcesException = ["rbc", "rt", "google-news-ru", "lenta"]; 

// Map used to store urls for new news sources
 sourcesMap.set("Select news", { category: '',
 url: ''});
sourcesMap.set("AlJazeera", { category: 'World News',
url: 'al-jazeera-english'});
sourcesMap.set("Google News Canada", { category: "World News",
       url: 'google-news-ca'});
sourcesMap.set("Google News Russia", { category: "Russian News",
       url: "google-news-ru"});
sourcesMap.set("New Scientist", { category: 'Technologies',
   url: "new-scientist"});
sourcesMap.set("National Geographic", { category: 'Entertainment',
         url: "national-geographic"});
sourcesMap.set("RBC", { category: "Russian News",
url: "rbc"});
sourcesMap.set("The Telegraph", { category: 'World News',
   url: "the-telegraph"});
sourcesMap.set("The Guardian", { category: 'World News',
   url: "the-guardian-uk"});
sourcesMap.set("The Washington Post", { category: 'World News',
         url: "the-washington-post"});
sourcesMap.set("Russia Today", { category: "Russian News",
   url: "rt"});
sourcesMap.set("Wired", { category: 'Technologies',
url: "wired"});
sourcesMap.set("The Huffington Post", { category: 'World News',
         url: "the-huffington-post"});
sourcesMap.set("BBC Sport", { category: "Sport",
url:"bbc-sport"});
sourcesMap.set("Next web", { category: 'Technologies',
url: "the-next-web"});
sourcesMap.set("Recode", { category: 'Technologies',
url: "recode"});
sourcesMap.set("Crypto News", { category: 'Technologies',
 url: "crypto-coins-news"})
sourcesMap.set("Hacker News", { category: 'Technologies',
 url: "hacker-news"});
sourcesMap.set("Buzzfeed", { category: 'Technologies',
url: "buzzfeed"});
sourcesMap.set("Time", { category: 'World News',
url: "time"});
sourcesMap.set("Financial Times", { category: 'Business News',
     url:"financial-times"});
sourcesMap.set("Fox News", { category: "World News",
url: "fox-news"});
sourcesMap.set("Independent", { category: "World News",
 url: "independent"});
sourcesMap.set("Lenta", { category: "Russian News",
url:"lenta"});
sourcesMap.set("Reddit /r/all",  { category: 'Entertainment',
     url: "reddit-r-all"});
sourcesMap.set("The Economist", { category: 'Business News',
   url: "the-economist"});
sourcesMap.set("USA Today", "usa-today");
sourcesMap.set("Ars Technica", { category: 'Technologies',
   url: "ars-technica"});
sourcesMap.set("Entertainment Weekly", { category: 'Entertainment',
           url: "entertainment-weekly"});
sourcesMap.set("Fortune", { category: 'Business News',
      url: "fortune"});
sourcesMap.set("Business Insider", { category: 'Business News',
        url: "business-insider"});
sourcesMap.set("The New York Times", { category: 'World News',
url: "the-new-york-times"});
sourcesMap.set("The Wall Street Journal", { category: 'Business News',
url: "the-wall-street-journal"});
sourcesMap.set("The Globe and Mail", { category: 'World News',
url: "the-globe-and-mail"});
sourcesMap.set("New York Magazine", { category: 'World News',
url: "new-york-magazine"});
sourcesMap.set("News Week", { category: 'World News',
url: "newsweek"});
sourcesMap.set("Polygon", { category: 'Entertainment',
url: "polygon"});
sourcesMap.set("Next Big Future", { category: 'Technologies',
url: "next-big-future"});
sourcesMap.set("Mirror", { category: 'Entertainment',
url: "mirror"});
sourcesMap.set("The Sport Bible", { category: 'Sport',
url: "the-sport-bible"});
sourcesMap.set("ESPN", { category: 'Sport',
url: "espn"});
sourcesMap.set("TalkSport", { category: 'Sport',
url: "talksport"});
sourcesMap.set("Associated Press", { category: 'World News',
url: "associated-press"});
sourcesMap.set("RTE", { category: 'World News',
url: "rte"});