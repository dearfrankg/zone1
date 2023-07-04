import { useQuery } from "@tanstack/react-query";
import { Octokit } from "@octokit/core";
import { DataProps } from "./types";

export type UseReposQueryProps = {
  pageSize: number;
  currentPage: number;
};

const octokit = new Octokit({
  auth: process.env.GITHUB_PAT,
});

const getRepos = async ({ pageSize, currentPage }: UseReposQueryProps): Promise<DataProps> => {
  let response;

  response = await octokit.request(`GET /users/{username}`, {
    username: "dearfrankg",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const total = response.data.public_repos;

  response = await octokit.request(
    `GET /users/{username}/repos?sort=updated&per_page=${pageSize}&page=${currentPage}`,
    {
      username: "dearfrankg",
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const { data: records } = response;

  return {
    results: records,
    total: Number(total),
  };
};

export const useReposQuery = ({ pageSize, currentPage }: UseReposQueryProps) => {
  return useQuery({
    queryKey: ["users", pageSize, currentPage],
    queryFn: () => getRepos({ pageSize, currentPage }),
  });
};
