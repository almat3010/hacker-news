import {createEntityAdapter, createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {useHttp} from '../hooks/http.hook'

const newsAdapter = createEntityAdapter({
    selectId: (news) => {
        if (news.id === null){
            return 0;
        }
        else{
            return news.id
        }
    }
});

const initialState = newsAdapter.getInitialState({
    newsLoading: false,
    newsUpdate : false,
    commentsLoading: false,
    articleLoading: false,
    articleError: false,
    subCommLoading: false,
    article: [],
    comments: [],
    subComments: [],
    page: 1
});

export const getNews = createAsyncThunk(
    'news/getNews',
    async (i = 0) => {
        const {request} = useHttp();
        const dataId = await request("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy=%22$key%22&limitToFirst=100");
        const news = Promise.all(
            dataId.slice(0+i,25+i).map((id) => {
                return request(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            })
        )
        return news;
    }
)

export const updateNews = createAsyncThunk(
    'news/updateNews',
    async (_, thunkAPI) => {
        const {request} = useHttp();
        const dataId = await request("https://hacker-news.firebaseio.com/v0/newstories.json?print=pretty&orderBy=%22$key%22&limitToFirst=100");
        const prevState = thunkAPI.getState();
        const newNews = Promise.all(
            dataId.slice(0,Object.keys(prevState.news.entities).length).map((it) => {
                    return request(`https://hacker-news.firebaseio.com/v0/item/${it}.json`);
                })
        )
        return newNews;
    }
)

export const getItem = createAsyncThunk(
    'news/getItem',
    ({ids}) => {
        const {request} = useHttp();
        const comments = Promise.all(
            ids.map(id => {
                return request(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            })
        )
        return comments;
    }
)

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        updatePage: (state, action) => {
            state.page += action.payload
        },
        clearArticle: (state) => {
            state.article = [];
        },
        clearComments: (state) => {
            state.subComments = []
            state.comments = []
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getNews.pending, state => {state.newsLoading = true})
            .addCase(getNews.fulfilled, (state, action) => {
                state.newsLoading = false;
                newsAdapter.addMany(state, action.payload);
            })
            .addCase(getNews.rejected, state => {state.newsLoading = false})

            .addCase(getItem.pending, (state,action) => {
                if(action.meta.arg.type === 'comment'){
                    state.commentsLoading = true;
                }else if(action.meta.arg.type ==='article'){
                    state.articleLoading = true;
                }else if(action.meta.arg.type ==='subcomments'){
                    state.subCommLoading = true
                }
            })
            .addCase(getItem.fulfilled, (state, action) => {
                if(action.meta.arg.type === 'comment'){
                    state.commentsLoading = false;
                    state.comments = action.payload;
                }else if(action.meta.arg.type === 'subcomments'){
                    state.commentsLoading = false;
                    state.subCommLoading = false;
                    state.subComments = [...state.subComments, ...action.payload];
                }else if(action.meta.arg.type === 'article'){
                    if (action.payload[0] === null){
                        state.articleError = true;
                        state.articleLoading = false;
                    }else{
                        state.article = action.payload[0];
                        state.articleLoading = false;
                    }
                }
            })
            .addCase(getItem.rejected, state => {
                state.commentsLoading = false;
                state.subCommLoading = false;
                state.articleLoading = false;
                state.articleError = false;
            })

            .addCase(updateNews.pending, state => {state.newsUpdate = true})
            .addCase(updateNews.fulfilled, (state, action) => {
                state.newsUpdate = false
                newsAdapter.setAll(state, action.payload)
            })
            .addCase(updateNews.rejected, state => {state.newsUpdate = false})
    }
});

const {actions, reducer} = newsSlice;
export const {selectAll} = newsAdapter.getSelectors(state => state.news)
export const {updatePage, clearArticle, clearComments} = actions

export default reducer