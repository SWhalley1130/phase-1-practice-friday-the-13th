document.addEventListener("DOMContentLoaded",init());

function init()
{
    return fetch('http://localhost:3000/movies')
    .then(res=>res.json())
    .then(movies=>
    {
        loadMovieInfo(movies[0]);
    })
}

function loadMovieInfo(movie)
{
    document.querySelector('#detail-image').src=movie.image;
    document.querySelector('#title').textContent=movie.title;
    document.querySelector('#year-released').textContent=movie.release_year;
    document.querySelector('#description').textContent=movie.description;
}