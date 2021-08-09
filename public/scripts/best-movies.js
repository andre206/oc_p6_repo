
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
        //<img src="" alt="Best Movie 1"width=60% height=60%/>
    })
}
document.addEventListener('DOMContentLoaded', function() {  
    let categorieBestMovies = new Array;
    
    let bestMovie1 = new Movie('http://localhost:8000/api/v1/titles/',0);
    categorieBestMovies.push(bestMovie1);
    let bestMovie2 = new Movie('http://localhost:8000/api/v1/titles/',1);
    categorieBestMovies.push(bestMovie2);
    let bestMovie3 = new Movie('http://localhost:8000/api/v1/titles/',2);
    categorieBestMovies.push(bestMovie3);
    let bestMovie4 = new Movie('http://localhost:8000/api/v1/titles/',3);
    categorieBestMovies.push(bestMovie4);
    let bestMovie5 = new Movie('http://localhost:8000/api/v1/titles/',4);
    categorieBestMovies.push(bestMovie5);
    let bestMovie6 = new Movie('http://localhost:8000/api/v1/titles/',5);
    categorieBestMovies.push(bestMovie6);
    let bestMovie7 = new Movie('http://localhost:8000/api/v1/titles/',6);
    categorieBestMovies.push(bestMovie7);
    let bestMovie8 = new Movie('http://localhost:8000/api/v1/titles/',7);
    categorieBestMovies.push(bestMovie8);
    
    movieRecuperationInfos(categorieBestMovies, '?sort_by=-imdb_score%2C-votes&page_size=12');
    
    setTimeout(() => {
        bestMovieHTML(categorieBestMovies[0])
    },300);
    
    setTimeout(() => {
        bestMoviesHTML(categorieBestMovies)
    },500)

    

})