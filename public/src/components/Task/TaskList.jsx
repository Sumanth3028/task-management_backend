import React, { Fragment, useEffect, useRef, useState } from "react";
import axios from "axios";
import { HiMenuAlt2, HiOutlineLogout } from "react-icons/hi";
import { MdOutlineDashboard, MdDoneOutline, MdLocalTaxi } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";


import { AiTwotoneEdit, AiTwotoneDelete, AiOutlinePlus } from "react-icons/ai";
import SearchBar from "./SearchBar";
import { Link, Navigate, redirect, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import Modal2 from "../Modal/Modal2";

const TaskList = (props) => {
  const [tasks, setTasks] = useState([]);
  const [titled, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [edit, setEdit] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [edittaskID, setEdittaaskID] = useState(0)

  const navigate = useNavigate();
  let token;
  useEffect(() => {
    token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }

    getData();
  }, []);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const taskData = { title, description };
      const response = await axios.post(
        "http://34.230.16.104:5000/postTasks",
        taskData,
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      setTasks((previousTasks) => [...previousTasks, response.data.data]);
      toast.success("Sucessfully created task!")
      getData();
      
    } catch (err) {
      toast.error("Something went Wrong")
      return err;
    }
  };

  const getData = async () => {
    let result = await axios.get("http://34.230.16.104:5000/getTasks", {
      headers: { Authorization: localStorage.getItem("token") },
    });

    setTasks(result.data.task);
    setDesc(result.data.desc);
    setTitle(result.data.title);
    // setTasks((previousTasks) => [...previousTasks, result.data.data])
  };
  const [open, setOpen] = useState(true);

  const markedAsDoneHandler = async (id) => {
    const response = await axios.post(`http://34.230.16.104:5000/marked/${id}`);
    getData();
  };

  const deleteHandler = async (id) => {
    const response = await axios.post(`http://34.230.16.104:5000/delete/${id}`);
    getData();
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
  };

  const editHandler = async (e, id) => {
    e.preventDefault();
    try {
      const editedData = { title: titled, description: desc };
      const res = await axios.post(
        `http://34.230.16.104:5000/editTasks/${id}`,
        editedData
      );
      toast.success("Sucessfully edited!")
      getData();
    } catch (err) {
      toast.error("Something went Wrong")
      return err
    }
  };

  return (
    <>
      <section className="flex">
        <div
          className={`bg-black min-h-screen ${
            open ? "w-[250px]" : "w-16"
          } duration-500 text-gray-100 px-4  `}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt2
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            ></HiMenuAlt2>
          </div>
          <div className=" flex">
            {/* comp 1 */}
            <div className="mb-8 flex flex-col gap-4 relative">
              <Link
                to="/task"
                className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-700"
              >
                <div>
                  <MdOutlineDashboard size={20}></MdOutlineDashboard>
                </div>
                <h2
                  style={{ transitionDelay: `300ms` }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Dashboard
                </h2>
              </Link>

              <Link
                to="/login"
                className="flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-700"
              >
                <div>
                  <HiOutlineLogout
                    size={20}
                    onClick={logoutHandler}
                  ></HiOutlineLogout>
                </div>
                <h2
                  style={{ transitionDelay: `300ms` }}
                  className={`whitespace-pre duration-500 ${
                    !open && "opacity-0 translate-x-28 overflow-hidden"
                  }`}
                >
                  Logout
                </h2>
              </Link>
            </div>
          </div>
        </div>

        {/* add here  */}
        <div className="w-full flex flex-col">
          {" "}
          <div>
            <SearchBar />
          </div>
          <div className="my-24 mx-24">
            {/* tasks  */}

            <div className=" md:flex justify-center gap-80">
              <div className=" flex flex-col">
                <h2 className="text-xl my-2 text-center font-bold">
                  In Progress
                </h2>
                {tasks.map((item) => {
                  if (item.markedascomplete === false) {
                    return (
                      <div
                        key={item.id}
                        className="bg-[#F9F9F9] px-4 py-2 my-2 rounded-2xl h-auto w-[400px]"
                      >
                        <p className="mx-4 my-4 font-semibold text-lg">
                          {item.title}
                        </p>
                        <p className="mx-4 my-4 text-[#C5C5C5] text-lg">
                          {item.description}
                        </p>
                        <p className="mx-4 my-4 font-bold text-xl flex justify-end gap-6">
                          {" "}
                          <MdDoneOutline
                            onClick={() => markedAsDoneHandler(item.id)}
                          />{" "}
                          <AiTwotoneEdit
                            onClick={(e) => {
                              setEdit(true);
                              setEdittaaskID(item.id)
                              handleOpenModal();
                            }}
                          />{" "}
                          <AiTwotoneDelete
                            onClick={() => deleteHandler(item.id)}
                          />{" "}
                        </p>
                       
                      </div>
                    );
                  }
                })}
              </div>
              <div className=" flex flex-col">
                <h2 className="text-xl my-2 text-center font-bold">
                  Completed
                </h2>
                {tasks.map((item) => {
                  if (item.markedascomplete === true) {
                    return (
                      <div
                        key={item.id}
                        className="bg-[#FFB255] px-4 py-2 my-2 rounded-2xl h-auto w-[400px]"
                      >
                        <p className="mx-4 my-4 text-white font-semibold text-lg">
                          {item.title}
                        </p>
                        <p className="mx-4 my-4 text-white text-lg">
                          {item.description}
                        </p>
                        <p className="mx-4 my-4 font-bold text-xl flex justify-end gap-6">
                          {" "}
                          <AiTwotoneDelete
                            onClick={() => deleteHandler(item.id)}
                          />{" "}
                        </p>
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              
              handleOpenModal();
              setEdit(false)
            }}
            className=" fixed top-[87%] left-[90%] h-20 w-20 text-5xl items-center  bg-[#FFB255] rounded-full "
          >
            <AiOutlinePlus className="mx-auto" />
          </button>
          <Modal isOpen={modalIsOpen} onClose={handleCloseModal}>
                          {/* comp2 */}
                          <div >
                            <div className="p-8 flex shadow-md bg-[#FFB255] mt-8 items-center text-center rounded-md mx-auto">
                              <div className="flex w-[500px] h-[400px]">
                                <form
                                 
                                  className="mx-auto"
                                >
                                  <label className="text-2xl text-blue-700 font-semibold">
                                    Title:
                                  </label>
                                  <input
                                    name="title"
                                    type="text"
                                    id="title"
                                    className="text-xl w-full  mb-12 h-12 border focus:border-purple-700 rounded-md text-center "
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                  ></input>
                                  <label className="text-2xl  text-blue-700 font-semibold">
                                    Description:
                                  </label>
                                  <input
                                    name="description"
                                    type="text"
                                    id="description"
                                    className=" text-xl  w-full h-16 border focus:outline-none focus:ring  focus:border-purple-700 rounded-md text-center "
                                    onChange={(e) => setDesc(e.target.value)}
                                    required
                                  ></input>
                                  <button
                                  onClick={ (e) =>{ !edit ? submitHandler(e) : editHandler(e, edittaskID) }}
                                    type="submit"
                                    className="text-xl border text-black py- my-6 bg-blue-700 font-semibold  rounded-md"
                                  >
                                 
                                 {edit ? "Update" : "Submit"}
                                  </button>
                                </form>
                              </div>
                            </div>
                          </div>
                        </Modal>
        </div>
      </section>
    </>
  );
};

export default TaskList;
