
const fs = require('fs');
const { start } = require('repl');
const {
  filterByQuery,
  findById,
  createNewAnimal,
  validateAnimal,
} = require("../lib/animals.js");
const{ animals } = require("../data/animals");

//ANIMAL OBJECT TEST
test("creates an animal object", () => {
  const animal = createNewAnimal(
    { name: "Joey", id: "lezzy"},
    animals
  );

  expect(animal.name).toBe("Joey");
  expect(animal.id).toBe("lezzy");
});


//FILTER BY QUERY TEST
test("filters by query", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"],
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"], 
    },
  ];

  const updatedAnimals = filterByQuery({ species: "gorilla"}, startingAnimals);

  expect(updatedAnimals.length).toEqual(1);
});


//FIND BY ID TEST
test("finds by id", () => {
  const startingAnimals = [
    {
      id: "3",
      name: "Erica",
      species: "gorilla",
      diet: "omnivore",
      personalityTraits: ["quirky", "rash"], 
    },
    {
      id: "4",
      name: "Noel",
      species: "bear",
      diet: "carnivore",
      personalityTraits: ["impish", "sassy", "brave"],  
    },
  ];

  const result = findById("3", startingAnimals);

  expect(result.name).toBe("Erica")
});

//VALIDATE PERSONALITY TRAITS TEST
test("validates personality traits", () => {
  const animal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
    personalityTraits: ["quirky", "rash"],
  };

  const invalidAnimal = {
    id: "3",
    name: "Erica",
    species: "gorilla",
    diet: "omnivore",
  };

  const result = validateAnimal(animal);
  const result2 = validateAnimal(invalidAnimal);

  expect(result).toBe(true);
  expect(result2).toBe(false);
})

