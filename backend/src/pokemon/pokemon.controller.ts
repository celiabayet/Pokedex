import { Controller, Get, NotFoundException, Query, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemons')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}
  
  @Get()
  getPokemons(
    @Query('limit') limit?: number,
    @Query('offset') offset?: number,
    ) {
    const pokemons = this.pokemonService.getPokemons(limit, offset);

    return pokemons;
    }

  @Get('/name')
  getPokemon(
      @Query('name') name?: string,
    ) {
    const pokemon = this.pokemonService.getPokemon(name);

    if (!pokemon) {
      throw new NotFoundException();
    }

    return pokemon;
    
  }
}
