import React, { Component } from 'react'
import PokemonDetails from '../PokemonDetails/'
import PubSub from 'pubsub-js'
import { ListAlt } from '@material-ui/icons'

export default class Favorites extends Component {
	constructor() {
		super()

		this.state = {
			pokemonList: [],
		}
	}

	componentDidMount() {
		this.getFavorites()

		PubSub.subscribe('update-favorities', function() {
			this.getFavorites()
		}.bind(this));
	}

	getFavorites() {
		const favorites = sessionStorage.getItem('favorites')
        const jsonFavorite = JSON.parse(favorites) || []

		this.setState({
			pokemonList: jsonFavorite
		}, () => {
			PubSub.publish('loading', false)
		})
	}

	render() {
		return(
			<div className="search">
				<h3>Favoritos</h3>

				<a href="/" className="favorite-link">
					<ListAlt></ListAlt>
				</a>

				{this.state.pokemonList ?
					<div className="list-cards">
						{this.state.pokemonList.map((pokemon, i) => {
							return (
								<div className={`pokemon-card ${i === this.state.activeIndex ? "active" : "inactive"}`} onClick={e => this.setState({activeIndex: i})}>
									<PokemonDetails
										data={pokemon}
										favorites={false}
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
			</div>
		)
	}
}