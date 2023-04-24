import { useState } from 'react';
import css from './Header.module.css';
import { fetchIssues } from '../redux/todoOperations';
import { addRepoInfo } from '../redux/todoSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { Input, Typography } from 'antd';

const { Paragraph } = Typography;

const { Search } = Input;

const Header: React.FC = () => {
  const repoData = useAppSelector(state => state.todo.repoInfo);
  const [search, setSearch] = useState(repoData?.url);
  const dispatch = useAppDispatch();

  const onSearch = (value: string) => {
    const index = value.trim().indexOf('.com');
    const path = value.trim().slice(index + 4);
    const url = `https://api.github.com/repos${path}`;

    dispatch(addRepoInfo({ path, url: value }));
    dispatch(fetchIssues(url));
  };

  const repoPath = repoData?.path.split('/').slice(1).join(' > ');

  return (
    <div className={css.header}>
      <Search
        value={search}
        className={css.input}
        placeholder="input search text"
        allowClear
        enterButton="Load issues"
        size="large"
        onChange={value => setSearch(value.target.value)}
        onSearch={onSearch}
      />
      <Paragraph className={css.repoPath}>
        <a href={search}>{repoPath}</a>
      </Paragraph>
    </div>
  );
};

export default Header;
