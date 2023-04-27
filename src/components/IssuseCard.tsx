import css from './IssuseCard.module.css';
import { useEffect } from 'react';
import { Card, Image, Popover } from 'antd';
import { formatDistanceToNowStrict } from 'date-fns';
import { useDrag, useDrop } from 'react-dnd';
import { issue } from '../types/typesSlice';
import { useAppDispatch } from '../hooks/reduxHook';
import { addToCurrent, moveCard } from '../redux/todoSlice';

interface IssueCardProp {
  data: issue;
  boardId: string;
}

const IssuseCard: React.FC<IssueCardProp> = ({ data, boardId }) => {
  const time = formatDistanceToNowStrict(new Date(data.created_at));
  const dispatch = useAppDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: data,
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [{ isOver }, drop] = useDrop({
    accept: 'card',
    drop: (item: issue) => dropHendler(item),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  useEffect(() => {
    if (isDragging) {
      dispatch(addToCurrent(data));
    }
  }, [data, dispatch, isDragging]);

  function dropHendler(item: issue) {
    if (item.id === data.id) return;
    const cardData = {
      dragCard: item,
      boardId: boardId,
      dropCard: data,
    };
    dispatch(moveCard(cardData));
  }

  return (
    <div
      ref={drop}
      style={{
        paddingTop: isOver && !isDragging ? '40px' : 0,
        transitionProperty: 'padding',
        transitionDuration: '500ms',
      }}
    >
      <Card
        ref={drag}
        className={css.card}
        bodyStyle={{
          padding: 15,
          width: 280,
        }}
        title={
          <Popover content={data.title}>
            <span>{data.title}</span>
          </Popover>
        }
        extra={
          <Image
            width={30}
            src={data.user.avatar_url}
            style={{ marginLeft: 10 }}
          />
        }
        style={{
          width: '100%',
          boxShadow: isOver
            ? '0px 4px 14px rgba(0, 0, 0, 0.5)'
            : '0px 4px 14px rgba(0, 0, 0, 0.11)',
          border: isDragging ? '5px solid red' : '1px solid  white',
          opacity: isDragging ? '0.3' : '1',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            marginBottom: 10,
          }}
        >
          <span style={{ marginRight: 10 }}>{data.id}</span>
          <span>opened {time} ago</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <span style={{ marginRight: 10 }}>{data.author_association}</span>
          <span className={css.comments}>comments: {data.comments}</span>
        </div>
      </Card>
    </div>
  );
};

export default IssuseCard;
