import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const OnePokeInfo = ({ poke, evolutions }) => {

    const [hovering, setHovering] = useState(false)
    const [shiny, setShiny] = useState(false)

    const navigate = useNavigate();

    const getImage = () => {
        if (!pokeGif && !pokeGifBack){
            pokeGif = poke['sprites']['front_default']
            pokeGifBack = poke['sprites']['back_default'] ? poke['sprites']['back_default'] : poke['sprites']['front_default']
            pokeGifShiny = poke['sprites']['front_shiny']
            pokeGifBackShiny = poke['sprites']['back_shiny']
        }
        if(shiny){
            return hovering ? pokeGifBackShiny : pokeGifShiny
        } else {
            return hovering ? pokeGifBack : pokeGif
        }
    }

    const getPokeId = (url) => {
        const temp = url.split("/")
        return temp[temp.length-2]
    }

    // Re-usable code

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    // Get images from json
    
    let pokeGif = poke['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    let pokeGifBack = poke['sprites']['versions']['generation-v']['black-white']['animated']['back_default']
    let pokeGifShiny = poke['sprites']['versions']['generation-v']['black-white']['animated']['front_shiny']
    let pokeGifBackShiny = poke['sprites']['versions']['generation-v']['black-white']['animated']['back_shiny']

    return (
        <section className='flex onePokeSection'>
            <div className='bold'>
                <p>ID: {poke.id}</p>
                <p>Type(s): {poke.types.map( t => capitalize(t.type.name)).toString()}</p>
                <p>Base XP: {poke.base_experience}</p>
                <p>Height: {poke.height} Poke Inches</p>
                <p>Weight: {poke.weight} Poke Pounds</p>
                <p>Base Stats:</p>
                <ul>
                    {poke.stats.map( (s, i) => <li key={i}>{capitalize(s.stat.name)}: {s.base_stat}</li>)}
                </ul>
            </div>
            <div>
                <p className="shinyBtn" onClick={() => shiny ? setShiny(false) : setShiny(true)}>
                    {shiny? "View Default Version" : "View Shiny Version" }
                    </p>
                    <div 
                        onMouseEnter={() => setHovering(true)}
                        onMouseLeave={() => setHovering(false)}
                    >
                        <img
                            className='onePokeImg'
                            src={getImage()}
                            alt={poke.name}
                        />
                    </div>
                    <div>
                        <div><b>Evolution Chain: {evolutions.chain.evolves_to.length == 0 ? "None available" : 
                        <ul className='evolutions'>
                            <Link to={`/poke/${getPokeId(evolutions.chain.species.url)}`}  >
                            <li>{capitalize(evolutions.chain.species.name)}</li>
                            </Link>
                            <Link to={`/poke/${getPokeId(evolutions.chain.evolves_to[0].species.url)}`} >
                            <li>{capitalize(evolutions.chain.evolves_to[0].species.name ?? "")}</li>
                            </Link>
                            {evolutions.chain.evolves_to[0].evolves_to[0]?.species.name ? 
                            <Link to={`/poke/${getPokeId(evolutions.chain.evolves_to[0].evolves_to[0].species.url)}`} >
                            <li>{capitalize(evolutions.chain.evolves_to[0].evolves_to[0].species.name)}</li>
                            </Link>
                            : '' }
                        </ul> }
                        </b></div>
                        
                    </div>
            </div>
        </section>
    )
}

export default OnePokeInfo