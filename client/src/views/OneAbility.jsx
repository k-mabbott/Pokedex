import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios';


const OneAbility = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [ability, setAbility] = useState();
    const gotAbility = useRef(false);


    useEffect(() => {
        if (!gotAbility.current) {
            gotAbility.current = true;
            axios.get(`https://pokeapi.co/api/v2/ability/${id}`)
                .then(res => {
                    console.log(res.data);
                    setAbility(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }, [])

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }

    return (
        <>
            {/* -------------------------------- Header */}
            <header className="header">
                <div className='flex'>
                    <div className='dot blue' >
                        <div></div>
                    </div>
                    <div className='dot red' style={{ backgroundColor: "red" }} ></div>
                    <div className='dot yellow' style={{ backgroundColor: "yellow" }} ></div>
                    <div className='dot green' style={{ backgroundColor: "green" }} ></div>
                </div>
                <div>
                    <h3 className="home">
                        <Link to={"/"}>Home</Link>
                    </h3>
                </div>
            </header>
            {ability ?
                <div className="ability">
                    <h1>{ability ? capitalize(ability?.name) : "Loading..."}</h1>
                    <p>Ability ID: {ability.id}</p>
                    <p>{capitalize(ability.generation.name)}</p>
                    <p>Effect: {ability.effect_entries[1].effect}</p>
                    <p>Ability is available to:</p>
                    <ul>
                        {ability.pokemon.sort((a, b) => a.pokemon.name > b.pokemon.name ? 1 : -1)
                            .map((p, i) => {
                                const pokeId = p.pokemon.url.split("/pokemon")
                                return <li key={i}><Link to={'/poke' + pokeId[1]} >{capitalize(p.pokemon.name)}</Link></li>
                            })}
                    </ul>
                </div>
                : "Loading..."}
        </>
    )
}

export default OneAbility