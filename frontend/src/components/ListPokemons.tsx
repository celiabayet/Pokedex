import React from 'react';
import { Link } from 'react-router-dom';

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

function Pokemons(props:any) {
 
  return (
    <Link 
      to={`/${props.name}`} 
      className='pokemon-card' 
      style={{ textDecoration: 'none', color:'black' }} >
        <div className='pokemon-main-info'>
          <p className='pokemon-id'>
            #{props.id}
          </p>
          <h2>
            { props.name.charAt(0).toUpperCase() + props.name.slice(1)} 
          </h2>
        
          {props.type.length === 1 
            ?
            <div className='type' >
                    <p style={{padding: '5px'}}>Type: </p>        
                    <p style={{backgroundColor: COLORS[props.type[0].type.name], padding: '5px', borderRadius: '10px', border: 'solid black 2px' }}>
                        {props.type[0].type.name.charAt(0).toUpperCase() + props.type[0].type.name.slice(1)}
                    </p>
                </div>
            : 
                <div className='type' >
                    <p style={{padding: '5px'}}> Types: </p>
                    <p style={{backgroundColor: COLORS[props.type[0].type.name], padding: '5px', borderRadius: '10px', border: 'solid black 2px' }}>
                        {props.type[0].type.name.charAt(0).toUpperCase() + props.type[0].type.name.slice(1)}
                    </p>
                    <p style={{backgroundColor: COLORS[props.type[1].type.name], padding: '5px', borderRadius: '10px', border: 'solid black 2px' }}>
                        {props.type[1].type.name.charAt(0).toUpperCase() + props.type[1].type.name.slice(1)}
                    </p>
                </div>
            }  
        </div>
        <div className='pokemon-img'>
          <img src={props.img} alt={props.name}/>
        </div>
    </Link>

    )
  }
   
export default Pokemons;
