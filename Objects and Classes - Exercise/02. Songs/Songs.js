function solve (array) {
  class Song {
    constructor (typeList, name, time) {
      this.typeList = typeList;
      this.name = name;
      this.time = time;
    }
  }
  array.shift();
  let whatToDisplay = array.pop();
  let result = [];

  array.forEach(element => {
    [typeList, name, time] = element.split('_');
    const song = new Song(typeList, name, time);
    result.push(song);
  });

  if(whatToDisplay === 'all'){
    result.forEach(song => {
      console.log(song.name);
    });
  } else {
    result.forEach(song => {
      if(song.typeList === whatToDisplay){
        console.log(song.name);
      }
    });
  }
}


solve([3,
  'favourite_DownTown_3:14',
  'favourite_Kiss_4:16',
  'favourite_Smooth Criminal_4:01',
  'favourite']  
  );