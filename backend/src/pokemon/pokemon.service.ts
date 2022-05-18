import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { AxiosResponse } from 'axios';
import { lastValueFrom, Observable } from 'rxjs';

@Injectable()
export class PokemonService {
  constructor(
    private readonly httpService: HttpService
  ) {} 

// Get all pokemons name and url 
  private async _getPokemonsList(limit: number, offset: number): Promise<AxiosResponse<PokemonsList>> {
    return lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`));
  }
  
  private async _getRessource(url: string): Promise<AxiosResponse<any>> {
    return lastValueFrom(this.httpService.get(url));
  }
  
// Get pokemon by id or name
  async getPokemons(limit?: number, offset?: number) {
    const apiResponse = await this._getPokemonsList(limit, offset);
    const pokemons = apiResponse.data.results;

    const nodes = await Promise.all(pokemons.map(async ({ url }) => {
      
      const { data } = await this._getRessource(url);

      return {
        id: data.id,
        name: data.name,
        type: data.types,
        img: data.sprites.front_default,
      }
    }
    ))

    return {
      totalCount: apiResponse.data.count,
      nodes
    };
  }

//   async getPokemon(name?: string): Promise<AxiosResponse<Pokemon>> {
//       const response = lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`));
//       const { data } = await response
//       console.log(data.id)
//     //   return ( data )
//       return {
//         id: data.id,
//         name: data.name,
//         height: data.height,
//         weight: data.weight,
//         type: data.types,
//         img: data.sprites.front_default,
//         }
//   }

// }

// Get info on one pokemon by name
  private async _getPokemonByName(name: string): Promise<AxiosResponse<any>> {
    return lastValueFrom(this.httpService.get(`https://pokeapi.co/api/v2/pokemon/${name}`))

  }
  
  async getPokemon(name?: string) {
    const { data } = await this._getPokemonByName(name);
    console.log(data)
    return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        type: data.types,
        img: data.sprites.front_default,
        abilities: data.abilities,
        stats: data.stats
        }
  }
}

type PokemonsList = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
}

type Pokemon = {
  id: number,
  name: string,
  height: number,
  weight: number,
  type: any,
  img: string,
}


