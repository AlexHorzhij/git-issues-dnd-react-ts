import css from './IssuseCard.module.css';
import clsx from 'clsx';
import { useEffect } from 'react';
import { Card, Image, Popover } from 'antd';
import { formatDistanceToNowStrict } from 'date-fns';
import { useDrag, useDrop } from 'react-dnd';
import { issue } from 'types/typesSlice';
import { useAppDispatch } from 'hooks/reduxHook';
import { addToCurrent, moveCard } from 'redux/todoSlice';

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
      className={css.cardWrapper}
      style={{
        paddingTop: isOver && !isDragging ? '40px' : 0,
      }}
    >
      <Card
        ref={drag}
        className={clsx(
          css.card,
          isDragging && css.cardIsDragging,
          isOver && css.cardIsOver
        )}
        bodyStyle={{
          padding: 15,
        }}
        title={
          <Popover content={data.title}>
            <span>{data.title}</span>
          </Popover>
        }
        extra={
          <Image width={30} src={data.user.avatar_url} className={css.avatar} />
        }
      >
        <div className={css.descriptionWrapper}>
          <span className={css.text}>{data.id}</span>
          <span>opened {time} ago</span>
        </div>
        <div className={css.commentsWrapper}>
          <span className={css.text}>{data.author_association}</span>
          <span className={css.comments}>comments: {data.comments}</span>
        </div>
      </Card>
    </div>
  );
};

export default IssuseCard;
