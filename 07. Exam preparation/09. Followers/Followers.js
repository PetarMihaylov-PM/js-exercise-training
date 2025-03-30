function solve(array) {
  let command = array.shift();

  let followers = {};

  while(command !== 'Log out'){

    let [instruction, username, count] = command.split(': ');
    count = Number(count);
    
    if(command.includes('New follower')){
      
      if(!followers[username]){
        followers[username] = {
          likes: 0,
          comments: 0
        }
      }
    }

    if(command.includes('Like')){

      if(!followers[username]){
        followers[username] = {
          likes: count,
          comments: 0
        }
      } else {
        followers[username].likes += count;
      }
    }

    if(command.includes('Comment')){
      if(!followers[username]){
        followers[username] = {
          likes: 0,
          comments: 1
        }
      } else {
        followers[username].comments += 1;
      }
    }

    if(command.includes('Blocked')){
      if(!followers[username]){
        console.log(`${username} doesn't exist.`);
      } else {
        delete followers[username];
      }
    }
    command = array.shift();
  }

  let countFollowers = 0;

  for (let follower in followers) {
    countFollowers++;
  }
  console.log(`${countFollowers} followers`);

  for (let [username, values] of Object.entries(followers)){
    let props = Object.values(values);
    let sum = props.reduce((sum, num) => sum + num)
    console.log(`${username}: ${sum}`);
  }
}

solve((["Blocked: Amy",
  "Comment: Amy",
  "New follower: Amy",
  "Like: Tom: 5",
  "Like: Ellie: 5",
  "Log out"])  
  );