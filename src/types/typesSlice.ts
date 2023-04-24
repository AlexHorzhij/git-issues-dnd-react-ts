export interface board {
  id: string;
  title: string;
}

export interface moveCardI{
  boardId: string,
  dragCard: issue,
  dropCard: issue,
}

export interface repoI{
    path: string;
    url: string;
}
    
export interface todoState{
  boards: board[];  
    issues: issue[];
    repoInfo: null | repoI;

  currentDragCard: issue | null;
    currentDropCard: string;
    todoLoading: boolean,
}


export interface issue{
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