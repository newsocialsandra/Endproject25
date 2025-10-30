// Proxy och endpoint för randomquote från Zen API
const proxy = "https://corsproxy.io/?";
const randomQuote ="https://zenquotes.io/api/random/";

// Endpoint för random kattbild från The Cat API
const catUrl = "https://api.thecatapi.com/v1/images/search";

// Funktion för att kattifiera författarnamn:
function catifyName(name) {
  const catNames = ["Meow", "The Kitty Cat", "Whiskers", "Mc Paw", "Claw-a-lot", "Litterbox", "Small Paws"];
  const nameSplit = name.split(" ");
  const random = Math.floor(Math.random() * catNames.length);
  if (nameSplit.length > 1) {
    nameSplit[1] = catNames[random];
  } else {
    nameSplit.push(catNames[random]);
  }
  return nameSplit.join(" ");
}

// Funktion för att skapa kort med citat till theme quote
function createQuoteCard(quote, author) {
  const card = document.createElement("div");
  card.classList.add("theme-card");
  card.innerHTML = `
    <p>${quote}</p>
    <p class ="author">– ${author}</p>
    `;
  return card;
}

// Funktion för att skapa tre "kort" för att visa sökresultat
function showResults(quotes, container) {
  container.innerHTML = "";
  quotes.slice(0, 3).forEach(q => {
    const card = document.createElement("div");
    card.classList.add("quote-card");
    const author = catifyName(q.a);
    card.innerHTML = `
      <div class="card-inner">
      <div class="card-front">
      <p class="author">– ${author}</p>
    </div>
      <div class="card-back">
      <p>"${q.q}"</p>
      </div>
    </div>
    `;
    container.appendChild(card);
    // Vänd kortet när man klickar på det:
    card.addEventListener("click", () => {
    card.classList.toggle("flipped");
});
  });
}

// Funktion för att hämta random kattbild från The Cat API:
async function getCat(url) {
  const response = await fetch(url);
  var data = await response.json();
  return data[0].url;
}

// Funktion för att hämta ett random citat från Zen API
// encodeURIComponent för att komma runt problem med CORS
async function getZen(url) {
  const response = await fetch(proxy + encodeURIComponent(url));
  const data = await response.json();

  const authorName = data[0].a;
  const newAuthorName = catifyName(authorName);

  return {
    quote: data[0].q,
    author: newAuthorName,
  };
}

// Funktion för att hämta flera random citat och lägga dem i en lista:
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
const searchContainer = document.getElementById("searchResults");

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
  const theme = document.getElementById("mood").value;
  const themeQuote = "https://zenquotes.io/api/quotes/keyword=" + theme;
  const {quote, author} = await getZen(themeQuote);
  themeDiv.innerHTML = "";
  const card = createQuoteCard(quote, author);
  themeDiv.appendChild(card);
})

// Lyssnar efter klick på searchBtn
// Hämtar inskrivet keyword från sökrutan
// Filtrerar listan med slumpmässiga citat på keyword
// Fyller searchContainer med resultat
document.getElementById("searchBtn").addEventListener("click", () => {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const filtered = allQuotes.filter(q =>
    q.a.toLowerCase().includes(keyword)
  );
  showResults(filtered, searchContainer);
});

// Fyll sökresultats-diven med några förvalda citatkort när sidan laddas
let allQuotes = [];
window.addEventListener("DOMContentLoaded", async () => {
  allQuotes = await getQuotesBatch(10);
  showResults(allQuotes, searchContainer);
});
