import React, { Component } from 'react'
import { POKEMON_API } from '../../constants/ApiConstants'
import PokemonDetails from '../PokemonDetails/'
import Favorites from '../../components/Search/Favorites'
import Select from '../UI/Select/Select'
import PubSub from 'pubsub-js'
import axios from 'axios'
import { Favorite, Close } from '@material-ui/icons'
import './style.css'

export default class List extends Component {
	constructor() {
		super()

		this.state = {
			pokemonList: [],
			abilityList: [],
			genderList: [],
			generationList: [],
			selectedPokemon: {},
			selectedAbility: '',
			selectedGender: '',
			selectedGeneration: '',
			countPokemons: 0
		}
	}

	componentDidMount() {
		this.getInfo()
		this.UpdateFavorites()
	}

	getInfo() {
		axios.get(POKEMON_API).then(endpoints => {
			this.setState({
				list: endpoints
			})

			this.GetAbilities(endpoints.data.ability)
			this.GetGender(endpoints.data.gender)
			this.GetGeneration(endpoints.data.generation)
		})
	}

	GetAbilities(abilityEndpoint) {
		axios.get(abilityEndpoint).then(ability => {
			this.setState({
				abilityList: ability.data.results
			})
		})	
	}

	GetGender(genderEndpoint) {
		axios.get(genderEndpoint).then(gender => {
			this.setState({
				genderList: gender.data.results
			})
		})	
	}

	GetGeneration(generationEndpoint) {
		axios.get(generationEndpoint).then(generation => {
			this.setState({
				generationList: generation.data.results
			})

			PubSub.publish('loading', false)
		})	
	}

	getByAbility = (val) => {
		PubSub.publish('loading', true)

        this.setState({
            selectedAbility: val
        }, () => {
			axios.get(`${val}?limit=30&offset=30`).then(pokemons => {
				this.setState({
					pokemonList: pokemons.data.pokemon
				})

				PubSub.publish('loading', false)
			})
		})
    }

	getByGender = (val) => {
		PubSub.publish('loading', true)

        this.setState({
            selectedGender: val
        }, () => {
			axios.get(`${val}?limit=30&offset=30`).then(pokemons => {
				this.setState({
					pokemonList: pokemons.data.pokemon_species_details
				})

				PubSub.publish('loading', false)
			})
		})
    }

	UpdateFavorites() {
		const favorites = sessionStorage.getItem('favorites')
        const jsonFavorite = JSON.parse(favorites) || []

		this.setState({
			countPokemons: jsonFavorite.length
		})
	}

	openFavorities() {
		this.setState({
			activeFavorite: true
		})

		PubSub.publish('update-favorities')
	}

	closeFavorities() {
		this.setState({
			activeFavorite: false 
		})
	}

	render() {
		return(
			<div className="search">
				<h3>Filtros</h3>

				<div className="favorite-link" onClick={this.openFavorities.bind(this)}>
					<Favorite></Favorite>
					{this.state.countPokemons > 0 && <div className="count-pokemons">
						{this.state.countPokemons}
					</div>}
				</div>

				<div className="form">
					<div className="select">
						<Select
							label="Habilidade do Pokemon"
							onChange={this.getByAbility.bind(this)}
							name="selectedAbility"
							value={this.state.selectedAbility}
							className='box-style'
							options={this.state.abilityList}>
						</Select>
					</div>
					<div className="select">
						<Select
							label="Genero do Pokemon"
							onChange={this.getByGender.bind(this)}
							name="selectedGender"
							value={this.state.selectedGender}
							className='box-style'
							options={this.state.genderList}>
						</Select>
					</div>
					{/* <div className="select">
						<Select
							label="Geração do Pokemon"
							onChange={this.getByGeneration.bind(this)}
							name="selectedGeneration"
							value={this.state.selectedGeneration}
							className='box-style'
							options={this.state.generationList}>
						</Select>
					</div> */}
				</div>

				{this.state.pokemonList ?
					<div className="list-cards">
						{this.state.pokemonList.map((pokemon, i) => {
							return (
								<div className={`pokemon-card ${i === this.state.activeIndex ? "active" : "inactive"}`} onClick={e => this.setState({activeIndex: i})}>
									<PokemonDetails
										data={pokemon}
										UpdateFavorites={this.UpdateFavorites.bind(this)}
										favorites={true}
									></PokemonDetails>
								</div>
							)
						})}
					</div>
					:
					<div>
						Nenhum resultado
					</div>
				}

				<div className={`favorities ${this.state.activeFavorite ? 'active' : 'inactive'}`}>
					<div className="close"  onClick={this.closeFavorities.bind(this)}>
						<Close></Close>
					</div>
					<Favorites />
				</div>
			</div>
		)
	}
}