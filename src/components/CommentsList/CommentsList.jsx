import { getComments, clearComments } from '../../slices/newsSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import CommentsItem from '../CommentsItem/CommentsItem'
import Spinner from '../Spinner/Spinner'

import './CommentsList.scss'
const CommentsList = () => {
    const dispatch = useDispatch();
    const article = useSelector(state => state.news.article);
    const comments = useSelector(state => state.news.comments);
    const loadingComments = useSelector(state => state.news.commentsLoading);
    useEffect(() => {
        if(article.descendants > 0){
            dispatch(getComments({
                ids: article.kids,
                type: 'comment'
            }))
        }
        return () => dispatch(clearComments())
    // eslint-disable-next-line
    },[]);
    return(
        <>
            {loadingComments && <Spinner/>}
            {
                article.descendants ?
                comments.map((comment) => {
                    return <CommentsItem key={comment.id} id={comment.id} {...comment} ></CommentsItem>
                })
                : <div className="not_found">no comments found</div>
            }
        </>
    )
}

export default CommentsList