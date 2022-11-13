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

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        updatePage: (state, action) => {
            state.page += action.payload
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getNews.pending, state => {state.newsLoading = true})
            .addCase(getNews.fulfilled, (state, action) => {
                state.newsLoading = false
                newsAdapter.addMany(state, action.payload)
            })
            .addCase(getNews.rejected, state => {state.newsLoading = false})

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
export const {updatePage} = actions


export default reducer