// PLAN:

// När man klickar på get advice-knapp så får man upp random kattbild
// och random zenquote
// och namn på den som sagt det, men med "Meow", "Kitty" eller "Whiskers" i namnet

// TODO

// Hämta kattbild från api

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

const catUrl = "https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=beng&api_key=" + config.apiKey;

async function getCat(url)
{
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}

getCat(catUrl);

const proxy = "https://api.allorigins.win/raw?url=";
const zenUrl ="https://zenquotes.io/api/random/";

async function getZen(url)
{
  const response = await fetch(proxy + encodeURIComponent(url));
  var data = await response.json();
  console.log(data);
}

getZen(zenUrl);


