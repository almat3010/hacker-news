import { updateArticle } from '../../slices/newsSlice'
import { useDispatch } from 'react-redux'

import comments from '../../icons/comment-icon.svg'
import time from '../../icons/time-icon.svg'
import rating from '../../icons/rating-icon.svg'
import person from '../../icons/person-icon.svg'
import './NewsItem.scss'

const NewsItem = (props) => {
    const dispatch = useDispatch();
    const timeFormat = new Date(props.time * 1000);
    const displayDate = `${timeFormat.getDate()}.${timeFormat.getMonth() + 1}.${timeFormat.getFullYear()}`;
    return(
        <>
            <div className="news__block">
                <div className="news__rating">
                    <img src={rating} alt="icon-rating" />
                    {props.score}
                </div>
                <div className="news__item">
                        <div 
                            className="news__item__title"
                            onClick={() => dispatch(updateArticle(
                                {
                                    id: props.id,
                                    title: props.title,
                                    by: props.by,
                                    time: displayDate,
                                    descendants: props.descendants,
                                    kids: props.kids,
                                    url: props.url
                                }
                            ))}>
                            {props.title} 
                        </div>
                    <div className="news__item__wrapper">
                        <div className="news__item__author">
                            <img src={person} alt="icon-person" />
                            {props.by}
                        </div>
                        <div className="news__item__date">
                            <img src={time} alt="icon-time" />
                            {displayDate}
                        </div>
                    </div>
                </div>
                <div className="news__comments">
                    <span> {props.descendants} </span>
                    <img src={comments} alt="icon-comments" />
                </div>
            </div>
        </>
    )
}

export default NewsItem