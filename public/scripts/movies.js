class Movie {
    /**
     * 
     * @param {string} url API url. By default : http://localhost:8000/api/v1/titles/
     * @param {number} index Index du résultat qui nous intéresse (de 0 à 6 pour les 7 premiers films)
     */
    constructor(index,url='http://localhost:8000/api/v1/titles/'){
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
 * @param {string} categoriesSearch reserch for the GET API - just page_size=8 by default
 */
const movieRecuperationInfos = async function(listMovieObject, categoriesSearch='?page_size=8') {
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

/**
 * 
 * @param {Array} listMovieObject List of movie object
 * @param {string} categorie 
 */
const movieHTML = function(listMovieObject, categorie) {
    if (categorie === "best-movie"){
        let movie = listMovieObject[0]
        let bestMovieImg = document.createElement('img');
        bestMovieImg.alt = 'Best Movie Image';
        bestMovieImg.src = movie.imageUrl;
        let bestMovieImgDiv = document.createElement('div');
        bestMovieImgDiv.setAttribute('id', 'best-movie__img');
        document.querySelector("#best-movie").appendChild(bestMovieImgDiv);
        document.querySelector("#best-movie__img").appendChild(bestMovieImg);
        document.querySelector("#best-movie__title").innerHTML = movie.title
        document.querySelector("#best-movie__description").innerHTML = movie.description;
        document.getElementById(categorie + "--button").addEventListener('click', function(){
            modalWindowFilling(movie)
            document.getElementById("modal__button").addEventListener('click', function(){
                document.getElementById("modal-button").href="#" + categorie;
            })
        })
    }else{
        listMovieObject.forEach((movie, index) =>{
            let img = document.createElement('img');
            img.alt = categorie + "movie image "+(index+1);
            img.src = movie.imageUrl;
            document.querySelector("#" + categorie + "__img"+(index+1)).appendChild(img);
            document.querySelector("#" + categorie + "__title"+(index+1)).innerHTML = movie.title
            
            document.getElementById(categorie + "--button"+(index+1)).addEventListener('click', function(){
                modalWindowFilling(movie)
                document.getElementById("modal__button").addEventListener('click', function(){
                    document.getElementById("modal-button").href="#" + categorie;
                })
            })
            
            
        })
    }
}

/**
 * 
 * @param {Movie} movie 
 */
const modalWindowFilling = function(movie){
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
}

/**
 * 
 * @returns {Array} list of movies object
 */
const listMoviesObject = function() {
    let movies = new Array;
    for(let i=0; i<8; i++){
        movies.push(new Movie(i));
    }
    return movies
}

// Create Movies object in movie array by category
let categorieBestMovies = listMoviesObject();
let categorieActionMovies = listMoviesObject();
let categorieFantasyMovies = listMoviesObject();
let categorieScifiMovies = listMoviesObject();

// Recuperation of movies informations by GET to the API
movieRecuperationInfos(categorieBestMovies, '?sort_by=-imdb_score%2C-votes&page_size=8');
movieRecuperationInfos(categorieActionMovies, '?genre_contains=Action&sort_by=-imdb_score%2C-votes&page_size=8');
movieRecuperationInfos(categorieFantasyMovies,'?genre_contains=Fantasy&sort_by=-imdb_score%2C-votes&page_size=8' );
movieRecuperationInfos(categorieScifiMovies,'?genre_contains=Sci-Fi&sort_by=-imdb_score%2C-votes&page_size=8' )

// Completion of information on the website
setTimeout(() => {
    movieHTML(categorieBestMovies, "best-movie");
    movieHTML(categorieBestMovies, "best-movies");
    movieHTML(categorieActionMovies, "action");
    movieHTML(categorieFantasyMovies, "fantasy");
    movieHTML(categorieScifiMovies, "sci-fi")
},1100);
