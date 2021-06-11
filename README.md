# GooglePlayScraper
GooglePlayScraper app scrapes 100 free top selling apps from Google Play Store using google-play-scraper npm library.

It uses ReactJS in frontend to render the page where we can see details of individual app by clicking 'Details' button.
We also have an Update button to scrape the latest data and update the database accordingly by adding new documents and updating the validity of ineligible documents to false.
On Update, the code also checks and updates the database with latest rating of apps from play store.

Tech stack: MERN (MongoDB Atlas, Express server, React JS frontend framework and Node JS as runtime environment)
Other implemented functionalities: Bootstrap for designing layout of web page, Client side pagination for displaying 10 apps per page, Heroku for deployment

Please refer deployed app here: https://google-play-scraper-divs.herokuapp.com/
