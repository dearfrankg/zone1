export type GithubRecord = {
  id: number;
  html_url: string;
  name: string;
  owner: {
    login: string;
  };
};

export type DataProps = {
  results: GithubRecord[];
  total: number;
};
