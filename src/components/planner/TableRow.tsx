import { FC, HTMLAttributes } from "react";
import styled from "@emotion/styled";

import { AiFillDelete } from "../assets";

type DateCheckboxProps = {
  localDate: string;
  checkedList: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const DateCheckbox = ({
  localDate,
  checkedList,
  onChange,
}: DateCheckboxProps) => {
  return (
    <span className="item date">
      <input
        type="checkbox"
        defaultChecked={checkedList.includes(localDate)}
        onChange={onChange}
      />
    </span>
  );
};

export const Delete = () => {
  return <AiFillDelete />;
};

export const Keyword: FC = ({ children }) => {
  return <span className="item keyword">{children}</span>;
};

export const SmallStep: FC = ({ children }) => {
  return <span className="item small-step">{children}</span>;
};

type TableRowType = {
  attributes?: HTMLAttributes<HTMLLIElement>;
};

export const TableRow: FC<TableRowType> = ({ children, attributes }) => {
  return (
    <TableRowWrap
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      {...attributes}
    >
      {children}
    </TableRowWrap>
  );
};

export const TableItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1 1 0;
  cursor: grab;
  &.head {
    background-color: #3080f5;
    color: white;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 4px;
    border-bottom: 1px solid #d3d3d3;
    text-align: center;
    &.keyword,
    &.small-step {
      width: 90px;
      word-break: keep-all;
    }
    &.date {
      flex: 1;
      min-width: 40px;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
  &[data-grab="grab"] {
    cursor: grabbing;
  }
  &:not(:first-of-type) .item.keyword,
  .small-step {
    text-align: left;
    justify-content: flex-start;
    font-size: 14px;
  }
  @media screen and (max-width: 1460px) {
    .item {
      &.keyword,
      &.small-step {
        width: 60px;
        font-size: 14px;
      }
      &.date {
        flex: 1;
        min-width: auto;
      }
      input[type="checkbox"] {
        width: 14px;
        height: 14px;
      }
    }
  }
  @media screen and (max-width: 1240px) {
    &:not(:first-of-type) .item.keyword,
    .item.small-step {
      font-size: 12px;
    }
    .item.keyword {
      display: none;
    }
    .item.small-step {
      width: 60px;
      font-size: 12px;
    }
  }
`;

const TableRowWrap = styled(TableItem)`
  &:nth-of-type(2n) {
    background-color: #f7fafd;
  }
  &:hover svg {
    opacity: 1;
  }
  > div {
    position: absolute;
    top: 50%;
    right: 100%;
    transform: translateY(-50%);
    width: 42px;
    height: 42px;
    cursor: pointer;
    &:hover {
      &::before {
        transform: translate(-50%, -50%) scale(1);
        opacity: 1;
      }
      svg {
        color: black;
      }
    }
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0);
      width: 80%;
      height: 80%;
      border-radius: 50%;
      opacity: 0;
      background-color: #f2f2f2;
      transition: scale, opacity 500ms;
    }
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    width: 50%;
    height: 50%;
    color: #9a9a9a;
    transition: opacity 300ms;
  }
`;
