import axios from 'axios';

export const getIssues = async (url: string) => {
  console.log('url: ', url);
  const response = await axios(url+'/issues',  {
    params: {
      page: 1,
      per_page: 10,
    }
  });
  const repo = await axios('https://api.github.com/repos/google/material-design-icons');
  
  console.log('repo: ', repo);
   
    return response.data
};



