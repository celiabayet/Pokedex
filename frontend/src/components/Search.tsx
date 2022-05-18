import React, {useEffect, useState} from 'react';
import axios from 'axios';
import '../stylesheets/App.css';
import { Link } from 'react-router-dom';


function Search(props:any) {
    const [pokemonName, setPokemonName] = useState('');
    // const [pokemonChild, setPokemonChild] = useState<null | any>(null);
    
    // Search pokemon
    // const searchPokemon = (name: string) => {
    //     props.pokemon(name)  
    // }
    
  return (
      <div className='search'>
          <input 
            type="search" 
            placeholder="ex : pikachu" 
            value={pokemonName}
            className='search-input' 
            onChange={(e) => setPokemonName(e.target.value.toLowerCase())}
            />
          <Link 
            to={`/${pokemonName}`}
            style={{textDecoration: 'none'}} >
            <button 
              type="submit" 
              onClick={()=> { setPokemonName('')}}
              className='search-button'>
                Search
            </button>
          </Link> 
        </div>

    )
  }
   

export default Search;
