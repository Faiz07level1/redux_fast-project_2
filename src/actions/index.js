import {createAction} from "@reduxjs/toolkit"
import {heroesAdd, heroesDeleted } from "../components/heroesList/heroesSlice"
import { filterFetched, heroesFilter } from "../components/heroesFilters/filtersSlice"


export const fetchHeroesDeleted = (request, id) => (dispatch) => {
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(dispatch(heroesDeleted(id)))
}

export const fetchHeroesAdd = (request, obj) => (dispatch) => {
    request(`http://localhost:3001/heroes`, "POST", JSON.stringify(obj)).then(data => dispatch(heroesAdd(data)))
}


