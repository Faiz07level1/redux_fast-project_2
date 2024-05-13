import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback, startTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAll } from './heroesSlice';
import { fetchHeroesDeleted } from '../../actions';
import { fetchHeroes } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';
import { filteredHeroesSelector } from './heroesSlice';
const HeroesList = () => {
    const filteredHeroes = useSelector(filteredHeroesSelector)
    const {heroes,heroesLoadingStatus} = useSelector(state => state.heroes);
    const dispatch = useDispatch();
    const {request} = useHttp();
    
    
    
    useEffect(() => {
        dispatch(fetchHeroes())
        

    }, []);

    const onDelete = useCallback((id) => {
        dispatch(fetchHeroesDeleted(request, id))
        
        
    }, [request])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }
    console.log(heroes)
    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} onDelete={() => onDelete(id)} {...props} id={id}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;