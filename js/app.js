// PLAN:

// När man klickar på get advice-knapp så får man upp random kattbild
// och random zenquote
// och namn på den som sagt det, men med "Meow", "Kitty" eller "Whiskers" i namnet

// TODO

// Hämta citat  från api
// Funktion som:
// -hämtar ut quote och sparar i variabel
// -hämtar ut den som sa det, uppdaterar namn och sparar i variabel
// -returnerar variabler


// Skapa onclick-listener för knapp
// När knappen klickas ska diven catpic fyllas med en bild på en random katt
// Och diven random quote ska fyllas med citatet
// Och diven author fylls med author
// Om knappen klickas igen så ska divarna fyllas med nytt random innehåll


// Hämta data från Katt-API

// Hämtar katter från vald kattras:
// const catBreed = "https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=" + config.apiKey;

// Hämtar random kattbild:
const catUrl = "https://api.thecatapi.com/v1/images/search";

async function getCat(url)
{
  const response = await fetch(url);
  var data = await response.json();
  return data[0].url;
}


// Funktion för att hämta data från Zen API

const theme = "life"//"HÄMTA FRÅN OPTION VALUE I DROPDOWNMENYN"

const proxy = "https://api.allorigins.win/raw?url=";
const randomQuote ="https://zenquotes.io/api/random/";
const themeQuote = "https://zenquotes.io/api/quotes/keyword=" + theme;

async function getZen(url)
{
  const response = await fetch(proxy + encodeURIComponent(url));
  var data = await response.json();
  console.log(data);
}
getZen(randomQuote);

// Variables to access divs
const catPicDiv = document.getElementById("catPic");


// Lyssnar efter onclick på button id generate:

document.getElementById("generate").addEventListener("click", async() => {
  const imgUrl = await getCat(catUrl);
  const img = document.createElement("img");
  img.src = imgUrl;
  img.alt = "Wise cat";
  img.style.maxWidth = "400px";
  catPicDiv.innerHTML = "";
  catPicDiv.appendChild(img);
});

