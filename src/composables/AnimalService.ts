import animalsJson from '@/data/animals.json';
import type { AnimalModel } from '@/models';

async function getAnimals() {
  const animals = animalsJson.map((animal) => ({
    ...animal,
    birthDate: new Date(animal.birthDate),
  }));
  return animals as AnimalModel[];
}

export function useAnimalService() {
  return {
    getAnimals,
  };
}
