

const bestMovie = async function() {

    let url = 'http://localhost:8000/api/v1/titles/'
    await fetch(url+'?year=&min_year=&max_year=&imdb_score=&imdb_score_min=&imdb_score_max=&title=&title_contains=&genre=&genre_contains=&sort_by=-imdb_score%2C-votes&director=&director_contains=&writer=&writer_contains=&actor=&actor_contains=&country=&country_contains=&lang=&lang_contains=&company=&company_contains=&rating=&rating_contains=')
    
    .then(async function(res) {
        if (res.ok) {
            let data = await res.json()
            return data
        }
    })
    .then(async function(value) {
        document.querySelector("#best-movie__title").innerHTML = value.results[0].title;

        let bestMovieImg = document.createElement('img');
        bestMovieImg.src = value.results[0].image_url;
        bestMovieImg.alt = 'Best Movie Image';
        document.querySelector("#best-movie").appendChild(bestMovieImg);

        let idBestMovie = value.results[0].id;

        await fetch(url+idBestMovie)
        .then(async function(res) {
            if (res.ok) {
                let data = await res.json();
                document.querySelector("#best-movie__description").innerHTML = data.long_description;
            }
        })
        .catch(function(err) {
            console.log('erreur')
            // Une erreur est survenue
        })

    })
    .catch(function(err) {
        console.log('erreur')
        // Une erreur est survenue
    })
}

document.addEventListener('DOMContentLoaded', function() {
    bestMovie()
})
