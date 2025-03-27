function solve(input) {
  let n = Number(input.shift());
  let plants = {};

  for (let i = 0; i < n; i++) {
      let [plant, rarity] = input[i].split("<->");
      plants[plant] = {
          rarity: Number(rarity),
          ratings: []
      };
  }


  for (let i = n; i < input.length; i++) {
      let command = input[i];
      if (command === "Exhibition") break;

      let [action, details] = command.split(": ");
      let [plant, value] = details.split(" - ");

      if (!plants[plant]) {
          console.log("error");
          continue;
      }

      if (action === "Rate") {
          plants[plant].ratings.push(Number(value));
      } else if (action === "Update") {
          plants[plant].rarity = Number(value);
      } else if (action === "Reset") {
          plants[plant].ratings = [];
      }
  }

  
  console.log("Plants for the exhibition:");
  for (let [plant, data] of Object.entries(plants)) {
      let avgRating = data.ratings.length
          ? (data.ratings.reduce((a, b) => a + b, 0) / data.ratings.length).toFixed(2)
          : "0.00";

      console.log(`- ${plant}; Rarity: ${data.rarity}; Rating: ${avgRating}`);
  }
}

solve(["2",
  "Candelabra<->10",
  "Oahu<->10",
  "Rate: Oahu - 7",
  "Rate: Candelabra - 6",
  "Exhibition"]
  )