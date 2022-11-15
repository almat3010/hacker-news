import CommentsItem from '../CommentsItem/CommentsItem'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getItem } from '../../slices/newsSlice';
import './SubCommentList.scss'
import { MiniSpinner } from '../Spinner/Spinner';

const SubCommentList = (props) => {
    const dispatch = useDispatch();
    const subComments = useSelector(state => state.news.subComments);
    const loading = useSelector(state => state.news.subCommLoading);
    const style = 'borderNone';
    const filteredSubComments = subComments.filter(it=>{
        if(props.id===it.parent){
            return it;
        }
    });
    useEffect(()=>{
        if(props.kids && filteredSubComments.length === 0){
            dispatch(getItem({
                ids: props.kids,
                type: 'subcomments'
            }))
        }
    },[]);

    return(
                <div className="subcomments">
                    {
                        loading && filteredSubComments.length === 0 ? <MiniSpinner /> : 
                        <div className='subcommentItem'>
                            {filteredSubComments.map(it=>{
                                return <CommentsItem key = {it.id} id = {it.id} class={style} {...it} />
                            })}
                        </div>
                    }
                </div>
    )
}
export default SubCommentList;