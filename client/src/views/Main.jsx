
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'
import PokeCard from '../components/PokeCard';
import { useNavigate } from 'react-router-dom';



export default () => {

    const [pokeList, setPokeList] = useState([]);
    //https://pokeapi.co/api/v2/pokemon?limit=151
    const [search, setSearch] = useState('')
    const gotPokes = useRef(false)

    const navigate = useNavigate();

    useEffect(() => {
        if (!gotPokes.current) {
            getAllPokes()
        }
    }, [])

    const getAllPokes = () => {
        gotPokes.current = true
        setPokeList([])
        for (let i = 1; i < 152; i++) {

            axios.get(`https://pokeapi.co/api/v2/pokemon/${i}`)
                .then(res => {
                    // console.log(res.data)
                    setPokeList(currList => [...currList, res.data])
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    const pokeSearch = (e) => {
        setSearch(e.target.value? e.target.value : '');
        if (!e.target.value) {
            gotPokes.current = true
            getAllPokes()
            return
        }
        gotPokes.current = false
        const results = pokeList.filter(pokes => {
            if (e.target.value === "") return pokeList
            return pokes.name.toLowerCase().includes(e.target.value.toLowerCase())
        })
        setPokeList(results)
    }

    //

    // setTimeout(console.log(pokeList), 2000)
    //<img src={poke.sprites.front_default} alt={poke.name} />
    //<p>{poke.name}</p>

    return (
        <>
            <header className='header' >
                <div className='flex'>
                    <div className='dot blue' >
                        <div></div>
                    </div>
                    <div className='dot red' style={{backgroundColor:"red"}} ></div>
                    <div className='dot yellow' style={{backgroundColor:"yellow"}} ></div>
                    <div className='dot green' style={{backgroundColor:"green"}} ></div>
                </div>
                <div className='header-input'>
                    <label htmlFor="search">Search for a Pokemon: </label>
                    <input onChange={pokeSearch} value={search} id='search' type="text" />
                </div>
            </header>
            <div className='pokelist' >
                {
                    pokeList && pokeList.sort((a, b) => a.id - b.id).map((poke, i) =>
                        <div key={i} onClick={() => { navigate(`/poke/${poke.id}`) }} >
                            < PokeCard className='poke-card' poke={poke} />
                        </div>
                    )
                }
            </div>
        </>
    )
}



