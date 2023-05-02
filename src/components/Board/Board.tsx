import css from './Board.module.css';
import clsx from 'clsx';
import IssuseCard from 'components/IssuesCard/IssuseCard';
import { useState, useEffect } from 'react';
import { Space, Button, Tooltip, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHook';
import { useDrop } from 'react-dnd/dist/hooks';
import { addToEndOfBoard, removeBoard } from 'redux/todoSlice';
import { todoIssues, draggedCard } from 'redux/todoSelector';
import { issue } from 'types/typesSlice';

interface IBoard {
  data: {
    id: string;
    title: string;
  };
}

const Board: React.FC<IBoard> = ({ data }) => {
  const [isDisable, setIsDisabled] = useState(false);
  const issues = useAppSelector(todoIssues);
  const card = useAppSelector(draggedCard);
  const filtredCards = issues.filter(card => card.order === data.id);
  const dispatch = useAppDispatch();

  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (item: issue) => addCardToBoard(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  const addCardToBoard = (item: issue): void => {
    if (card) {
      const cardData = {
        dragCard: item,
        boardId: data.id,
        dropCard: card,
      };

      dispatch(addToEndOfBoard(cardData));
    }
  };

  const deleteBoard = (): void => {
    dispatch(removeBoard(data.id));
  };

  useEffect(() => {
    if (filtredCards.length > 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [filtredCards.length]);

  return (
    <Space className={css.board}>
      <div className={css.titleBox}>
        <h2>{data.title}</h2>
        <Popconfirm
          disabled={isDisable}
          title="Delete the board"
          description="Are you sure to delete this board?"
          onConfirm={deleteBoard}
          onCancel={() => null}
          okText="Yes"
          cancelText="No"
        >
          <Tooltip
            title={
              filtredCards.length > 0
                ? 'Clear board before deleting'
                : 'Delete the board'
            }
            className={css.deleteBtn}
          >
            <Button
              shape="circle"
              disabled={isDisable}
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Popconfirm>
      </div>
      <ul
        className={clsx(css.cardList, isOver && css.cardListIsOver)}
        ref={drop}
      >
        {filtredCards.map(issue => (
          <li key={issue.id}>
            <IssuseCard data={issue} boardId={data.id} />
          </li>
        ))}
      </ul>
    </Space>
  );
};

export default Board;
