// import { useState } from 'react';
import Link from "next/link";
import { Icon } from "../Icons";
import Image from "next/image";

type Personal = {
  topic: number;
  question: string;
  answer: string;
};
export default function Personal() {
  const topics = [
    { title: "Danh sách từ yêu thích", image: "flash-card.png", content: "" },
    { title: "Học nhanh với Flash card", image: "", content: "" },
  ];
  return (
    <div className="flex w-[80%] overflow-auto">
      {topics.map((item, index) => (
        <div
          className="flex flex-col justify-around items-center border-t-2 rounded-xl border-base-200 shadow-md m-3 w-4/5 lg:w-[30%]"
          key={index}
        >
          <h1 className="text-xl text-center mt-5">{item.title}</h1>
          <Image alt="" src={`/${item.image}`} width={20} height={20}></Image>
          <div className="flex flex-col items-start pb-1 mx-5">
            <h3>Số bài: {item.title}</h3>
            <h3>Từ vựng: ~{item.content}</h3>
            <div className="my-5">
              <p>{item.title}</p>
            </div>
          </div>
          <div className="flex justify-center pb-6">
            <Link href={``}>
              <button className="btn btn-outline border-2 !h-3" disabled>
                Coming soon!
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
