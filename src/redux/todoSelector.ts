import { RootState } from 'redux/store';

export const todoIssues = (state: RootState) => state.todo.issues;
export const draggedCard = (state: RootState) => state.todo.currentDragCard;
export const repoInfo = (state: RootState) => state.todo.repoInfo;
export const errorData = (state: RootState) => state.todo.error;
export const isLoading = (state: RootState) => state.todo.todoLoading;
export const todoBoards = (state: RootState) => state.todo.boards;
