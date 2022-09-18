import React from "react";
import styled from "styled-components";

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
  cursor: pointer;
`;

function PageList({ totalPage, page, handleSetPage }) {
  return (
    <PageListStyle>
      {Array(totalPage)
        .fill(0)
        .map((_, i) => (
          <Page key={i + 1} onClick={() => handleSetPage(i + 1)}>
            {i + 1}
          </Page>
        ))}
    </PageListStyle>
  );
}

export default PageList;
