document.addEventListener("DOMContentLoaded",init());

let globalMovie;


/////////////////////////////////
// LOADS MOVIE DATA AT TOP AND
// LOADS INFO FOR FIRST MOVIE
///////////////////////////////

function init()
{
    return fetch('http://localhost:3000/movies')
    .then(res=>res.json())
    .then(movies=>
    {
        loadMovieInfo(movies[0]);
        movies.forEach(movie=>
        {
            const img=document.createElement('img');
            img.src=movie.image;
            img.addEventListener('click',e=>loadMovieInfo(movie));
            document.querySelector("#movie-list").append(img);
        })
        ///////////////////////////////////////////////
        // TOGGLES UN/WATCHED AND SENDS PATCH REQUEST
        //////////////////////////////////////////////
        document.querySelector('#watched').addEventListener('click',e=>
        {
            globalMovie.watched=!(globalMovie.watched)
            patchWatched(globalMovie);
        })
        //////////////////////////////////////////////
        // WHEN SUBMIT IS CILCKED, SEND PATCH REQUEST
        /////////////////////////////////////////////
        document.querySelector('#blood-form').addEventListener('submit',e=>
        {
            e.preventDefault();
            patchDropsBlood(globalMovie);
        })
    })
}

//////////////////////////////////////
// LOADS INDIVIDUAL MOVIE INFORMATION
/////////////////////////////////////

function loadMovieInfo(movie)
{
    globalMovie=movie;
    document.querySelector('#detail-image').src=movie.image;
    document.querySelector('#title').textContent=movie.title;
    document.querySelector('#year-released').textContent=movie.release_year;
    document.querySelector('#description').textContent=movie.description;
    document.querySelector('#watched').textContent=movie.watched?"Watched":"UnWatched";
    document.querySelector('#amount').textContent=movie.blood_amount;
}

/////////////////////////////////////////
// PATCHES UN/WATCHED TOGGLE FROM CLICK
////////////////////////////////////////

function patchWatched(movie)
{
    return fetch(`http://localhost:3000/movies/${movie.id}`,
    {
        method:'PATCH',
        headers:
        {
            'Content-Type':'application/json',
            'Accepts':'application/json'
        },
        body:JSON.stringify(movie)
    })
    .then(res=>res.json())
    .then(newMovieData=>document.querySelector('#watched').textContent=newMovieData.watched?"Watched":"UnWatched");
}

/////////////////////////////////////////
// PATCHES DROPS OF BLOOD FROM SUBMIT
////////////////////////////////////////

function patchDropsBlood(movie)
{
    movie.blood_amount=movie.blood_amount+parseInt(document.querySelector('#blood-amount').value);
    return fetch(`http://localhost:3000/movies/${movie.id}`,
    {
        method:'PATCH',
        headers:
        {
            'Content-Type':'application/json',
            'Accepts':'application/json'
        },
        body:JSON.stringify(movie)
    })
    .then(res=>res.json())
    .then(newMovieData=>document.querySelector('#amount').textContent=newMovieData.blood_amount);
}