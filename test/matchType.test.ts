import { Discrim, useMakeMatchDiscrim } from "../src";

class Cat implements Discrim {
  __kind = "Cat" as const;
  constructor(public nameCat: string) {}
}

class Dog implements Discrim {
  __kind = "Dog" as const;
  constructor(public nameDog: string) {}
}

const dog = new Dog("Rex") as Dog | Cat;

const matchAnimal = useMakeMatchDiscrim(dog);

const resMatchAnimal = matchAnimal({
  Dog: (value) => {
    return 3;
  },
  Cat: (value) => {
    return value.nameCat;
  },
});
