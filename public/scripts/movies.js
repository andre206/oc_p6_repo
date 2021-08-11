class Movie {
    /**
     * 
     * @param {string} url URL de l'API : http://localhost:8000/api/v1/titles/
     * @param {number} index Index du résultat qui nous intéresse (de 0 à 6 pour les 7 premiers films)
     */

    constructor(url, index){
        this.url = url;
        this.index = index;
        
        this.title = '';
        this.description = '';
        this.imageUrl = '';
        this.idMovie = 0;
        this.genres = [];
        this.date_published = 0;
        this.rated = '';
        this.imdb_score = 0;
        this.directors = [];
        this.actors = [];
        this.duration = 0;
        this.countries =[];
        this.avg_vote = 0;

    }
}


/**
 * 
 * @param {Array} listMovieObject list of mouvie objects
 * @param {string} categoriesSearch reserch for the GET API - just page_size=12 by default
 */
const movieRecuperationInfos = async function(listMovieObject, categoriesSearch='?page_size=12') {
    await fetch(listMovieObject[0].url+categoriesSearch)
    .then(async function(res) {
        if (res.ok) {
            let data = await res.json()
            console.log(data)
            return data
        }
    })
    .then(async function(value) {     
        listMovieObject.forEach(async (movie, index) => {
            movie.id =value.results[index].id
            movie.url = movie.url + movie.id
            await fetch(movie.url)
            .then(async function(res) {
                if (res.ok) {
                    let data = await res.json();
                    movie.imageUrl = data.image_url;
                    movie.description = data.long_description;
                    movie.title = data.title;
                    movie.genres = data.genres;
                    movie.date_published = data.date_published;
                    movie.rated = data.rated;
                    movie.imdb_score = data.imdb_score;
                    movie.directors = data.directors;
                    movie.actors = data.actors;
                    movie.duration = data.duration;
                    movie.countries = data.countries;
                    movie.avg_vote = data.avg_vote;

                }
            })
            .catch(function(err) {
                console.log('erreur groupe movie')
                // Une erreur est survenue
            })
        })
    })
    .catch(function(err) {
        console.log('erreur general movie')
        // Une erreur est survenue
    })
}


const bestMovieHTML = function(movieObject){
    let bestMovieImg = document.createElement('img');
    bestMovieImg.alt = 'Best Movie Image';
    bestMovieImg.src = movieObject.imageUrl;
    let bestMovieImgDiv = document.createElement('div');
    bestMovieImgDiv.setAttribute('id', 'best-movie__img');
    document.querySelector("#best-movie").appendChild(bestMovieImgDiv);
    document.querySelector("#best-movie__img").appendChild(bestMovieImg);
    document.querySelector("#best-movie__title").innerHTML = movieObject.title
    document.querySelector("#best-movie__description").innerHTML = movieObject.description;
}

const bestMoviesHTML = function(listMovieObject){
    listMovieObject.forEach((movie, index) =>{
        let img = document.createElement('img');
        img.alt = "Best Movie Image "+(index+1);
        img.src = movie.imageUrl;

        document.querySelector("#best-movies__img"+(index+1)).appendChild(img);
        document.querySelector("#best-movies__title"+(index+1)).innerHTML = movie.title
        
        document.getElementById("best-movies--button"+(index+1)).addEventListener('click', function() {
            document.querySelector("#headerModal--title").innerHTML = movie.title + " - Note : " +movie.imdb_score +
            " - Duration : "+movie.duration+" min";
            img = document.getElementById("headerModal--img");
            img.setAttribute('src', movie.imageUrl);
            document.querySelector("#headerModal__genre").innerHTML = "Genre(s) : "+movie.genres;
            document.querySelector("#headerModal__date").innerHTML = "Published date : "+movie.date_published;
        document.querySelector("#headerModal__directors").innerHTML = "Realised by : "+movie.directors +" - Countries : "
            + movie.countries;
            document.querySelector("#headerModal__actors").innerHTML = "List of actors : "+movie.actors;
        
            document.querySelector("#contain__box-office").innerHTML = "Box Office Note : "+movie.avg_vote;
            document.querySelector("#contain__description").innerHTML = movie.description;
            document.querySelector("#contain__rated").innerHTML = "Rated : "+movie.rated;
            document.getElementById("modal-button").href = "#best-movies";
        })
    })
}
const actionMoviesHTML = function(listMovieObject){
    listMovieObject.forEach((movie, index) =>{
        let img = document.createElement('img');
        img.alt = "Action Movie Image "+(index+1);
        img.src = movie.imageUrl;

        document.querySelector("#action__img"+(index+1)).appendChild(img);
        document.querySelector("#action__title"+(index+1)).innerHTML = movie.title
       
        document.getElementById("action--button"+(index+1)).addEventListener('click', function() {
            document.querySelector("#headerModal--title").innerHTML = movie.title + " - Note : " +movie.imdb_score +
            " - Duration : "+movie.duration+" min";
            img = document.getElementById("headerModal--img");
            img.setAttribute('src', movie.imageUrl);
            document.querySelector("#headerModal__genre").innerHTML = "Genre(s) : "+movie.genres;
            document.querySelector("#headerModal__date").innerHTML = "Published date : "+movie.date_published;
        document.querySelector("#headerModal__directors").innerHTML = "Realised by : "+movie.directors +" - Countries : "
            + movie.countries;
            document.querySelector("#headerModal__actors").innerHTML = "List of actors : "+movie.actors;
        
            document.querySelector("#contain__box-office").innerHTML = "Box Office Note : "+movie.avg_vote;
            document.querySelector("#contain__description").innerHTML = movie.description;
            document.querySelector("#contain__rated").innerHTML = "Rated : "+movie.rated;
            document.getElementById("modal-button").href = "#action";
        })
    })
}
const fantasyMoviesHTML = function(listMovieObject){
    listMovieObject.forEach((movie, index) =>{
        let img = document.createElement('img');
        img.alt = "Fantasy Movie Image "+(index+1);
        img.src = movie.imageUrl;

        document.querySelector("#fantasy__img"+(index+1)).appendChild(img);
        document.querySelector("#fantasy__title"+(index+1)).innerHTML = movie.title
       
        document.getElementById("fantasy--button"+(index+1)).addEventListener('click', function() {
            document.querySelector("#headerModal--title").innerHTML = movie.title + " - Note : " +movie.imdb_score +
            " - Duration : "+movie.duration+" min";
            img = document.getElementById("headerModal--img");
            img.setAttribute('src', movie.imageUrl);
            document.querySelector("#headerModal__genre").innerHTML = "Genre(s) : "+movie.genres;
            document.querySelector("#headerModal__date").innerHTML = "Published date : "+movie.date_published;
        document.querySelector("#headerModal__directors").innerHTML = "Realised by : "+movie.directors +" - Countries : "
            + movie.countries;
            document.querySelector("#headerModal__actors").innerHTML = "List of actors : "+movie.actors;
        
            document.querySelector("#contain__box-office").innerHTML = "Box Office Note : "+movie.avg_vote;
            document.querySelector("#contain__description").innerHTML = movie.description;
            document.querySelector("#contain__rated").innerHTML = "Rated : "+movie.rated;
            document.getElementById("modal-button").href = "#fantasy";
        })
    })
}
const scifiMoviesHTML = function(listMovieObject){
    listMovieObject.forEach((movie, index) =>{
        let img = document.createElement('img');
        img.alt = "Sci-Fi Movie Image "+(index+1);
        img.src = movie.imageUrl;

        document.querySelector("#sci-fi__img"+(index+1)).appendChild(img);
        document.querySelector("#sci-fi__title"+(index+1)).innerHTML = movie.title
        //<img src="" alt="Best Movie 1"width=60% height=60%/>

        document.getElementById("sci-fi--button"+(index+1)).addEventListener('click', function() {
            document.querySelector("#headerModal--title").innerHTML = movie.title + " - Note : " +movie.imdb_score +
            " - Duration : "+movie.duration+" min";
            img = document.getElementById("headerModal--img");
            img.setAttribute('src', movie.imageUrl);
            document.querySelector("#headerModal__genre").innerHTML = "Genre(s) : "+movie.genres;
            document.querySelector("#headerModal__date").innerHTML = "Published date : "+movie.date_published;
        document.querySelector("#headerModal__directors").innerHTML = "Realised by : "+movie.directors +" - Countries : "
            + movie.countries;
            document.querySelector("#headerModal__actors").innerHTML = "List of actors : "+movie.actors;
        
            document.querySelector("#contain__box-office").innerHTML = "Box Office Note : "+movie.avg_vote;
            document.querySelector("#contain__description").innerHTML = movie.description;
            document.querySelector("#contain__rated").innerHTML = "Rated : "+movie.rated;
            document.getElementById("modal-button").href = "#sci-fi";
        })
    })
}

const bestMoviesObject = function() {
    let movies = new Array;
    
    let bestMovie1 = new Movie('http://localhost:8000/api/v1/titles/',0);
    movies.push(bestMovie1);
    let bestMovie2 = new Movie('http://localhost:8000/api/v1/titles/',1);
    movies.push(bestMovie2);
    let bestMovie3 = new Movie('http://localhost:8000/api/v1/titles/',2);
    movies.push(bestMovie3);
    let bestMovie4 = new Movie('http://localhost:8000/api/v1/titles/',3);
    movies.push(bestMovie4);
    let bestMovie5 = new Movie('http://localhost:8000/api/v1/titles/',4);
    movies.push(bestMovie5);
    let bestMovie6 = new Movie('http://localhost:8000/api/v1/titles/',5);
    movies.push(bestMovie6);
    let bestMovie7 = new Movie('http://localhost:8000/api/v1/titles/',6);
    movies.push(bestMovie7);
    let bestMovie8 = new Movie('http://localhost:8000/api/v1/titles/',7);
    movies.push(bestMovie8);

    return movies
}
const actionMoviesObject = function() {
    let movies = new Array;
    
    let actionMovie1 = new Movie('http://localhost:8000/api/v1/titles/',0);
    movies.push(actionMovie1);
    let actionMovie2 = new Movie('http://localhost:8000/api/v1/titles/',1);
    movies.push(actionMovie2);
    let actionMovie3 = new Movie('http://localhost:8000/api/v1/titles/',2);
    movies.push(actionMovie3);
    let actionMovie4 = new Movie('http://localhost:8000/api/v1/titles/',3);
    movies.push(actionMovie4);
    let actionMovie5 = new Movie('http://localhost:8000/api/v1/titles/',4);
    movies.push(actionMovie5);
    let actionMovie6 = new Movie('http://localhost:8000/api/v1/titles/',5);
    movies.push(actionMovie6);
    let actionMovie7 = new Movie('http://localhost:8000/api/v1/titles/',6);
    movies.push(actionMovie7);
    let actionMovie8 = new Movie('http://localhost:8000/api/v1/titles/',7);
    movies.push(actionMovie8);

    return movies
}
const fantasyMoviesObject = function() {
    let movies = new Array;
    
    let fantasyMovie1 = new Movie('http://localhost:8000/api/v1/titles/',0);
    movies.push(fantasyMovie1);
    let fantasyMovie2 = new Movie('http://localhost:8000/api/v1/titles/',1);
    movies.push(fantasyMovie2);
    let fantasyMovie3 = new Movie('http://localhost:8000/api/v1/titles/',2);
    movies.push(fantasyMovie3);
    let fantasyMovie4 = new Movie('http://localhost:8000/api/v1/titles/',3);
    movies.push(fantasyMovie4);
    let fantasyMovie5 = new Movie('http://localhost:8000/api/v1/titles/',4);
    movies.push(fantasyMovie5);
    let fantasyMovie6 = new Movie('http://localhost:8000/api/v1/titles/',5);
    movies.push(fantasyMovie6);
    let fantasyMovie7 = new Movie('http://localhost:8000/api/v1/titles/',6);
    movies.push(fantasyMovie7);
    let fantasyMovie8 = new Movie('http://localhost:8000/api/v1/titles/',7);
    movies.push(fantasyMovie8);

    return movies
}
const scifiMoviesObject = function() {
    let movies = new Array;
    
    let scifiMovie1 = new Movie('http://localhost:8000/api/v1/titles/',0);
    movies.push(scifiMovie1);
    let scifiMovie2 = new Movie('http://localhost:8000/api/v1/titles/',1);
    movies.push(scifiMovie2);
    let scifiMovie3 = new Movie('http://localhost:8000/api/v1/titles/',2);
    movies.push(scifiMovie3);
    let scifiMovie4 = new Movie('http://localhost:8000/api/v1/titles/',3);
    movies.push(scifiMovie4);
    let scifiMovie5 = new Movie('http://localhost:8000/api/v1/titles/',4);
    movies.push(scifiMovie5);
    let scifiMovie6 = new Movie('http://localhost:8000/api/v1/titles/',5);
    movies.push(scifiMovie6);
    let scifiMovie7 = new Movie('http://localhost:8000/api/v1/titles/',6);
    movies.push(scifiMovie7);
    let scifiMovie8 = new Movie('http://localhost:8000/api/v1/titles/',7);
    movies.push(scifiMovie8);

    return movies
}
   

// Création des objects Mouvie dans des listes par catégorie
let categorieBestMovies = bestMoviesObject();
let categorieActionMovies = actionMoviesObject();
let categorieFantasyMovies = fantasyMoviesObject();
let categorieScifiMovies = scifiMoviesObject();


// Récupération des infos et incrémentation des objets par catégorie



movieRecuperationInfos(categorieBestMovies, '?sort_by=-imdb_score%2C-votes&page_size=12');
movieRecuperationInfos(categorieActionMovies, '?genre_contains=Action&sort_by=-imdb_score%2C-votes&page_size=12');
movieRecuperationInfos(categorieFantasyMovies,'?genre_contains=Fantasy&sort_by=-imdb_score%2C-votes&page_size=12' );
movieRecuperationInfos(categorieScifiMovies,'?genre_contains=Sci-Fi&sort_by=-imdb_score%2C-votes&page_size=12' )


setTimeout(() => {
    bestMovieHTML(categorieBestMovies[0]);
    bestMoviesHTML(categorieBestMovies);
    actionMoviesHTML(categorieActionMovies);
    fantasyMoviesHTML(categorieFantasyMovies);
    scifiMoviesHTML(categorieScifiMovies)
},1100);

const bestMovieButton = document.getElementById("best-movie--button");

bestMovieButton.addEventListener('click', function() {
    document.querySelector("#headerModal--title").innerHTML = categorieBestMovies[0].title + " - Note : " +categorieBestMovies[0].imdb_score +
    " - Duration : "+categorieBestMovies[0].duration+" min";
    img = document.getElementById("headerModal--img");
    img.setAttribute('src', categorieBestMovies[0].imageUrl);
    document.querySelector("#headerModal__genre").innerHTML = "Genre(s) : "+categorieBestMovies[0].genres;
    document.querySelector("#headerModal__date").innerHTML = "Published date : "+categorieBestMovies[0].date_published;
    document.querySelector("#headerModal__directors").innerHTML = "Realised by : "+categorieBestMovies[0].directors +" - Countries : "
    + categorieBestMovies[0].countries;
    document.querySelector("#headerModal__actors").innerHTML = "List of actors : "+categorieBestMovies[0].actors;

    document.querySelector("#contain__box-office").innerHTML = "Box Office Note : "+categorieBestMovies[0].avg_vote;
    document.querySelector("#contain__description").innerHTML = categorieBestMovies[0].description;
    document.querySelector("#contain__rated").innerHTML = "Rated : "+categorieBestMovies[0].rated;
})
