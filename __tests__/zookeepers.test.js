const fs = require('fs');

const {
  filterByQuery,
  findById,
  createNewZookeeper,
  validateZookeeper,
} = require("../lib/zookeepers.js");

const { zookeepers } = require("../data/zookeepers");


jest.mock('fs');




//zookeeper object test
test("creates a zookeeper object", () => {
  const zookeeper = createNewZookeeper (
    {
    name: 'chip',
    id: 'lezzy',
    },
    zookeepers
  
  );
  expect(zookeeper.name).toBe('chip');
  expect(zookeeper.id).toBe('lezzy');
});



//filter by query test
test("filters zookeepers by query", () => {
  const startingZookeepers = [
      {
      id: "2",
      name: "Raksha",
      age: 31,
      favoriteAnimal: "penguin"
      },

      {
      id: "3",
      name: "Isabella",
      age: 67,
      favoriteAnimal: "bear"
      },
  ];
  const updatedZookeepers = filterByQuery({ age: 31 }, startingZookeepers);

  expect(updatedZookeepers.length).toEqual(1);
});

//find by id test
test("finds zookeeper by id", () => {
  const startingZookeepers = [
    {
    id: "3",
    name: "Linda",
    age: 48,
    favoriteAnimal: "otter"
    },

    {
    id: "4",
    name: "Ryan",
    age: 20,
    favoriteAnimal: "dog"
    },
  ];
  const result = findById("3", startingZookeepers );

  expect (result.name).toBe("Linda");
});

//VALIDATE ZOOKEEPER TEST
test("validates age", () => {
  const zookeeper = {
    id: "2",
    name: "Raksha",
    age: 31,
    favoriteAnimal: "penguin",
  };

  const invalidZookeeper = {
    id: "3",
    name: "Isabella",
    age: "67",
    favoriteAnimal: "bear",
  };

  const result = validateZookeeper(zookeeper);
  const result2 = validateZookeeper(invalidZookeeper);

  expect(result).toBe(true);
  expect(result2).toBe(false);
});
