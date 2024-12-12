'use client';

import React, { useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//WITHOUT TYPING

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const inputReference = useRef(null);

  const handleAddTask = () => {
    const inputValue = inputReference?.current?.value as string;
    if(!inputValue){
      toast.warn('please enter your task', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
        });
      return; 
    }
    setTasks([{ title: inputValue, id: nanoid() }, ...tasks]);
    toast.success('Task Added Successfully', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      });
    if(inputReference.current){
      inputReference.current.value = ''
    }
   
  };

  function OnkeyEnter(my_key:React.KeyboardEvent){
    console.log(my_key.key)
    if(my_key.key === 'Enter'){
      handleAddTask()
    }
  }



function deleteTask(e:string){

  setTasks(tasks.filter((elem)=>elem.id !== e))
  toast.error('Task Deleted!', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Bounce,
    });
}

  return (
    <div>
      <div className=''>
        <div className='bg-black text-yellow-400 h-12 text-center  text-4xl font-bold mb-4'>
          <h1>Task Manager</h1>
        </div>
        <input onKeyDown={OnkeyEnter}
          ref={inputReference} 
          className='border-2 border-gray-700 rounded p-2 m-4'
        />
        <button
          onClick={handleAddTask}
          className='bg-black p-2 font-semibold text-yellow-400 rounded px-3'
        >
          Add Task
        </button>
      </div>
      <ul>
        {
        
        tasks.length == 0 ? <h1 className='bg-gray-400 p-8'>No Task Availble!</h1> : tasks.map((elem,index) => {
          return <div className='bg-gray-400 flex justify-between px-4 p-4'>
            <li className='m-4' key={elem.id}>{index + 1}. {elem.title}</li>
            <button onClick={()=>{
              deleteTask(elem.id)
            }} className='bg-red-400 p-4'>Delete</button>
          </div>
        })}
      </ul>
      <ToastContainer />
    </div>
  );
}

// WITH TYPING

// export default function Home() {
//   const [tasks, setTasks] = useState<{ title: string; id: string }[]>([]);

//   const inputReference = useRef<HTMLInputElement>(null);

//   const handleAddTask = () => {
//     const inputValue = inputReference?.current?.value as string;
//     setTasks([{ title: inputValue, id: nanoid() }, ...tasks]);
//   };

//   return (
//     <div>
//       <div className='flex gap-2'>
//         <input
//           ref={inputReference}
//           className='border-2 border-gray-700 rounded'
//         />
//         <button
//           onClick={handleAddTask}
//           className='bg-blue-600 text-white rounded px-3'
//         >
//           Add Task
//         </button>
//       </div>
//       <ul>
//         {tasks.map((elem) => {
//           return <li key={elem.id}>{elem.title}</li>;
//         })}
//       </ul>
//     </div>
//   );
// }
