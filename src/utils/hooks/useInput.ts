import { ChangeEvent, useCallback, useState } from "react";

type ElementHasValue = HTMLInputElement | HTMLTextAreaElement;

const useInput = (defaultValue?: string) => {
  const [value, setValue] = useState<string>(defaultValue ?? "");

  const onChange = useCallback((e: ChangeEvent<ElementHasValue>) => {
    setValue(e.currentTarget.value);
  }, []);

  return [value, onChange, defaultValue, setValue] as const;
};

export default useInput;
