// Funktion för att kattifiera författarnamn:

function catifyName(name) {
  const catNames = ["Meow", "The Kitty Cat", "Whiskers"];
  const nameSplit = name.split(" ");
  const random = Math.floor(Math.random() * catNames.length);
  if (nameSplit.length > 1) {
    nameSplit[1] = catNames[random];
  } else {
    nameSplit.push(catNames[random]);
  }
  return nameSplit.join(" ");
}


// Funktion för att hämta random kattbild från The Cat API:
const catUrl = "https://api.thecatapi.com/v1/images/search";

async function getCat(url)
{
  const response = await fetch(url);
  var data = await response.json();
  return data[0].url;
}

// Funktion för att hämta data från Zen API
// Proxy och encodeURIComponent för att komma runt problem med CORS
const proxy = "https://corsproxy.io/?";
const randomQuote ="https://zenquotes.io/api/random/";

async function getZen(url)
{
  const response = await fetch(proxy + encodeURIComponent(url));
  const data = await response.json();

  const authorName = data[0].a;
  const newAuthorName = catifyName(authorName);
  
  return {
    quote: data[0].q,
    author: newAuthorName,
  };
}



// Funktion för att hämta flera slumpcitat och lägga dem i en lista:
const amount = 10;
async function getQuotesBatch(amount) {
  let allQuotes = [];
  for (let i = 0; i < amount; i++) {
    const res = await fetch(proxy + encodeURIComponent(randomQuote));
    const data = await res.json();
    allQuotes.push(data[0]);
  }
  return allQuotes;
};


// Variables to access divs
const catPicDiv = document.getElementById("catPic");
const quoteDiv = document.getElementById("randomQuote");
const authorDiv = document.getElementById("author");
const themeDiv = document.getElementById("themeQuote");
const themeAuth = document.getElementById("themeAuth");

// Lyssnar efter onclick på button id generate
// Plockar ut kattbild, quote och författare
// Rensar ev. innehåll i divar, Lägger in kattbild, quote och författare

document.getElementById("generate").addEventListener("click", async() => {
  const imgUrl = await getCat(catUrl);
  const {quote, author} = await getZen(randomQuote);
  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "Wise cat";
  catPicDiv.innerHTML = "";
  catPicDiv.appendChild(img);

  quoteDiv.innerHTML = `"${quote}"`;
  authorDiv.innerHTML = `– ${author}`;

});

// Lyssnar efter onclick på button id generate specific
// Plockar ut valt value från dropdown, lägger till i api endpoint
// Hämtar citat på temat, puttar in i div

document.getElementById("generateSpecific").addEventListener("click", async() => {
  const getTheme = document.getElementById("mood");
  const theme = getTheme.value;
  const themeQuote = "https://zenquotes.io/api/quotes/keyword=" + theme;
  const {quote, author} = await getZen(themeQuote);
  themeDiv.innerHTML = `"${quote}"`;
  themeAuth.innerHTML = `– ${author}`;
})

