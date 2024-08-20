"use client";
import { useState } from "react";
import Standard from "./Standard";
import QandA from "./QandA";

export default function Vocabulary() {
  const [topic, setTopic] = useState("1");
  return (
    <>
      <div className="flex flex-col w-full h-full py-5">
        <div className="flex border-b-2 w-full space-x-3 mb-5">
          <button
            className={`btn rounded-b-none bg-none ml-3 ${topic === "1" ? "btn-active" : ""} w-32`}
            onClick={() => setTopic("1")}
          >
            Tiêu chuẩn
          </button>
          <button
            onClick={() => setTopic("2")}
            className={`btn rounded-b-none ${topic === "2" ? "btn-active" : ""} w-32`}
          >
            HSK 6
          </button>
          <button
            onClick={() => setTopic("3")}
            className={`btn rounded-b-none ${topic === "3" ? "btn-active" : ""} w-32`}
          >
            HSK 9
          </button>
        </div>
        <div className="flex p-5 w-full h-5/6 max-h-[calc(100vh-12rem)] overflow-auto justify-center">
          {topic === "1" ? <Standard /> : <QandA />}
        </div>
      </div>
    </>
  );
}
