import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/pokme-response.interface';

@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;


  async executeSEED() {
    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=25')
    
    data.results.forEach(({ name, url }) => {

      const segments = url.split('/');
      const no = +segments[segments.length - 2]; // Extract the number from the URL

      console.log({ name, no });
      // Here you would typically save the pokemon to your database
      // For example:
      // await this.pokemonService.create({ name, no });

    });
    
    return data.results;

  }
}
