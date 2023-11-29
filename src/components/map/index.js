import { useEffect } from "react";

const Map = () => {
  useEffect(() => {
    fetch("https://dummyjson.com/products/1")
      .then((res) => res.json())
      .then((json) => console.log(json));
  }, []);

  return <div></div>;
};

export default Map
