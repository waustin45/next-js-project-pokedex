import React from 'react'
import Layout from '../components/Layout'
import Link from 'next/Link'
function pokemon({pokeman}) {
  return (
   <Layout title={pokeman.name}>
    <div className='individual-wrapper'>
        <div className='info-left'>
            <h1 className="pokemon-h">{pokeman.name}</h1>
            <p><span>Weight: </span>{pokeman.weight}</p>
            <p><span>Heightt: </span>{pokeman.height}</p>
            <div className='types-wrapper'>
                <h2>Types</h2>
            {pokeman.types.map((type, index)=> <p key={index}>{type.type.name}</p>)}
            </div>
            
        </div>
    
    <img className='pokemon-img' src={pokeman.image} alt={pokeman.name}/>
    
    
    
    </div>
    <p className='home-p'>
        <Link href="/">
            <a className='home-anchor'>
                Home
            </a>
        </Link>
    </p>
   </Layout>
  )
}

export default pokemon

export async function getServerSideProps({query}) {
    const id = query.id
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokeman = await res.json()
        const paddedIndex = ("00" + (id)).slice(-3)
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        pokeman.image = image
        return {
            props: { pokeman },
        }
    }catch (err) {
        console.error(err)
    }
}