import { useEffect, useState } from "react";

const useDebounce = (data, delay, isCompare = false, callback) => {
  const [debounceSearch, setDebounceSearch] = useState(data);

  const handleCheckTwoArrayEqual = () => {
    if (debounceSearch.length !== data.length) return false;
    for (let i = 0; i < debounceSearch.length; ++i) {
      if (!data.includes(data[i])) return false;
    }

    return true;
  };

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (isCompare) {
        if (!handleCheckTwoArrayEqual()) {
          setDebounceSearch(data);
          typeof callback === "function" && callback();
        }
      } else {
        setDebounceSearch(data);
        typeof callback === "function" && callback();
      }
    }, delay);

    return () => clearTimeout(timerId);
  }, [data]);

  return debounceSearch;
};

export default useDebounce;
