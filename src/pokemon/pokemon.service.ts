import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase().trim();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll() {
    return await this.pokemonModel.find();
  }

  async findOne(term: string) {
    
    let pokemon : Pokemon | null = null;

    // No
    if (!isNaN(+term)) 
      pokemon = await this.pokemonModel.findOne({ no: term });

    // MongoID
    if (!pokemon && isValidObjectId(term)) 
      pokemon = await this.pokemonModel.findById(term);

    // Name
    if (!pokemon) 
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() });

    if (!pokemon) 
      throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term); // Ensure the pokemon exists
    
    if (updatePokemonDto.name) 
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase().trim();
    
    try {
      await pokemon.updateOne( updatePokemonDto, { new: true } );
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    // const pokemon = await this.findOne(id); // Ensure the pokemon exists
    // await pokemon.deleteOne();
    // return { id };
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount} = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) 
      throw new NotFoundException(`Pokemon with id "${id}" not found`);

    return;
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) // Duplicate key error
      throw new BadRequestException(`Pokemon already exists ${JSON.stringify(error.keyValue)}`);

    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);// Re-throw other errors
  }
}
