import css from './Header.module.css';
import { useState } from 'react';
import { fetchIssues } from '../redux/todoOperations';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { Input, Typography, Alert } from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Paragraph, Text, Link } = Typography;
const { Search } = Input;

const Header: React.FC = () => {
  const repoData = useAppSelector(state => state.todo.repoInfo);
  const error = useAppSelector(state => state.todo.error);
  const isLoad = useAppSelector(state => state.todo.todoLoading);
  const [search, setSearch] = useState(repoData?.url);
  const dispatch = useAppDispatch();

  const onSearch = (value: string) => {
    const index = value.trim().indexOf('.com');
    const path = value.trim().slice(index + 4);
    dispatch(fetchIssues(path));
  };

  const starCount = Math.round(repoData?.stars / 1000);

  return (
    <div className={css.header}>
      <Search
        value={search}
        className={css.input}
        placeholder="input search text"
        allowClear
        loading={isLoad}
        enterButton="Load issues"
        size="large"
        onChange={value => setSearch(value.target.value)}
        onSearch={onSearch}
      />
      {repoData.ownerName && (
        <Paragraph style={{ margin: '8px 0' }}>
          <Link className={css.repoPath} href={search}>
            {`${repoData.ownerName} > ${repoData.repoName}`}
          </Link>
          <StarFilled className={css.svg} />
          <Text className={css.starsCountText}>{starCount} K stars</Text>
        </Paragraph>
      )}
      {error && (
        <Alert
          message="Repository is not found :("
          type="error"
          style={{ width: '400px' }}
          closable
        />
      )}
    </div>
  );
};

export default Header;
