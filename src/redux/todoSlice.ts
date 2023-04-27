import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { todoState, issue, moveCardI, repoI, fetchIssuesI, dndI  } from '../types/typesSlice'
import { fetchIssues } from './todoOperations'

const initialState: todoState = {
  boards: [
    {
      id: '1',
      title: 'ToDo',
    },
    {
      id: v4(),
      title: 'In progress',
    },
    {
      id: v4(),
      title: 'Done',
    },
  ],
  repoInfo: {
    ownerName: '',
    repoName: '',
    url: '',
    stars: 0,
  },
  issues: [],
  currentDragCard: null,
  currentDropCard: '',
  todoLoading: false,
  error: null
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addToCurrent: (store, { payload }:PayloadAction<issue>) => {
      store.currentDragCard = payload;
    },

    moveCard: (store, { payload }:PayloadAction<moveCardI>) => {
      const indexDrag = store.issues.findIndex(
        card => card.id === payload.dragCard.id
      );
        
      store.issues[indexDrag].order = payload.boardId;
      
      const newDrag = store.issues.splice(indexDrag, 1);
      
      const indexDrop = store.issues.findIndex(
        card => card.id === payload.dropCard.id
      );
      store.issues.splice(indexDrop, 0, newDrag[0]);
    },

    addRepoInfo:(store, {payload}:PayloadAction<repoI>)=> {
      store.repoInfo = {...store.repoInfo, ...payload};
    },
    addRepoStatistic:(store, {payload}:PayloadAction<repoI>)=> {
      store.repoInfo = {...store.repoInfo, ...payload};
    },

    addToEndOfBoard: (store, { payload }: PayloadAction<dndI>) => {
      const indexDrag = store.issues.findIndex(
        card => card.id === payload.dragCard.id
      );
      store.issues[indexDrag].order = payload.boardId;
    },
    addNewBoard: (store, { payload }: PayloadAction<string>) => {
      const bordId = store.boards.length === 0 ? '1' : v4();     
      store.boards.push({ title: payload, id: bordId });
    },
    removeBoard: (store, { payload }: PayloadAction<string>) => {
      store.boards = store.boards.filter(board=> board.id !== payload)
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchIssues.pending, (state)=> {
      state.todoLoading = true;
      state.error = false;
  
    }).addCase(fetchIssues.fulfilled, (state, { payload }: PayloadAction<fetchIssuesI>)=> {
      state.error = false;
      state.issues = payload.issues;
      state.repoInfo = payload.repoInfo;
      state.todoLoading = false;
    })
      .addCase(fetchIssues.rejected, (state) => {
      state.todoLoading = false;
      state.error = true;
    })
  }


});

export default todoSlice;

export const { addToCurrent, moveCard, addToEndOfBoard, addNewBoard, removeBoard, addRepoInfo } = todoSlice.actions;
