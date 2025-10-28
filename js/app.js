// PLAN:

// När man klickar på get advice-knapp så får man upp random kattbild
// och random zenquote
// och namn på den som sagt det, men med "Meow", "Kitty" eller "Whiskers" i namnet

// TODO


// Hämtar random kattbild:
const catUrl = "https://api.thecatapi.com/v1/images/search";

async function getCat(url)
{
  const response = await fetch(url);
  var data = await response.json();
  return data[0].url;
}

// Funktion för att hämta data från Zen API
const proxy = "https://corsproxy.io/?";
const randomQuote ="https://zenquotes.io/api/random/";

async function getZen(url)
{
  const response = await fetch(proxy + encodeURIComponent(url));
  const data = await response.json();
  let authorName = data[0].a;
  let nameSplit = authorName.split(" ");
  const catNames = ["Meow", "The Kitty Cat", "Whiskers"];
  const random = Math.floor(Math.random() * catNames.length);
  if (nameSplit.length === 1) {
    nameSplit.push(catNames[random]);
  } else {
  nameSplit[nameSplit.length - 1] = catNames[random];
    }
  const newAuthorName = nameSplit.join(" ");

  return {
    quote: data[0].q,
    author: newAuthorName,
  };
}

// Variables to access divs
const catPicDiv = document.getElementById("catPic");
const quoteDiv = document.getElementById("randomQuote");
const authorDiv = document.getElementById("author");
const themeDiv = document.getElementById("themeQuote");
const themeAuth = document.getElementById("themeAuth");

// Lyssnar efter onclick på button id generate:

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
document.getElementById("generateSpecific").addEventListener("click", async() => {
  const getTheme = document.getElementById("mood");
  const theme = getTheme.value;
  const themeQuote = "https://zenquotes.io/api/quotes/keyword=" + theme;
  const {quote, author} = await getZen(themeQuote);
  themeDiv.innerHTML = `"${quote}"`;
  themeAuth.innerHTML = `– ${author}`;
})

