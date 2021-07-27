# This is the official repository for Guess Jam!

A music guessing game to play with friends and family from anywhere in the world!

![logo](https://user-images.githubusercontent.com/60367655/126410272-72e4e4aa-92f1-4cf6-a788-a6f03a17d43f.png)



## Set up .env file in the backend directory

Using the provided Spotify client id and secret, create a .env file based on the .env.example and paste respective codes into their place.
You should now be able to use the Spotify API.

```
SPOTIFY_CLIENT_ID=abcdefghiklmf
SPOTIFY_CLIENT_SECRET=342343423432
```
## Set up a .env file in the frontned directory

Set up the Sass path in a .env file in the root of the client directory, and type this if you are MacOS:

```
SASS_PATH=node_modules:src
```

For windows, do this:

```
SASS_PATH=./node_modules;./src
```
