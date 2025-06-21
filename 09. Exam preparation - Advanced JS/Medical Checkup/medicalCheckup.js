const medicalCheckup = {
    scheduleAppointment(patientsCount, costPerPatient, clinicLocation) {
        if (typeof patientsCount !== 'number' || typeof costPerPatient !== 'number' || typeof clinicLocation !== 'string' || clinicLocation.trim() === '') {
            throw new Error("Invalid Information!");
        }

        if (clinicLocation === "Sofia") {
            if (patientsCount >= 30 && costPerPatient <= 50) {
                return `This clinic meets the requirements, with capacity for ${patientsCount} patients at ${costPerPatient}$ per checkup.`;
            } else {
                return `This clinic does not meet your requirements!`;
            }
        } else {
            throw new Error(`The location of this clinic is not in the correct city!`);
        }
    },

    additionalServices(labTests, consultations, hasInsurance) {
        if (!Array.isArray(labTests) || !Array.isArray(consultations) || typeof hasInsurance !== "boolean") {
            throw new Error("Invalid Information!");
        }

        let totalCost = 0;

        labTests.forEach(test => {
            if (test === "blood") totalCost += 20;
            else if (test === "urine") totalCost += 15;
        });

        consultations.forEach(type => {
            if (type === "general") totalCost += 100;
            else if (type === "specialist") totalCost += 200;
        });

        if (hasInsurance) {
            totalCost *= 0.80;
            return `You spend ${totalCost}$ for lab tests and consultations with 20% insurance discount!`;
        } else {
            return `You spend ${totalCost}$ for lab tests and consultations!`;
        }
    },

    roomDistribution(patients, rooms) {
        if (typeof patients !== "number" || patients <= 0 || typeof rooms !== "number" || rooms <= 0) {
            throw new Error("Invalid Information!");
        }

        let patientsPerRoom = Math.round(patients / rooms);

        if (patientsPerRoom < 4) {
            return `There is only ${patientsPerRoom} patient in every room, consider rearranging.`;
        } else {
            return `You have ${rooms} rooms with ${patientsPerRoom} patients in each room.`;
        }
    }
};

module.exports = medicalCheckup;
