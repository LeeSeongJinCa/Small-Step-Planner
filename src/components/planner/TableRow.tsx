import { FC } from "react";
import { AiFillDelete } from "react-icons/ai";
import styled from "@emotion/styled";

export const DateCheckbox = ({
  localDate,
  checkedList,
  onChange,
}: {
  localDate: string;
  checkedList: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
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

export const Delete = ({ onClick }: { onClick: () => void }) => {
  return <AiFillDelete onClick={onClick} />;
};

export const Keyword: FC = ({ children }) => {
  return <span className="item keyword">{children}</span>;
};

export const SmallStep: FC = ({ children }) => {
  return <span className="item small-step">{children}</span>;
};

export const TableRow: FC = ({ children }) => {
  return <TableRowWrap>{children}</TableRowWrap>;
};

const TableRowWrap = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  flex: 1 1 0;
  &:nth-of-type(2n) {
    background-color: #eeeeee;
  }
  > svg {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 100%;
    top: 50%;
    transform: translateY(-50%);
    color: #9a9a9a;
    &:hover {
      color: black;
    }
  }
  &:not(:first-of-type) {
    > .item {
      &.keyword,
      &.small-step {
        text-align: left;
        justify-content: flex-start;
        font-size: 14px;
      }
    }
  }
`;
