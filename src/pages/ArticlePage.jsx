import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearArticle, getItem } from '../slices/newsSlice'
import CommentsList from '../components/CommentsList/CommentsList'
import ErrorComponent from '../components/Error/Error'
import Spinner from '../components/Spinner/Spinner'
import Title from '../components/Title/Title'

const ArticlePage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const error = useSelector(state => state.news.articleError);
    const loading = useSelector(state => state.news.articleLoading);
    useEffect(()=>{
        dispatch(getItem({
            ids: [id],
            type: 'article'
        }));
        return () => dispatch(clearArticle());
    },[]);
    return(
        <>
            {
                loading ? <Spinner/> :
                <>
                    {
                        error ? <ErrorComponent /> :
                        <>
                            <Title/>
                            <CommentsList/>
                        </>
                    } 
                </>
             }
        </>
    )
}
export default ArticlePage