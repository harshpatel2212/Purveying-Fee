import React from "react";
import { useGlobalContext } from "../context/GlobalContext";

const CreateClass = () => {
  const { data } = useGlobalContext();
  return <div>CreateClass</div>;
};

export default CreateClass;
