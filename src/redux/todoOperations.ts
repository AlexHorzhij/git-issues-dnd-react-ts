import { createAsyncThunk } from "@reduxjs/toolkit";
import {getIssues} from '../api/API'

interface IResponse{
    order: string,
    title: string,
    created_at: string,
    comments: number,
    author_association: string,
    id: number,
    user: {
        login: string,
        avatar_url:string,
    }

}

export const fetchIssues = createAsyncThunk(
    'todo/fetchIssues',
   async function (url: string, {rejectWithValue}) {
    try {
        const data = await getIssues(url)
        const resData: IResponse[] = data.map((item:IResponse) => 
            item = {
            order: '1',
            title: item.title,
            created_at: item.created_at,
            comments: item.comments,
            author_association: item.author_association,
            id: item.id,
                user: {
            login: item.user.login,
            avatar_url:item.user.avatar_url,}
    }
    )
        return resData;
    } catch (error) {
        return rejectWithValue(error)
    }
   })
