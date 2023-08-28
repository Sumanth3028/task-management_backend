import React from 'react';


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-[20%] left-[40%] w-[35%] h-[60%] p-[100px] flex items-center justify-center  mt-3 rounded-xl   ">
     
       
       {children}

       <button className="absolute top-2 right-2 text-lg text-black" onClick={onClose}>
          close
        </button>
      
    </div>
  );
};

export default Modal;
