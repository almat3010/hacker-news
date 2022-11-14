import { getComments, clearComments } from '../../slices/newsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from "react-router";
import Header from '../Header/Header'
import time from '../../icons/time-icon.svg'
import back from '../../icons/back-icon.svg'
import './Title.scss'
import ErrorComponent from '../Error/Error';

const Article = () => {
    const article = useSelector(state => state.news.article);
    const news = useSelector(state => state.news.article);
    const dispatch = useDispatch();
    const hist = useHistory();
    return (
        <>
            {
            article.by ? 
                <>
                    <Header 
                        update = { () =>
                            dispatch(getComments({
                                ids: article.kids,
                                type: 'comment'
                            }))
                        }
                        clear = {() => dispatch(clearComments())}>
                    </Header>
                    <div key={news.id} className="title">
                        <div 
                            className="title__btn-back"
                            onClick={()=>{hist.goBack()}}>
                            <img src={back} alt="back-icon" />
                            back
                        </div>
                        <a 
                            target="_blank" rel="noopener noreferrer"
                            className='title__link' 
                            href={news.url}>
                            <div className="title__header">
                                {news.title}
                            </div>
                        </a>
                        <div className="title__author">
                            by {news.by}
                        </div>
                        <div className="title__date">
                            <img src={time} alt="icon-time" />
                            {news.time}
                        </div>
                        <div className="title__comments">
                            Comments: {news.descendants}
                        </div>
                    </div>
                </> : 
                <ErrorComponent/>
            }
        </>
    )
}
export default Article