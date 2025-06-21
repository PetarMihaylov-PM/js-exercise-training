import { expect } from 'mocha';
import "./medicalCheckup.js";

describe("medicalCheckup Tests", function () {
    describe("scheduleAppointment()", function () {
        it("should throw error for invalid input types", function () {
            expect(() => medicalCheckup.scheduleAppointment("30", 40, "Sofia")).to.throw("Invalid Information!");
            expect(() => medicalCheckup.scheduleAppointment(30, "40", "Sofia")).to.throw("Invalid Information!");
            expect(() => medicalCheckup.scheduleAppointment(30, 40, "")).to.throw("Invalid Information!");
        });

        it("should throw error for wrong location", function () {
            expect(() => medicalCheckup.scheduleAppointment(30, 40, "Plovdiv")).to.throw("The location of this clinic is not in the correct city!");
        });

        it("should return correct message if requirements are met", function () {
            const result = medicalCheckup.scheduleAppointment(35, 45, "Sofia");
            expect(result).to.equal("This clinic meets the requirements, with capacity for 35 patients at 45$ per checkup.");
        });

        it("should return not meeting requirements message", function () {
            const result = medicalCheckup.scheduleAppointment(20, 55, "Sofia");
            expect(result).to.equal("This clinic does not meet your requirements!");
        });
    });

    describe("additionalServices()", function () {
        it("should throw error for invalid input types", function () {
            expect(() => medicalCheckup.additionalServices("blood", ["general"], true)).to.throw("Invalid Information!");
            expect(() => medicalCheckup.additionalServices(["blood"], "general", true)).to.throw("Invalid Information!");
            expect(() => medicalCheckup.additionalServices(["blood"], ["general"], "yes")).to.throw("Invalid Information!");
        });

        it("should calculate correct cost without insurance", function () {
            const result = medicalCheckup.additionalServices(["blood", "urine"], ["general", "specialist"], false);
            expect(result).to.equal("You spend 335$ for lab tests and consultations!");
        });

        it("should apply 20% discount with insurance", function () {
            const result = medicalCheckup.additionalServices(["blood"], ["specialist"], true);
            expect(result).to.equal("You spend 176$ for lab tests and consultations with 20% insurance discount!");
        });

        it("should return 0 cost if no services are selected", function () {
            const result = medicalCheckup.additionalServices([], [], false);
            expect(result).to.equal("You spend 0$ for lab tests and consultations!");
        });
    });

    describe("roomDistribution()", function () {
        it("should throw error for invalid input", function () {
            expect(() => medicalCheckup.roomDistribution("10", 2)).to.throw("Invalid Information!");
            expect(() => medicalCheckup.roomDistribution(10, "2")).to.throw("Invalid Information!");
            expect(() => medicalCheckup.roomDistribution(-5, 2)).to.throw("Invalid Information!");
            expect(() => medicalCheckup.roomDistribution(10, 0)).to.throw("Invalid Information!");
        });

        it("should suggest rearrangement if patients per room < 4", function () {
            const result = medicalCheckup.roomDistribution(5, 2);
            expect(result).to.equal("There is only 3 patient in every room, consider rearranging.");
        });

        it("should report correct room distribution if >= 4 patients per room", function () {
            const result = medicalCheckup.roomDistribution(20, 4);
            expect(result).to.equal("You have 4 rooms with 5 patients in each room.");
        });
    });
});

