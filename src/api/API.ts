import axios from 'axios';

export const getIssues = async (repoName: string) => {
  console.log('url: ', repoName);
  // google/material-design-icons
  const response = await axios(`https://api.github.com/repos${repoName}/issues`,  {
    params: {
      page: 1,
      per_page: 10,
    }
  });
  // const repo = await axios('');
  
  // console.log('repo: ', repo);
   
    return response.data
};


export const getRepoData = async (repoName: string) => {
  const response = await axios(`https://api.github.com/repos${repoName}`);
  return response;
}
