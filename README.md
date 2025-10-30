# Endproject25
Final project for scripting course in Digital Analytics @ Medieinstitutet

## Wise cats
The Wise cats web app is designed to give you inspiration and enlightenment, as well as brightening up your day with a CAT. The web app is built with data from [The Cat API](https://thecatapi.com/) and [Zen Quotes API](https://zenquotes.io/)

### Functionality:
- **Get wisdom:** Get a random catpic paired with a random quote and a kittified author
- **Search depending on theme:** Choose a theme from a drop down menu to get a quote on the theme
- **Search by name:** Search and retrieve a kittified author and get a quote from them 

### Comments:
- I wanted to fetch all quotes to give the user the opportunity to search amongst them. However, this was not possible without getting a paid subscription to the Zen API
- The function getQuotesBatch is a workaround for this problem that fetches a number of random quotes and puts them in a list, that then is used to filter search results
