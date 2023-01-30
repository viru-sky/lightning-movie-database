# movie-database

Lightning project for Credersi Lighning Course.

### Getting started

> Before you follow the steps below, make sure you have the
> [Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ only your system

```
npm install -g @lightningjs/cli
```

### ❗️API Key ❗️

The app requires an API Key for requests to TMDB API. The API Key should be set in `src/lib/tmdbapi/tmdb-api.js`.

```
# Inside tmdb-api.js
const apiKey = "YOUR_API_KEY_HERE";
const tmdbBaseUrl = "https://api.themoviedb.org/3";
```

#### Running the App

1. Install the NPM dependencies by running `npm install`
2. Build the App using the _Lightning-CLI_ by running `lng build` inside the root of your project
3. Fire up a local webserver and open the App in a browser by running `lng serve` inside the root of your project

## Controls

- ENTER Key - select item
- BACK Key - return to previous page
- LEFT/RIGHT Arrows Keys - scroll through upcoming movies list
