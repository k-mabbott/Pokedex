import React, { useState } from 'react'
import { motion } from "framer-motion"


const PokeCard = ({poke}) => {

    const [hovering, setHovering] = useState(false)

    const bgColor = (pokeType) => {
        switch (pokeType){
            case 'fire':
                return 'firebrick'
            case 'grass':
                return 'green'
            case 'water':
                return 'dodgerblue'
            case 'normal':
                return 'khaki'
            case 'poison':
                return 'darkviolet'
            case 'flying':
                return '#a9dae9'
            case 'bug':
                return 'springgreen'
            case 'psychic':
                return 'pink'
            case 'fairy':
                return 'hotpink'
            case 'ground':
                return '#b96f4c'
            case 'fighting':
                return 'tan'
            case 'rock':
                return 'saddlebrown'
            case 'electric':
                return 'yellow'
            case 'ghost':
                return 'rebeccaPurple'
            case 'dark':
                return '#462d1a'
            case 'dragon':
                return 'aquamarine'
            case 'ice':
                return 'lightskyblue'
            case 'steel':
                return '#4e5563'
            default :
                return 'black'
        }
    }
    const bg = bgColor(poke.types[0].type.name)
    const bg2 = poke.types[1] ? bgColor(poke?.types[1].type.name) : 'black'
    // console.log(poke)

    const getTypes = (types) => {
        const arr = types.map(type => type.type.name)
        return arr.toString()
    }

    const pokeGif = poke['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
    const pokeGifBack = poke['sprites']['versions']['generation-v']['black-white']['animated']['back_default']

    const capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1)
    }


    const typeList = getTypes(poke.types)

    return (
        // <motion.div 
        // initial={{ opacity: 0, y:-100 }}
        // animate={{ opacity: 0.9, y:0 }}
        // exit={{ opacity: 0, y:-100 }}
        // className='pokecard' 
        // onMouseEnter={() => setHovering(true)} 
        // onMouseLeave={() => setHovering(false)} 
        // style={{backgroundColor: bg }} 
        // >
        <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.2 }}
        variants={{
        visible: { opacity: 1, scale: 1 },
        hidden: { opacity: 0, scale: 0 }
        }}
        className='pokecard' 
        onMouseEnter={() => setHovering(true)} 
        onMouseLeave={() => setHovering(false)} 
        style={{backgroundColor: bg}} 
        >
            <div className='card-header'>
                <p>ID: {poke.id}</p>
                <p>Type(s): { typeList }</p>
            </div>
            <img className='pokeImg' src={hovering ? pokeGifBack : pokeGif} alt={poke.name} 
            />
            <h2>{capitalize(poke.name)}</h2>
            <p>Base XP: {poke.base_experience}</p>
            <p>Height: {poke.height} Poke Inches</p>
            <p>Weight: {poke.weight} Poke Pounds</p>
        </motion.div>
    )
}

export default PokeCard