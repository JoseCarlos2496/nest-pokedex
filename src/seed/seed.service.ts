import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/pokme-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from '../common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter
  ) {}

  async executeSEED() {
    await this.pokemonModel.deleteMany({}); // Clear existing data

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    const insertPromisesArray = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2]; // Extract the number from the URL

      insertPromisesArray.push(
        this.pokemonModel.create({ name: name.toLocaleLowerCase().trim(), no })
      );
    });
    await Promise.all(insertPromisesArray);

    return 'Seed executed successfully';
  }

  async executeSEED_v2() {
    await this.pokemonModel.deleteMany({}); // Clear existing data

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650')
    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2]; // Extract the number from the URL

      pokemonToInsert.push({ name: name.toLocaleLowerCase().trim(), no });
    });
    await this.pokemonModel.insertMany(pokemonToInsert);
    //insert pokemons  (name, no) values
    // (name, no),
    // (name, no), ...

    return 'Seed executed successfully';
  }
}
