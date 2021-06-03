import { useCallback, useState } from "react";

const useToggle = (defaultValue?: boolean) => {
  const [value, setToggle] = useState<boolean>(defaultValue ?? false);

  const toggle = useCallback(() => {
    setToggle((prev) => !prev);
  }, []);

  return [value, toggle, value, setToggle] as const;
};

export default useToggle;
