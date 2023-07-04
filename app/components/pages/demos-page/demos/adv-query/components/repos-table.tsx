"use client";

import { Table as AntTable } from "antd";
import Link from "next/link";
import { GithubRecord } from "../types";

const columns = [
  {
    title: "Repo Name",
    dataIndex: "name",
    key: "name",
    render: (_: string, r: GithubRecord) => (
      <Link href={r.html_url} target="_blank">
        {r.name}
      </Link>
    ),
  },
  { title: "Visibilty", dataIndex: "visibility", key: "visibility" },
  {
    title: "Owner",
    dataIndex: "owner",
    key: "owner",
    render: (_: string, r: GithubRecord) => r.owner.login,
  },
];

interface TableProps {
  dataSource: GithubRecord[] | undefined;
  total: number | undefined;
  loading: boolean | undefined;
  handle: {
    paginationChange(_currentPage: number, _pageSize: number): void;
    rowClick(record: GithubRecord): void;
  };
}

export default function Table({ dataSource, total, loading, handle }: TableProps) {
  return (
    <AntTable
      {...{
        dataSource,
        columns,
        loading,
        rowKey: "id",
        size: "small",
        pagination: {
          defaultCurrent: 1,
          total,
          showSizeChanger: true,
          onChange: handle.paginationChange,
        },
      }}
      style={{ cursor: "pointer" }}
      onRow={record => ({
        onClick: () => handle.rowClick(record),
      })}
    />
  );
}
