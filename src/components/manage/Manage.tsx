import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CgCalendarDates } from "react-icons/cg";
import { AiFillCheckSquare } from "react-icons/ai";
import styled from "@emotion/styled";

import useSmallSteps from "../../utils/hooks/useSmallSteps";

export const Manage = () => {
  const { all, setSmallSteps } = useSmallSteps();
  const [count, setCount] = useState<number>(-1);
  const r = useRef<HTMLAnchorElement>(null);

  const onKeyDown = (e: KeyboardEvent) => {
    const key = e.key;

    if (key === "Enter" && count !== -1) {
      r.current?.click();
    }

    if (count === -1 && (key === "ArrowUp" || key === "ArrowDown")) {
      setCount((prev) => prev + 1);
      return;
    }

    if (key === "ArrowUp") {
      if (count === 0) return;
      setCount((prev) => prev - 1);
    } else if (key === "ArrowDown") {
      if (count === all.length - 1) return;
      setCount((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  return (
    <ManageWrap>
      <ul>
        <li>
          <span>
            <CgCalendarDates /> 날짜
          </span>
          <span>
            <AiFillCheckSquare /> 개수
          </span>
        </li>
        {all.map(({ date, smallSteps }, i) => {
          const onClick = () => {
            setSmallSteps(smallSteps);
          };

          return (
            <li
              key={date}
              className={count === i ? "focused" : ""}
              onClick={onClick}
            >
              <Link to={`/${date}`} ref={count === i ? r : null}>
                <span>{date}</span>
                <span>{smallSteps.length}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </ManageWrap>
  );
};

const ManageWrap = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  > ul {
    border: 1px solid #d2d2d2;
    > li {
      display: flex;
      transition: all 300ms;
      &:first-of-type {
        padding: 12px;
        border-bottom: 1px solid #d2d2d2;
        font-weight: bold;
        > span {
          display: flex;
          align-items: center;
          justify-content: center;
          > svg {
            margin-right: 4px;
          }
        }
      }
      &:nth-of-type(2n - 2) {
        background-color: #f2f5f5cc;
      }
      &.focused {
        position: relative;
        box-shadow: inset 1px 0 0 #dadce0, inset -1px 0 0 #dadce0,
          0 1px 2px 0 rgb(60 64 67 / 30%), 0 1px 3px 1px rgb(60 64 67 / 15%);
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          display: block;
          height: 100%;
          width: 3px;
          background-color: #4d90f0;
        }
      }
      a {
        display: inline-block;
        color: black;
        padding: 12px;
      }
      span {
        display: inline-block;
        width: 200px;
        text-align: center;
      }
    }
  }
`;

export default Manage;
