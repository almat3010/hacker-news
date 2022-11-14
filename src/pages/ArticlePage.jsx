import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import CommentsList from '../components/CommentsList/CommentsList'
import Title from '../components/Title/Title'
import { getItem } from '../slices/newsSlice'

const ArticlePage = () => {
    const {id} = useParams();
    const dispatch = useDispatch();

    useEffect(()=>{
        console.log([id])
        dispatch(getItem({
            ids: [id],
            type: 'article'
        }));
    },[]);
    return(
        <>
            <Title/>
            <CommentsList/>
        </>
    )
}
export default ArticlePage