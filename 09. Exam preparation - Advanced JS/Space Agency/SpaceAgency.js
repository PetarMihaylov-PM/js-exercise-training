class SpaceAgency {
  constructor(agencyName, mission) {
    this.agencyName = agencyName;
    this.mission = mission;
    this.candidates = [];
  }

  acceptApplications(applications) {
    const addedNames = new Set();

    for (let application of applications) {
      const [name, education, flightHoursStr] = application.split('-');
      const flightHours = Number(flightHoursStr);

      const existingCandidate = this.candidates.find(c => c.name === name);

      if (existingCandidate) {
        if (existingCandidate.flightHours !== 'selected' && flightHours > existingCandidate.flightHours) {
          existingCandidate.flightHours = flightHours;
        }
      } else {
        this.candidates.push({ name, education, flightHours });
      }

      addedNames.add(name);
    }

    return `You successfully added candidates: ${[...addedNames].join(', ')}.`;
  }

  chooseForMission(candidateInfo) {
    const [name, minFlightHoursStr] = candidateInfo.split('-');
    const minFlightHours = Number(minFlightHoursStr);

    const candidate = this.candidates.find(c => c.name === name);

    if (!candidate) {
      throw new Error(`${name} is not in the candidates list!`);
    }

    if (candidate.flightHours === 'selected') {
      return `Congratulations, ${name} will participate in the ${this.mission} mission!`;
    }

    if (candidate.flightHours < minFlightHours) {
      throw new Error(
        `${name} does not have enough flight hours for the ${this.mission} mission, minimum required is ${minFlightHours} hours.`
      );
    }

    candidate.flightHours = 'selected';
    return `Congratulations, ${name} will participate in the ${this.mission} mission!`;
  }

  trainingBonus(name) {
    const candidate = this.candidates.find(c => c.name === name);

    if (!candidate) {
      throw new Error(`${name} is not in the candidates list!`);
    }

    let bonus = 80000;

    if (candidate.education === 'Pilot') {
      bonus = 100000;
    } else if (candidate.education === 'Engineer') {
      bonus = 120000;
    }

    return `${name} will be trained by ${this.agencyName} as part of the ${this.mission} mission with a training bonus of $${bonus.toLocaleString()}!`;
  }

  candidatesReport() {
    if (this.candidates.length === 0) {
      throw new Error("Candidate database is empty!");
    }

    const sorted = this.candidates.slice().sort((a, b) => a.name.localeCompare(b.name));

    const report = sorted.map(c => `${c.name}-${c.flightHours}`);
    return `Candidates list:\n${report.join('\n')}`;
  }
}
