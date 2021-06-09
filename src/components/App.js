import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  change = ({target: {value}}) => {
    this.setState({
      filters:{
        ...this.state.filters,
        type: value
      }
    })
  }

  findPets = () =>{
    if (this.state.filters.type !== 'all'){
      fetch(`/api/pets?type=${this.state.filters.type}`)
      .then(response => response.json())
      .then(data => this.setState({pets: data}));
    } else {
    fetch(`/api/pets`)
    .then(response => response.json())
    .then(data => this.setState({pets: data}));
    }
  }

  adoptPet = (petId) => {
    const pets = this.state.pets.map(p => {
      return p.id === petId ? { ...p, isAdopted: true } : p;
    });
    this.setState({ pets: pets });
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.change} onFindPetsClick={this.findPets}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser onAdoptPet={this.adoptPet} pets={this.state.pets}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
