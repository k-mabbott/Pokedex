import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios';
import OnePokeInfo from '../components/OnePokeInfo';



const OnePoke = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [poke, setPoke] = useState();
    const [evolutions, setEvolutions] = useState();
    const gotPoke = useRef(false);

    useEffect(() => {
        if (!gotPoke.current) {
            gotPoke.current = true;
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(res => {
                    console.log(res.data);
                    setPoke(res.data);
                    axios.get(res.data.species.url)
                        .then(res => {
                            axios.get(res.data.evolution_chain.url)
                            .then(res => {
                                console.log(res.data);
                                setEvolutions(res.data);
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
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
                    <div className='dot red' style={{backgroundColor:"red"}} ></div>
                    <div className='dot yellow' style={{backgroundColor:"yellow"}} ></div>
                    <div className='dot green' style={{backgroundColor:"green"}} ></div>
                </div>
                <div>
                    <h3 className="home">
                        <Link to={"/"}>Home</Link>
                    </h3>
                </div>
            </header>
            <h1 className="name">{poke ? capitalize(poke?.name) : "Loading..."}</h1>
            <main className="flex">
                {/* -------------------------------- Information section*/}
                { poke && evolutions ? <OnePokeInfo poke={poke} evolutions= {evolutions} /> : <p>Loading...</p>}
                {/* -------------------------------- Aside Info */}
                <aside className="pokeDetails">
                    <p>Extra Information</p>
                    <hr/>
                    <details>
                        <summary>Abilities</summary>
                        <ul>
                            {
                                poke?.abilities.map((abil, i) => {
                                    const abilNum = abil.ability.url.split("v2")
                                    return <li key={i} ><Link to={abilNum[1]}>{capitalize(abil.ability.name)}</Link></li>})
                            }
                        </ul>
                    </details>
                    <details>
                        <summary>Games appeared in</summary>
                        <ul>
                            {
                                poke?.game_indices.map((abil, i) => <li key={i} >{capitalize(abil.version.name)}</li>)
                            }
                        </ul>
                    </details>
                    <details>
                        <summary>List of Moves</summary>
                        <ul>
                            {
                                poke?.moves.sort((a, b) => a.move.name > b.move.name ? 1 : -1).map((abil, i) => <li key={i} >{capitalize(abil.move.name)}</li>)
                            }
                        </ul>
                    </details>
                </aside>
            </main>
        </>
    )
}

export default OnePoke