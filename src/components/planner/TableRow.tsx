import { FC, HTMLAttributes } from "react";
import { AiFillDelete } from "react-icons/ai";
import styled from "@emotion/styled";

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
  cursor: move;
  &.head {
    background-color: #999999;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px 4px;
    border: 1px solid black;
    text-align: center;
    &.keyword {
      min-width: 90px;
    }
    &.small-step {
      min-width: 90px;
      word-break: keep-all;
    }
    &.date {
      min-width: 40px;
    }
    input[type="checkbox"] {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
`;

const TableRowWrap = styled(TableItem)`
  &:nth-of-type(2n) {
    background-color: #eeeeee;
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
  &:not(:first-of-type) > .item.keyword,
  .small-step {
    text-align: left;
    justify-content: flex-start;
    font-size: 14px;
  }
`;
