import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { getComments } from '../../slices/newsSlice';

import './CommentsItem.scss'

const CommentsItem = (props) => {
    const [showSubComments, setShowSubComments] = useState(false);
    const dispatch = useDispatch();
    const subComments = useSelector(state => state.news.subComments);
    useEffect(() => {
        if(props.kids){
            dispatch(getComments({
                ids: props.kids,
                type: 'subcomments'
            }));
        }
        // eslint-disable-next-line
    },[props.kids]);

    return(
        <div style={props.style} className="comments__item">
            <div className="comments__author">
                {props.dead || props.deleted ? 'sorry comment was deleted or dead' : 'by'+props.by}
            </div>
            <div 
                className="comments__text">
                {props.text}
            </div>
            {
                props.kids  ? 
                    <div 
                    className="comments__btn"
                    onClick={()=>{
                        setShowSubComments(!showSubComments)
                    }}
                    >more</div>
                : null
            }
            {// eslint-disable-next-line
                subComments.map(it => {
                    if(it.parent === props.id){
                        return <CommentsItem 
                                key={it.id} 
                                style={{
                                        display:`${showSubComments ?'block':'none'}`,
                                        paddingLeft:'25px', 
                                        borderBottom:'none'
                                    }} 
                                id={it.id} {...it} />
                    }
                })

            }
        </div>
    )
}

export default CommentsItem