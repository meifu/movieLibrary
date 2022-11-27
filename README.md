## Movie Library

Homepage: displays a list of movies.

By clicking each movie name, users will be directed to the movie detail page.

Movie detail page: shows details and comments. Users can submit their name and comment.



### How to use

Pull the docker image from docker hub [meifu/movielib](https://hub.docker.com/r/meifu/movielib)

```bash
docker pull meifu/movielib
```

Run the docker image

```bash
docker run -p 3000:3000 meifu/movielib
```

Open the browser and go to http://localhost:3000


### Desgin

Utilize `Next.js` for UI and API, `mongoDB` for database.
