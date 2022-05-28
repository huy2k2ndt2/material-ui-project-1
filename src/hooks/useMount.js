import React, { useEffect, useRef } from "react";

const useMount = () => {
  const mount = useRef(true);
  useEffect(() => {
    return () => {
      return (mount.current = false);
    };
  }, []);

  return mount.current;
};

export default useMount;
