"use client";

import Image from "next/image";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Home() {
  type Tasks = {
    tasks: string;
  };

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState<Tasks>({
    tasks: "",
  });

  const handleInput = (e: any) => {
    const { name, value } = e.target;
    setTasks({ ...tasks, [name]: value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const supabase = await createClient();

      const { data, error } = await supabase
        .from("todo")
        .insert([{ duties: tasks }])
        .select();

      if(data) {
        alert("Inserted sucessfully")
      }

    } catch (error) {
      console.error(error)
      alert(error)
    }
  };

  return (
    <section className="bg-slate-900 flex justify-center items-center h-[100dvh]">
      <div className="bg-amber-50 flex flex-col h-[80dvh] w-160">
        <div className="bg-amber-50 flex justify-between items-center h-[80dvh] w-160">
          <div className="text-black ml-7 font-bold text-[50px]">TODO APP</div>

          <button
            onClick={() => setOpen(true)}
            className="bg-slate-900 flex p-5 rounded-full mr-5 w-7 h-7 font-bold text-[30px] items-center justify-center hover:cursor-pointer"
          >
            +
          </button>
        </div>
        <div className="text-black flex justify-start bg-gray-300 p-5 m-8 mt-1 h-[180dvh] font-bold text-[20px] pl-2">
          Add Task
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            onClick={() => setOpen(false)}
            className="absolute w-full h-[100dvh] bg-black opacity-80"
          />
          <div className="flex gap-8 p-5 bg-white w-100 flex-col relative">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 text-black font-bold size-20px">
              <label className="text-black font-bold text-2xl">Task Name</label>
              <input
                type="text"
                name="tasks"
                id="tasks"
                onChange={handleInput}
                className="border-black border-1 text-black p-2 w-full"
              />
              <button
                type="submit"
                className="flex justify-center items-center bg-amber-950 border-1 text-white border-amber-950 p-3 hover:cursor-pointer hover:bg-red-500 "
              >
                Add
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
