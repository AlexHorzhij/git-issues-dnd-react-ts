import { createAsyncThunk } from "@reduxjs/toolkit";
import {getIssues, getRepoData} from '../api/API'

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
   async function (repoName: string, {rejectWithValue}) {
    try {
        const issuesData = await getIssues(repoName)
        const {data} = await getRepoData(repoName)
        const resData: IResponse[] = issuesData.map((item:IResponse) => 
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
        const res = {resData, stars: data.stargazers_count}
            console.log('stars: ', res);
        return {resData, stars: data.stargazers_count};
    } catch (error) {
        return rejectWithValue(error)
    }
   })
