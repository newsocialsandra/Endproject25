// PLAN:

// När man klickar på get advice-knapp så får man upp random kattbild
// och random zenquote
// och namn på den som sagt det, men med "Meow", "Kitty" eller "Whiskers" i namnet

// TODO

// Hämta kattbild från api

// Skapa lista på cursed authors: Ronald Reagan, Ayn Rand, Colin Powell,

// Hämta citat  från api
// Funktion som:
// -kollar om author är cursed och i så fall:
// -hämtar ut quote och ersätter varje ord med "meow"
// -hämtar ut den som sa det, uppdaterar namn och sparar i variabel
// -om author ej är cursed:
// -hämtar ut quote och sparar i variabel
// -hämtar ut den som sa det, uppdaterar namn och sparar i variabel
// -returnerar variabler


// Skapa onclick-listener för knapp
// När knappen klickas ska diven catpic fyllas med en bild på en random katt
// Och diven random quote ska fyllas med citatet
// Och diven author fylls med author
// Om knappen klickas igen så ska divarna fyllas med nytt random innehåll

const catUrl =

const zenUrl ="https://zenquotes.io/api/random/";

async function getapi(url)
{
  const response = await fetch(url);
  var data = await response.json();
  console.log(data);
}

getapi(zenUrl);

