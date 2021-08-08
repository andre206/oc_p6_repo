

const bestMovie = async function() {

    let url = 'http://localhost:8000/api/v1/titles/'
    await fetch(url+'?sort_by=-imdb_score%2C-votes&page_size=12')
    
    .then(async function(res) {
        if (res.ok) {
            let data = await res.json()
            console.log(data)
            return data
        }
    })
    .then(async function(value) {
        document.querySelector("#best-movie__title").innerHTML = value.results[0].title;
        
        let bestMovieImg = document.createElement('img');
        bestMovieImg.src = value.results[0].image_url;
        bestMovieImg.alt = 'Best Movie Image';
        let bestMovieImgDiv = document.createElement('div');
        bestMovieImgDiv.setAttribute('id', 'best-movie__img');

        document.querySelector("#best-movie").appendChild(bestMovieImgDiv);
        document.querySelector("#best-movie__img").appendChild(bestMovieImg);

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
