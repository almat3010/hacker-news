import cleanHtml from '../../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { getItem } from '../../slices/newsSlice';

import './CommentsItem.scss'

const CommentsItem = (props) => {
    const [showSubComments, setShowSubComments] = useState(false);
    const dispatch = useDispatch();
    const subComments = useSelector(state => state.news.subComments);
    useEffect(() => {
        if(props.kids){
            dispatch(getItem({
                ids: props.kids,
                type: 'subcomments'
            }));
        }
        // eslint-disable-next-line
    },[]);

    return(
        <div style={props.style} className="comments__item">
            <div className="comments__author">
                {props.dead || props.deleted ? 'sorry comment was deleted or dead' : `by ${props.by}`}
            </div>
            <div 
                dangerouslySetInnerHTML={{ __html: cleanHtml(props.text) }} 
                className="comments__text">
            </div>
            {
                props.kids &&
                    <div 
                    className="comments__btn"
                    onClick={()=>{
                        setShowSubComments(!showSubComments)
                    }}
                    >more</div>
                
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