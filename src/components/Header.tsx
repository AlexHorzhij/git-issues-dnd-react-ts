import { useState } from 'react';
import css from './Header.module.css';
import { fetchIssues } from '../redux/todoOperations';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHook';
import { Input, Typography } from 'antd';
import { StarFilled } from '@ant-design/icons';

const { Paragraph, Text, Link } = Typography;

const { Search } = Input;

const Header: React.FC = () => {
  const repoData = useAppSelector(state => state.todo.repoInfo);
  const [search, setSearch] = useState(repoData?.url);
  const dispatch = useAppDispatch();

  const onSearch = (value: string) => {
    const index = value.trim().indexOf('.com');
    const path = value.trim().slice(index + 4);
    dispatch(fetchIssues(path));
  };

  const repoPath = repoData?.path.split('/').slice(1).join(' > ');
  const starCount = Math.round(repoData?.stars / 1000);
  console.log('starCount: ', starCount);

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
      <Paragraph>
        <Link className={css.repoPath} href={search}>
          {repoPath}
        </Link>
        <StarFilled className={css.svg} />
        <Text className={css.starsCountText}>{starCount} K stars</Text>
      </Paragraph>
    </div>
  );
};

export default Header;
