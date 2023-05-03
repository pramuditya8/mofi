# Movie API Documentation

## Endpoints :

List of available endpoints:

- `POST /register`
- `POST /login`
- `GET /movies/upcoming`
- `GET /movies/popular`
- `GET /movies/:id`
- `GET /movies/shorturl/:id`
- `GET /generate-midtrans-token`
- `PATCH /upgrade`
- `POST /movies/shorturl`
- `POST /oauth/discord-login`

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_

```json
{
  "id": "integer",
  "username": "string",
  "email": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "errors": [
    {
      "path": "username",
      "message": "Username is required"
    },
    {
      "path": "email",
      "message": "Email is required"
    },
    {
      "path": "email",
      "message": "Invalid email format"
    },
    {
      "path": "email",
      "message": "Email already used"
    },
    {
      "path": "password",
      "message": "Password is required"
    }
  ]
}
```

&nbsp;

## 2. POST /login

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "username": "string",
  "premium": "boolean",
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "errors": [
    {
      "path": "email",
      "message": "Email is required"
    },
    {
      "path": "password",
      "message": "Password is required"
    }
  ]
}
```

_Response (401 - Unauthorized)_

```json
{
  "errors": [
    {
      "path": "invalid",
      "message": "Invalid email/password"
    }
  ]
}
```

&nbsp;

## 3. GET /movies/upcoming

Description:

- Get all upcoming movies from database

_Response (200 - OK)_

```json
[
  {
    "adult": false,
    "backdrop_path": "https://image.tmdb.org/t/p/w1280/wD2kUCX1Bb6oeIb2uz7kbdfLP6k.jpg",
    "genre_ids": [27, 53],
    "id": 980078,
    "original_language": "en",
    "original_title": "Winnie the Pooh: Blood and Honey",
    "overview": "Christopher Robin is headed off to college and he has abandoned his old friends, Pooh and Piglet, which then leads to the duo embracing their inner monsters.",
    "popularity": 3152.098,
    "poster_path": "/s3u70iZ1mpY6W9rW1S6BxDMRNQt.jpg",
    "release_date": "2023-01-27",
    "title": "Winnie the Pooh: Blood and Honey",
    "video": false,
    "vote_average": 5.9,
    "vote_count": 327
  },
  {
    "adult": false,
    "backdrop_path": "https://image.tmdb.org/t/p/w1280/m1fgGSLK0WvRpzM1AmZu38m0Tx8.jpg",
    "genre_ids": [28],
    "id": 842945,
    "original_language": "en",
    "original_title": "Supercell",
    "overview": "Good-hearted teenager William always lived in hope of following in his late father’s footsteps and becoming a storm chaser. His father’s legacy has now been turned into a storm-chasing tourist business, managed by the greedy and reckless Zane Rogers, who is now using William as the main attraction to lead a group of unsuspecting adventurers deep into the eye of the most dangerous supercell ever seen.",
    "popularity": 2816.639,
    "poster_path": "/gbGHezV6yrhua0KfAgwrknSOiIY.jpg",
    "release_date": "2023-03-17",
    "title": "Supercell",
    "video": false,
    "vote_average": 6.5,
    "vote_count": 41
  }
]
```

&nbsp;

## 4. GET /movies/popular

Description:

- Get all popular movies from database

_Response (200 - OK)_

```json
[
  {
    "adult": false,
    "backdrop_path": "/ovM06PdF3M8wvKb06i4sjW3xoww.jpg",
    "genre_ids": [878, 12, 28],
    "id": 76600,
    "original_language": "en",
    "original_title": "Avatar: The Way of Water",
    "overview": "Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.",
    "popularity": 8097.311,
    "poster_path": "https://image.tmdb.org/t/p/w780/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    "release_date": "2022-12-14",
    "title": "Avatar: The Way of Water",
    "video": false,
    "vote_average": 7.8,
    "vote_count": 6519
  },
  {
    "adult": false,
    "backdrop_path": "/5i6SjyDbDWqyun8klUuCxrlFbyw.jpg",
    "genre_ids": [18, 28],
    "id": 677179,
    "original_language": "en",
    "original_title": "Creed III",
    "overview": "After dominating the boxing world, Adonis Creed has been thriving in both his career and family life. When a childhood friend and former boxing prodigy, Damien Anderson, resurfaces after serving a long sentence in prison, he is eager to prove that he deserves his shot in the ring. The face-off between former friends is more than just a fight. To settle the score, Adonis must put his future on the line to battle Damien — a fighter who has nothing to lose.",
    "popularity": 4219.94,
    "poster_path": "https://image.tmdb.org/t/p/w780/cvsXj3I9Q2iyyIo95AecSd1tad7.jpg",
    "release_date": "2023-03-01",
    "title": "Creed III",
    "video": false,
    "vote_average": 7.3,
    "vote_count": 666
  }
]
```

&nbsp;

## 5. GET /movies/:id

Description:

- Get movie by id from database

_Response (200 - OK)_

```json
{
  "adult": false,
  "backdrop_path": "/eNJhWy7xFzR74SYaSJHqJZuroDm.jpg",
  "belongs_to_collection": null,
  "budget": 0,
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    }
  ],
  "homepage": "",
  "id": 1033219,
  "imdb_id": "tt22408766",
  "original_language": "en",
  "original_title": "Attack on Titan",
  "overview": "As viable water is depleted on Earth, a mission is sent to Saturn's moon Titan to retrieve sustainable H2O reserves from its alien inhabitants. But just as the humans acquire the precious resource, they are attacked by Titan rebels, who don't trust that the Earthlings will leave in peace.",
  "popularity": 1721.784,
  "poster_path": "/ay8SLFTMKzQ0i5ewOaGHz2bVuZL.jpg",
  "production_companies": [
    {
      "id": 1311,
      "logo_path": "/ic2bTizdzRLDVzAvN7MXdUg3WQV.png",
      "name": "The Asylum",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2022-09-30",
  "revenue": 0,
  "runtime": 93,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "The battle for Earth has begun.",
  "title": "Attack on Titan",
  "video": false,
  "vote_average": 6.125,
  "vote_count": 36,
  "film": "https://www.youtube.com/embed/vdpj3SQpKcw"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "The resource you requested could not be found."
}
```

&nbsp;

## 6. GET /movies/shorturl/:id

Description:

- Get movie shorturl by movie id from database

_Response (200 - OK)_

```json
{
  "id": 7,
  "MovieId": 1076605,
  "tinyUrl": "https://tinyurl.com/jobsroad-1076605",
  "url": "https://jobsroad3.web.app/movies/1076605",
  "createdAt": "2023-04-05T06:10:29.344Z",
  "updatedAt": "2023-04-05T06:10:29.344Z"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Data not found."
}
```

&nbsp;

## 7. GET /generate-midtrans-token

Description:

- Generate midtrans token

Request:

- headers: access_token

_Response (201 - Created)_

```json
{
  "token": "d3ea83b0-f867-44ff-8be7-48e093d049e7",
  "redirect_url": "https://app.sandbox.midtrans.com/snap/v3/redirection/d3ea83b0-f867-44ff-8be7-48e093d049e7"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "User already premium"
}
```

&nbsp;

## 8. PATCH /upgrade

Description:

- Upgrade current user to premium

Request:

- headers: access_token

```json
{
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "message": "Upgrade to premium successfully"
}
```

&nbsp;

## 9. POST /movies/shorturl

Description:

- Generate shorturl

Request:

- body:

```json
{
  "movieId": "integer"
}
```

_Response (201 - Created)_

```json
{
  "domain": "tinyurl.com",
  "alias": "abcd-1123123",
  "deleted": false,
  "archived": false,
  "analytics": {
    "enabled": true,
    "public": false
  },
  "tags": [],
  "created_at": "2023-04-06T06:40:10+00:00",
  "expires_at": null,
  "tiny_url": "https://tinyurl.com/abcd-1123123",
  "url": "https://iproject-mofi.web.app/movie/watch/1123123"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Short Url already available"
}
```

&nbsp;

## 10. POST /oauth/discord-login

Request:

- headers: access_token (this is access_token from discord)

_Response (201 - Created)_

```json
{
  "username": "string",
  "premium": "boolean",
  "access_token": "string"
}
```

_Response (200 - OK)_

```json
{
  "username": "string",
  "premium": "boolean",
  "access_token": "string"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
