const addMovieModel = document.getElementById("add-modal");

const startAddMoviButton = document.querySelector("header button");

const backdrop = document.getElementById("backdrop");

const canceladdMovieButton = addMovieModel.querySelector(".btn--passive");
const confirmAddMovieButton = canceladdMovieButton.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll("input");

const entryTextSection = document.getElementById("entry-text");

const deleterMovieModal = document.getElementById("delete-modal");



const movies = [];

const updateUi = ()=>{
    if(movies.length ===0){
        entryTextSection.style.display = "block";
    }else{
        entryTextSection.style.display = "none";
    }
};

const renderNewMovieElement = (id,title, imageUrl, rating) =>{
    const newMovieElement = document.createElement("li");
    newMovieElement.className = "movie-element";
    newMovieElement.innerHTML = `
    <div class="movie-element__image">
        <img src="${imageUrl}" alt"${title}">
         </div>
    <div class="movie-element__info">
     <h2>${title}</h2>
     <p>${rating} /5 notes</p>
     </div>
    `;

    newMovieElement.addEventListener("click", deleteMovieHandler.bind(null, id));
    const listRoot = document.getElementById("movie-list");
    listRoot.append(newMovieElement);
}


const deleteMovie = (movieId)=>{
    let movieIndex = 0;
for(const movie of movies){
    if(movie.id === movieId){
        break;
    }
    movieIndex++;
}
movies.splice(movieIndex, 1);
const listRoot = document.getElementById("movie-list");
listRoot.children[movieIndex].remove();
// listRoot.removeChild(listRoot.children[movieIndex]);
closeMovieDeletion();
}

const deleteMovieHandler =(movieId) =>{
    deleterMovieModal.classList.add("visible");
    toggleBackdrop();
   const cancelDeletionButton= deleterMovieModal.querySelector(".btn--passive");
  let confirmDeletionButton=   deleterMovieModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  
 confirmDeletionButton=   deleterMovieModal.querySelector(".btn--danger");

cancelDeletionButton.removeEventListener("click", closeMovieDeletion);
cancelDeletionButton.addEventListener("click", closeMovieDeletion);


confirmDeletionButton.addEventListener("click", deleteMovie.bind(null,movieId));
};


const closeMovieDeletion=()=>{
    toggleBackdrop();
    deleterMovieModal.classList.remove("visible");
};


const closeMovieModal = ()=> {
    addMovieModel.classList.remove("visible");
}

const toggleBackdrop = () => {
    backdrop.classList.toggle("visible");
};

const showMovieModal = ()=>{
    addMovieModel.classList.add("visible");
    toggleBackdrop();
};

const clearMovierInput =() => {
    for(const input of userInputs){
        input.value =  "";
    }
};

const cancelAddMovielHandler = ()=>{
    closeMovieModal();
    toggleBackdrop();
    clearMovierInput();
};


const addMovieHandler = ()=>{
    const titleValue = userInputs[0].value;
    const imageUrl = userInputs[1].value;
    const ratingValue = userInputs[2].value;
if(titleValue.trim() === "" || imageUrl.trim() === "" || ratingValue.trim() === "" || +ratingValue <1 || +ratingValue > 5){
    alert("Veillez remplir tous les champs");
    return;
}


const newMovie = {
    id: Math.random().toString,
    title: titleValue,
    image: imageUrl,
    rating: ratingValue,
};

movies.push(newMovie);
closeMovieModal();
toggleBackdrop();
clearMovierInput();

renderNewMovieElement(newMovie.id,newMovie.title, newMovie.image, newMovie.rating);
updateUi();

};

const backdropClickHandler = () => {
    closeMovieModal();
    closeMovieDeletion();
    clearMovierInput();
};


startAddMoviButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
canceladdMovieButton.addEventListener("click", cancelAddMovielHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);

