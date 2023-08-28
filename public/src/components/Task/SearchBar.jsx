import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { HiAtSymbol } from "react-icons/hi";

const SearchBar = (props) => {
  const [name, setName] = useState("");

  const getUserData = async () => {
    const response = await axios.get("http://34.230.16.104:5000/username", {
      headers: { Authorization: localStorage.getItem("token") },
    });
   setName(response.data.username[0].name)
  
  };
  useEffect(() => {
    getUserData()

  }, []);
  return (
    <div className="h-14 fixed bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-between w-full">
      <div className="flex px-2 items-center">
        <AiOutlineSearch size={32} />
        <input
          type="text"
          placeholder="Search for tasks"
          className="bg-transparent text-white placeholder-gray-200 outline-none mx-2 focus:ring-0 text-xl"
        ></input>
      </div>
      <div className="flex mr-64">
        <HiAtSymbol className="h-7 w-7 text-white" />
        <p className="text-white text-lg"> {name}</p>
      </div>
    </div>
  );
};

export default SearchBar;
