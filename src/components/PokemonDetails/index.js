import React, { Component } from 'react'
import { POKEMON_API } from '../../constants/ApiConstants'
import axios from 'axios'
import { Favorite } from '@material-ui/icons'

export default class PokemonDetails extends Component {
    constructor() {
        super()

        this.state = {
            abilities: [],
            weight: '',
            photo: '',
            xp: '',
            name: '',
            loadedPokemon: false
        }
    }

    getDetails(name) {
		console.log(name)
		axios.get(`${POKEMON_API}pokemon/${name}`).then(pokemon => {
			this.setState({
				abilities: pokemon.data.abilities,
                weight: pokemon.data.weight,
                photo: pokemon.data.sprites.front_default,
                xp: pokemon.data.base_experience,
                name: pokemon.data.name,
                loadedPokemon: true
			})
		})
	}

    setFavorite(pokemon) {
        const favorites = sessionStorage.getItem('favorites')
        const jsonFavorite = JSON.parse(favorites) || []
        

        jsonFavorite.push(pokemon)

        sessionStorage.setItem('favorites',  JSON.stringify(jsonFavorite))

        this.props.UpdateFavorites(jsonFavorite.length)
    }

    render() {
        return (
                <div className={`pokemon-card-inner`} onClick={this.getDetails.bind(this, this.props.data.pokemon ? this.props.data.pokemon.name : this.props.data.pokemon_species.name)}>
                    <div className="pokemon-card-front">
                        <div className="name">{this.props.data.pokemon ? this.props.data.pokemon.name : this.props.data.pokemon_species.name}</div>
                        <div className="img"></div>	
                    </div>
                    <div className="pokemon-card-back">
                        {this.state.loadedPokemon ?
                            <div>
                                <div className="photo-pokemon">
                                    <img src={this.state.photo} alt={this.state.name}/>
                                </div>
                                <div className="abilities">
                                    {this.state.abilities.map((ability, i) => {
                                        return(
                                            <div className="ability">
                                                {ability.ability.name}
                                            </div>
                                        )
                                    })}
                                </div>
                                <div className="oder-infos">
                                    <div className="info">{this.state.weight} Kg </div>
                                    <div className="info">{this.state.xp} XP </div>
                                </div>
                                
                                {this.props.favorites && <div className="favorite" onClick={this.setFavorite.bind(this, this.props.data)}>
                                    <Favorite></Favorite>
                                </div>}
                            </div>
                            :
                            <div>
                                loading
                            </div>
                        }
                    </div>
                </div>
        )
    }
}