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
        <main>
            {/* -------------------------------- Header */}
            <h1>{poke?.name}</h1>
            {/* -------------------------------- Aside Info */}
            <aside>
                <details>
                    <summary>Abilities</summary>
                    <ul>
                        {
                            poke?.abilities.map( (abil, i) => <li key={i} >{abil.ability.name}</li>  )
                        }
                    </ul>
                </details>
                <details>
                    <summary>Games appeared in</summary>
                    <ul>
                        {
                            poke?.game_indices.map( (abil, i) => <li key={i} >{abil.version.name}</li>  )
                        }
                    </ul>
                </details>
            </aside>
        </main>
    )
}

export default OnePoke