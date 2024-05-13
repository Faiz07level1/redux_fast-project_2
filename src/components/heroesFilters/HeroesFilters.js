
import {useEffect, useState } from "react"
import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilters  } from "./filtersSlice";
import { heroesFilter } from "./filtersSlice";
const HeroesFilters = () => {
    
    // const [active, setActive] = useState(null)
    const [number, setNumber] = useState(0)
    const {request} = useHttp()
    const {filters} = useSelector(state => state.filters);
    const dispatch = useDispatch()
    const onActive = (i, element) => {
        if (number === i) {
            return
        }
        console.log(element)
        // console.log(heroes.filter(item => item.element === element))
        
        dispatch(heroesFilter(element))

        setNumber(i)
    }

    useEffect(() => {
        dispatch(fetchFilters(request))
    }, [])
    
    const arrElements = filters.map(({label, className, name}, i) => {
        
        return (
            <button className={className + (i===number ? "active" : "")} key={i} onClick={() => onActive(i, name)}>{label}</button>
        )
    })


    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {arrElements}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;