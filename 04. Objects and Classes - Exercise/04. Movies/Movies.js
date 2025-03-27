function solve (array) {
  let movies = [];

  array.forEach(movie => {
    if(movie.includes("addMovie")){
      let movieName = movie.slice(9).trim();
      movies.push({name: movieName});
    } else if(movie.includes('directedBy')){
      let [movieName, director] = movie.split(' directedBy ');
      let findMovie = movies.find(m => m.name === movieName);
      if(findMovie){
        findMovie.director = director;
      }
    } else if(movie.includes('onDate')){
      let [movieName, date] = movie.split(' onDate ');
      let findDate = movies.find(m => m.name === movieName);

      if(findDate){
        findDate.date = date;
      }
    }
  });
  movies.forEach(movie => {
    if(movie.name && movie.director && movie.date){
      console.log(JSON.stringify(movie));
    }
  });
}

solve([
  'addMovie The Avengers',
  'addMovie Superman',
  'The Avengers directedBy Anthony Russo',
  'The Avengers onDate 30.07.2010',
  'Captain America onDate 30.07.2010',
  'Captain America directedBy Joe Russo'
  ]  
  )