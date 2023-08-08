import React, { useState, useRef, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import axios from 'axios';


const OneMove = () => {

    const { id } = useParams();
    const navigate = useNavigate();
    const [move, setMove] = useState();
    const gotMove = useRef(false);


    useEffect(() => {
        if (!gotMove.current) {
            gotMove.current = true;
            axios.get(`https://pokeapi.co/api/v2/move/${id}`)
                .then(res => {
                    console.log(res.data);
                    setMove(res.data);
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
            {move ?
                <div className="card">
                    <h1>{move ? capitalize(move?.name) : "Loading..."}</h1>
                    <p>Move ID: {move.id}</p>
                    <p>{capitalize(move.generation.name)}</p>
                    <p>Effect: {move.effect_entries[0].effect}</p>
                    <p>Move is available to:</p>
                    <ul>
                        {move.learned_by_pokemon.sort((a, b) => a.name > b.name ? 1 : -1)
                            .map((p, i) => {
                                const pokeId = p.url.split("/pokemon")
                                return <li key={i}><Link to={'/poke' + pokeId[1]} >{capitalize(p.name)}</Link></li>
                            })}
                    </ul>
                </div>
                : "Loading..."}
        </>
    )
}

export default OneMove