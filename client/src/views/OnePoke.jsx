import React, { useState, useRef, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';



const OnePoke = () => {

    const { id } = useParams()

    const [poke, setPoke] = useState();
    const gotPoke = useRef(false)

    useEffect(() => {
        if (!gotPoke.current) {
            gotPoke.current = true
            axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
                .then(res => {
                    console.log(res.data)
                    setPoke( res.data )
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }, [])

    return (
        <h1>{poke?.name}</h1>
    )
}

export default OnePoke