import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";

import { AiFillDelete } from "../assets";
import { SmallStepDatesType } from "../../utils/constants/smallSteps";
import { useSmallSteps } from "../../utils/hooks";

type Props = {
  dates: SmallStepDatesType[];
  removeDates: string[];
  toggleToRemoveDates: (localDate: string) => void;
};

const Dates = ({ dates, removeDates, toggleToRemoveDates }: Props) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [count, setCount] = useState<number>(-1);
  const { setSmallSteps } = useSmallSteps();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;

      if (key === "Enter" && count !== -1 && linkRef.current) {
        linkRef.current.click();
      } else if (count === -1 && (key === "ArrowUp" || key === "ArrowDown")) {
        setCount((prev) => prev + 1);
        return;
      } else if (key === "ArrowUp") {
        if (count === 0) return;
        setCount((prev) => prev - 1);
      } else if (key === "ArrowDown") {
        if (count === dates.length - 1) return;
        setCount((prev) => prev + 1);
      }
    },
    [count, linkRef.current]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [count]);

  return (
    <>
      {dates.map(({ date, smallSteps }, i) => {
        const onClickSmallStep = () => {
          setSmallSteps(smallSteps);
        };

        const onClickDelete = () => {
          toggleToRemoveDates(date);
        };

        return (
          <DateItem
            key={date}
            className={`flex-center ${count === i ? "focused" : ""}`}
          >
            <AiFillDelete
              className={`${removeDates.includes(date) ? "remove" : ""}`}
              onClick={onClickDelete}
            />
            <Link
              to={`/${date}`}
              ref={count === i ? linkRef : null}
              onClick={onClickSmallStep}
            >
              <span>{date}</span>
              <span>{smallSteps.length}</span>
            </Link>
          </DateItem>
        );
      })}
    </>
  );
};

const DateItem = styled.li`
  position: relative;
  transition: all 300ms;
  &:nth-of-type(2n - 2) {
    background-color: #f2f5f5cc;
  }
  &:hover > svg {
    display: block;
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
  > a {
    display: inline-block;
    color: black;
    padding: 12px;
    > span {
      display: inline-block;
      width: 200px;
      text-align: center;
    }
  }
  > svg {
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translate(0, -50%);
    display: none;
    width: 18px;
    height: 18px;
    cursor: pointer;
    transition: color 300ms cubic-bezier(0.55, 0.95, 0.7, 1.2);
    &:hover {
      color: #ff6666;
    }
    &.remove {
      display: block;
      color: #ff6666;
      &:hover {
        color: #6666ff;
      }
    }
  }
`;

export default Dates;
