import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Search from '../components/Search';

import '../stylesheets/App.css';

const COLORS: {[index: string]: string} = {
    'normal': '#A8A978',
    'fire': '#F0802F',
    'water': '#688FF0',
    'grass': '#78C850',
    'electric': '#F8D02F',
    'ice': '#98D8D8',
    'fighting': '#B63C35',
    'poison': '#A040A1',
    'ground': '#E0C068',
    'flying': '#A890F0',
    'psychic': '#F85888',
    'bug': '#A8B820',
    'rock': '#B9A038',
    'ghost': '#705899',
    'dark': '#705848',
    'dragon': '#7038F8',
    'steel': '#B8B8D0',
    'fairy': '#F3D3D5'
    }


function Pokemon(props: any) {

    const [pokemon, setPokemon] = useState<null | any>(null);
    const [error, setError] = useState('');

    let { id } = useParams();
    let name = id?.toLocaleLowerCase()
    console.log('>>>>id: ', id)
    console.log(">>>path:", `http://localhost:3000/pokemons/name?name=${name}`)

    useEffect(() => {
        async function fetchPokemon () {
        try {
          const { data } = await axios.get(`http://localhost:3000/pokemons/name?name=${name}`,
            {
            headers: ({
                "Access-Control-Allow-Origin": "*"
            })
            })
            if (data){
                console.log(data)
              setPokemon(data);
              setError(''); 
            }
        }
            catch(e){
              props.messageError('This pokemon does not exist');
              setError('This pokemon does not exist');
              setPokemon(null);
            }
        }
        fetchPokemon();       
    }, [name])

    console.log(">>>> pokemon :", pokemon)

    if (pokemon){
    return (

        <div className='background'>
            <div className='homepage'>
                <div className='head'>
                <h1>
                    Pokedex
                </h1>
                </div>

                <Search />
                <div className='flex-container'>
                    <div className='pokemon-main-info'>
                        <p className='pokemon-id'>
                            #{pokemon.id}
                        </p>
                        <h2>
                            { pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)} 
                        </h2>
                        
                        {pokemon.type.length === 1 
                        ?
                            <div className='type' >
                                <p style={{padding: '5px'}}>Type: </p>        
                                <p style={{backgroundColor: COLORS[pokemon.type[0].type.name], padding: '5px', borderRadius: '10px', border: 'solid black 2px' }}>
                                    {pokemon.type[0].type.name.charAt(0).toUpperCase() + pokemon.type[0].type.name.slice(1)}
                                </p>
                            </div>
                        : 
                            <div className='type' >
                                <p style={{padding: '5px'}}> Types: </p>
                                <p style={{backgroundColor: COLORS[pokemon.type[0].type.name], padding: '5px', borderRadius: '10px', border: 'solid black 2px' }}>
                                    {pokemon.type[0].type.name.charAt(0).toUpperCase() + pokemon.type[0].type.name.slice(1)}
                                </p>
                                <p style={{backgroundColor: COLORS[pokemon.type[1].type.name], padding: '5px', borderRadius: '10px', border: 'solid black 2px' }}>
                                    {pokemon.type[1].type.name.charAt(0).toUpperCase() + pokemon.type[1].type.name.slice(1)}
                                </p>
                            </div>
                        } 

                        <div className='pokemon-desc'>
                            <div className='desc'>
                                <h5> Height</h5>
                                <p>{pokemon.height}m</p>
                            </div>
                            <div className='desc'>
                                <h5> Weight</h5>
                                <p>{pokemon.weight}kg</p>
                            </div>
                            <div className='desc'>
                                <h5> Abilities</h5>
                                <p>{pokemon.abilities[0].ability.name}</p>
                                <p>{pokemon.abilities[1].ability.name}</p>
                            </div>
                        </div> 
                    </div>
                    <div className='pokemon-img'>
                        <img src={pokemon.img} alt={pokemon.name}/>
                    </div>       
                </div>

                <div className='buttons'>
                    <Link to={'/'} style={{textDecoration:'none'}}>
                        <button 
                            onClick={() => {
                                setPokemon(null);
                                }}
                            >
                            Back to Pokedex
                        </button>
                    </Link>
                </div>  
            </div>
        </div>)
    } else {
        return (

        <div className='background'>
            <div className='homepage'>
                <div className='head'>
                <h1>
                    Pokedex
                </h1>
                </div>
                
                <Search />
                
                {error.length!==0 && <p className='error' >{error}</p>}

                <div className='buttons'>
                    <Link to={'/'} style={{textDecoration:'none'}}>
                        <button 
                            onClick={() => {
                                setPokemon(null);
                                }}
                            >
                            Back to Pokedex
                        </button>
                    </Link>
                </div>  
            </div>
        </div>
        )
    }
  }

function mapDispatchToProps(dispatch: any) {
 return {
   messageError: function(message: string) {
       dispatch({type: 'messageError', message: message})
   }
 }
}
export default connect(null, mapDispatchToProps)(Pokemon);


