import React from "react";
import styled from "styled-components";
import { getComments } from "../api/api";
import { PAGE_LIMIT } from "../common/constant";
import useAxios from "../common/hooks/useAxios";
import Error from "./Error";
import Loading from "./Loading";

const getPageArray = (data) => [...Array(Math.ceil(data.length / PAGE_LIMIT))];

function PageList({ page, setPage }) {
  const isCurrentPage = (key) => page == key;
  const { data, loading, error } = useAxios(getComments);

  if (loading) return <Loading />;
  if (error) return <Error />;
  if (data)
    return (
      <PageListStyle>
        {getPageArray(data).map((_, index) => {
          const pageNumber = index + 1;
          return (
            <Page
              key={index}
              onClick={() => setPage(pageNumber)}
              active={isCurrentPage(pageNumber)}
            >
              {pageNumber}
            </Page>
          );
        })}
      </PageListStyle>
    );
}

export default PageList;

const PageListStyle = styled.div`
  margin-bottom: 20px;
  text-align: center;
`;

const Page = styled.button`
  padding: 0.375rem 0.75rem;
  border-radius: 0.25rem;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  ${({ active }) =>
    active &&
    `
        background: gray;
        color: #fff;
  `}
  margin-right: 3px;
`;
