import axios from 'axios';

export const getIssues = async (repoName: string) => {
  try {    
    const response = await axios(`https://api.github.com/repos${repoName}/issues`);
    return response.data
  } catch (error) {
    console.log('error: ', error);
    
  }
};


export const getRepoData = async (repoName: string) => {
  try {
    const response = await axios(`https://api.github.com/repos${repoName}`);
    return response;
  } catch (error) {
    console.log('error: ', error);
    
  }
}
