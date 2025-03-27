function solve(heights) {
  const targetHeight = 30;
  const concretePerCrewPerDay = 195; // cubic yards per day per crew
  const concreteCostPerCubic = 1900; //  pesos per cubic yard
  const dailyConcreteUsed = [];

  while (heights.some(height => height < targetHeight)) {
      let concreteToday = 0;
    
      for (let i = 0; i < heights.length; i++) {
          if (heights[i] < targetHeight) {
              heights[i]++;
              concreteToday += concretePerCrewPerDay;
          }
      }
      dailyConcreteUsed.push(concreteToday);
  }
  const totalConcreteUsed = dailyConcreteUsed.reduce((sum, daily) => sum + daily, 0);

  const totalCost = totalConcreteUsed * concreteCostPerCubic;

  console.log(dailyConcreteUsed.join(", "));
  console.log(`${totalCost} pesos`);
}

solve([21, 25, 28]);