import { useState } from "react";

function Timer({ time }) {
  const [time, setTime] = useState;

  useEffect(() => {
    const time = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
    return () => clearInterval(time);
  }, []);

  return 
}