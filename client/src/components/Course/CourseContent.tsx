"use client";
import { useState } from "react";
import BuyStep from "./HSKCourse";
import Link from "next/link";

type Package = {
  name: string;
  content: string;
  price: number;
  vocabulary: number;
  lessions: number;
};
export default function CourseContent() {
  const packages: Package[] = [
    {
      name: "HSK 1",

      content:
        "Có thể hiểu và sử dụng cụm từ và câu tiếng Trung Quốc rất đơn giản.",
      lessions: 12,
      vocabulary: 150,
      price: 0,
    },
    {
      name: "HSK 2",
      content:
        "Có dùng tiếng Trung đơn giản để trao đổi trực tiếp về những câu chuyện quen thuộc hàng ngày.",
      price: 10,
      lessions: 15,
      vocabulary: 300,
    },
    {
      name: "HSK 3",
      content:
        "Có thể giao tiếp bằng tiếng Trung ở mức cơ bản trong cuộc sống như học tập, làm việc, đi du lịch v.v..",
      price: 20,
      lessions: 18,
      vocabulary: 600,
    },
    {
      name: "HSK 4",

      content:
        "Có thể hiểu và sử dụng cụm từ và câu tiếng Trung Quốc rất đơn giản.",
      lessions: 12,
      vocabulary: 150,
      price: 0,
    },
    {
      name: "HSK 5",
      content:
        "Có dùng tiếng Trung đơn giản để trao đổi trực tiếp về những câu chuyện quen thuộc hàng ngày.",
      price: 10,
      lessions: 15,
      vocabulary: 300,
    },
    {
      name: "HSK 6",
      content:
        "Có thể giao tiếp bằng tiếng Trung ở mức cơ bản trong cuộc sống như học tập, làm việc, đi du lịch v.v..",
      price: 20,
      lessions: 18,
      vocabulary: 600,
    },
    {
      name: "HSK 7",

      content:
        "Có thể hiểu và sử dụng cụm từ và câu tiếng Trung Quốc rất đơn giản.",
      lessions: 12,
      vocabulary: 150,
      price: 0,
    },
    {
      name: "HSK 8",
      content:
        "Có dùng tiếng Trung đơn giản để trao đổi trực tiếp về những câu chuyện quen thuộc hàng ngày.",
      price: 10,
      lessions: 15,
      vocabulary: 300,
    },
    {
      name: "HSK 9",
      content:
        "Có thể giao tiếp bằng tiếng Trung ở mức cơ bản trong cuộc sống như học tập, làm việc, đi du lịch v.v..",
      price: 20,
      lessions: 18,
      vocabulary: 600,
    },
  ];
  return (
    <div className="flex flex-col !bg-none">
      <div className="flex flex-row justify-center flex-wrap py-5">
        {packages.map((item, index) => (
          <div
            className="flex flex-col justify-around border-t-2 rounded-xl border-base-200 shadow-md m-3 w-4/5 lg:w-[30%]"
            key={index}
          >
            <h1 className="text-3xl text-center mt-5">{item.name}</h1>
            <div className="flex flex-col items-start pb-1 mx-5">
              <h3>Số bài: {item.lessions}</h3>
              <h3>Từ vựng: ~{item.vocabulary}</h3>
              <div className="my-5">
                <p>{item.content}</p>
              </div>
            </div>
            <div className="flex justify-center pb-6">
              <Link href={`/courses/hsk${index}`}>
                <button className="btn btn-outline border-2 !h-3">
                  Vào học
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
