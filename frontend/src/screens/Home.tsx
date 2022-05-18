import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {connect} from 'react-redux';
import Pokemons from '../components/ListPokemons';
import Search from '../components/Search';
import '../stylesheets/App.css';

function Home(props: any) {

  // Constants
  const limit = 9; 
  const offset = 1;
  const total = 1126;
  
  // States variable
  const [pokemonList, setPokemonList] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  // Loading data
  useEffect(()=> {
    async function fetchData() {
        const { data } = await axios.get(`http://localhost:3000/pokemons?limit=${limit}`, {
          headers: ({
            "Access-Control-Allow-Origin": "*"
            })
          })
        setPokemonList(data.nodes)
    }
    fetchData();
  }, [])

  // Loading data when page is changed
  const handleFetchPage = (pageNumber: number) => {
    async function fetchData() {
        const { data } = await axios.get(`/pokemons?limit=${limit}&offset=${(pageNumber - 1) * limit}`, 
          {
            headers: ({
              "Access-Control-Allow-Origin": "*"
              })
          })
        setPokemonList(data.nodes);
    }
    fetchData();
  }

	let pokemonTab = pokemonList.map((pokemon: any)=> {
		return <Pokemons name={pokemon.name} id={pokemon.id} type={pokemon.type} img={pokemon.img}/>
		}
	);

  return (
    <div className='background'>
      <div className='homepage'>

        {/* Title */}
        <div className='head'>
          <h1>
            Pokedex
          </h1>
        </div>

        <Search />
        
        <div className='pokemon-tab'>
        {pokemonTab}
        </div>

        <div className='buttons'>
            <button 
                disabled={pageNumber === 1} 
                onClick={() => {
                    handleFetchPage(pageNumber - 1);
                    setPageNumber(pageNumber-1)
                    }}
                >
                Previous page
            </button>
            <button 
                disabled={limit + offset * limit > total} 
                onClick={() => {
                    handleFetchPage(pageNumber + 1);
                    setPageNumber(pageNumber+1)
                    }}
                >
                Next page
            </button>

        </div>
  
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
    return {error: state.error}
}
export default connect(mapStateToProps, null)(Home);
