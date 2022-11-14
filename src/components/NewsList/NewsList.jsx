import { getNews, selectAll, updatePage, updateNews } from '../../slices/newsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import Header from '../Header/Header'

import Spinner from '../Spinner/Spinner'
import NewsItem from '../NewsItem/NewsItem'


const NewsList = () => {
    const dispatch = useDispatch();
    const news = useSelector(selectAll);
    const page = useSelector(state => state.news.page);
    const loadingNews = useSelector(state => state.news.newsLoading);
    const hiddenBtn = page === 4 ? 'none' : 'block';

    useEffect(() => {
        if(news.length===0){
            dispatch(getNews());
        }
        // eslint-disable-next-line
    },[])

    useEffect(() => {
        const intervalId = setInterval(()=>{
            dispatch(updateNews());
        }, 60000);
        return () => clearInterval(intervalId);

        // eslint-disable-next-line
    },[]);

    return(
            <>
            <Header update = {() => dispatch(updateNews())} clear = {() => {return undefined}} ></Header>
                {
                    news.sort((a,b) => b.id - a.id).map(it => {
                        return(
                            <NewsItem key = {it.id} id={it.id} {...it}></NewsItem>
                        )
                    })
                }
                {loadingNews ? <Spinner/>  : null}
                <button 
                    style={{'display' : hiddenBtn}}
                    className='news__btn'
                    onClick={()=>{
                        dispatch(getNews(25*page));
                        dispatch(updatePage(1));
                    }}
                    disabled = {page === 4 || loadingNews ? true : false}
                >Load more</button>
            </>
    )
}

export default NewsList