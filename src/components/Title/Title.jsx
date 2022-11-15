import { getItem, clearComments } from '../../slices/newsSlice'
import { useSelector, useDispatch } from 'react-redux'
import {transformTime} from '../../helpers/helpers.js'
import { useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Header from '../Header/Header'
import time from '../../icons/time-icon.svg'
import back from '../../icons/back-icon.svg'
import './Title.scss'

const Article = () => {
    const article = useSelector(state => state.news.article);
    const transformDate = transformTime(article.time);
    const dispatch = useDispatch();
    const handleUpdate = () => {
        dispatch(getItem({
            ids: [article.id],
            type: 'article'
        }));
        dispatch(getItem({
            ids: article.kids,
            type: 'comment'
        }));
        dispatch(clearComments());
    }
    return (
        <>
            <Header onClick = {handleUpdate}>
            </Header>
            <div key={article.id} className="title">
                <div className="title__btn-back" >
                    <Link to='/'>
                        <img src={back} alt="back-icon" />
                        <span>back</span>
                    </Link>
                </div>
                <a 
                    target="_blank" rel="noopener noreferrer"
                    className='title__link' 
                    href={article.url}>
                    <div className="title__header">
                        {article.title}
                    </div>
                </a>
                <div className="title__author">
                    by {article.by}
                </div>
                <div className="title__date">
                    <img src={time} alt="icon-time" />
                    {transformDate}
                </div>
                <div className="title__comments">
                    Comments: {article.descendants}
                </div>
            </div>
        </>
    )
}
export default Article