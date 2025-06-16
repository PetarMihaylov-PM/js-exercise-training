import { expect } from "chai";
import foodDelivery from './food_delivery.js';

describe("foodDelivery Tests", function () {
  describe("getCategory()", function () {
    it("should return correct description for 'Vegan'", () => {
      expect(foodDelivery.getCategory("Vegan")).to.equal(
        "Dishes that contain no animal products."
      );
    });

    it("should return correct description for 'Vegetarian'", () => {
      expect(foodDelivery.getCategory("Vegetarian")).to.equal(
        "Dishes that contain no meat or fish."
      );
    });

    it("should return correct description for 'Gluten-Free'", () => {
      expect(foodDelivery.getCategory("Gluten-Free")).to.equal(
        "Dishes that contain no gluten."
      );
    });

    it("should return correct description for 'All'", () => {
      expect(foodDelivery.getCategory("All")).to.equal("All available dishes.");
    });

    it("should throw error for invalid category", () => {
      expect(() => foodDelivery.getCategory("Carnivore")).to.throw(
        "Invalid Category!"
      );
    });
  });

  describe("addMenuItem()", function () {
    const menu = [
      { name: "Salad", price: 5 },
      { name: "Burger", price: 10 },
      { name: "Soup", price: 4 },
    ];

    it("should add only items with price <= maxPrice", () => {
      expect(foodDelivery.addMenuItem(menu, 5)).to.equal(
        "There are 2 available menu items matching your criteria!"
      );
    });

    it("should return 0 when no items match", () => {
      expect(
        foodDelivery.addMenuItem([{ name: "Steak", price: 20 }], 5)
      ).to.equal("There are 0 available menu items matching your criteria!");
    });

    it("should throw error for invalid menuItem (not array)", () => {
      expect(() => foodDelivery.addMenuItem("not-array", 10)).to.throw(
        "Invalid Information!"
      );
    });

    it("should throw error for invalid maxPrice (not number)", () => {
      expect(() => foodDelivery.addMenuItem(menu, "cheap")).to.throw(
        "Invalid Information!"
      );
    });

    it("should throw error for empty menu or low maxPrice", () => {
      expect(() => foodDelivery.addMenuItem([], 10)).to.throw(
        "Invalid Information!"
      );
      expect(() => foodDelivery.addMenuItem(menu, 4)).to.throw(
        "Invalid Information!"
      );
    });
  });

  describe("calculateOrderCost()", function () {
    it("should calculate without discount", () => {
      const result = foodDelivery.calculateOrderCost(
        ["standard", "express"],
        ["sauce", "beverage"],
        false
      );
      expect(result).to.equal(
        "You spend $12.50 for shipping and addons!"
      );
    });

    it("should calculate with discount", () => {
      const result = foodDelivery.calculateOrderCost(
        ["standard", "express"],
        ["sauce", "beverage"],
        true
      );
      expect(result).to.equal(
        "You spend $10.63 for shipping and addons with a 15% discount!"
      );
    });

    it("should throw for invalid types", () => {
      expect(() =>
        foodDelivery.calculateOrderCost("standard", [], true)
      ).to.throw("Invalid Information!");
      expect(() =>
        foodDelivery.calculateOrderCost([], {}, true)
      ).to.throw("Invalid Information!");
      expect(() =>
        foodDelivery.calculateOrderCost([], [], "yes")
      ).to.throw("Invalid Information!");
    });
  });
});