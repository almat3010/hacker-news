import { Link } from 'react-router-dom'
import {transformTime} from '../../helpers/helpers.js'

import comments from '../../icons/comment-icon.svg'
import time from '../../icons/time-icon.svg'
import rating from '../../icons/rating-icon.svg'
import person from '../../icons/person-icon.svg'
import './NewsItem.scss'

const NewsItem = (props) => {
    const transformDate = transformTime(props.time);
    return(
        <>
            <div className="news__block">
                <div className="news__rating">
                    <img src={rating} alt="icon-rating" />
                    {props.score}
                </div>
                <div className="news__item">
                    <Link className="news__link" to={`/article/${props.id}`}>
                        <div className="news__item__title">
                            {props.dead? 'deleted/dead' : props.title} 
                        </div>
                    </Link>
                    <div className="news__item__wrapper">
                        <div className="news__item__author">
                            <img src={person} alt="icon-person" />
                            {props.by}
                        </div>
                        <div className="news__item__date">
                            <img src={time} alt="icon-time" />
                            {transformDate}
                        </div>
                    </div>
                </div>
                <div className="news__comments">
                    <span> {props.descendants} </span>
                    <img src={comments} alt="icon-comments" />
                </div>
            </div>
        </>
    );
};

export default NewsItem;