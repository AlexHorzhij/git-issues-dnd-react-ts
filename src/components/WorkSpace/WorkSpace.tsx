import css from './WorkSpace.module.css';
import Board from 'components/Board/Board';
import { useState, useEffect, useRef } from 'react';
import { Input, Button, Modal } from 'antd';
import type { InputRef } from 'antd';
import { useAppSelector, useAppDispatch } from 'hooks/reduxHook';
import { addNewBoard } from 'redux/todoSlice';
import { todoBoards } from 'redux/todoSelector';

const WorkSpace = () => {
  const boards = useAppSelector(todoBoards);
  const [boardName, setBoardName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  const inputRef = useRef<InputRef>(null);

  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (inputRef.current && isModalOpen) {
      inputRef.current!.focus();
    }
  }, [isModalOpen]);

  const handleOk = () => {
    setIsModalOpen(false);
    dispatch(addNewBoard(boardName));
    setBoardName('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={css.container}>
      <div className={css.boardList}>
        {boards.map(board => (
          <div key={board.id} className={css.boardItem}>
            <Board data={board} />
          </div>
        ))}
        <Button onClick={showModal} block>
          Add board
        </Button>
      </div>
      <Modal
        title="Add board"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          ref={inputRef}
          value={boardName}
          onChange={e => setBoardName(e.target.value)}
          onPressEnter={handleOk}
        />
      </Modal>
    </div>
  );
};

export default WorkSpace;
