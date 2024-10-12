"use client";
import { useContext, useEffect, useState } from "react";
import MultipChoice from "./MultipChoice";
import BoardQuestion from "./BoardQuestion";
import CountDown from "./CountDown";
import { ExaminationContext } from "@/contexts/ExaminationContext";
import ReviewBox from "./ReviewBox";
import { Icon } from "../Icons";

export type Question = {
  id: number;
  question: string;
  answers?: string[];
  key: string;
  type: string;
  img?: string;
  audio?: string;
  passed?: boolean;
  difficulty: string;
};

//idea: Test code: a0bc. with: HSK[a] and Test[bc]
export default function ExaminationContent() {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const confirmLeave = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Chuỗi không cần thiết cho một số trình duyệt
      return "Bạn có chắc muốn rời khỏi trang này?"; // Hiển thị thông báo xác nhận
    };

    window.addEventListener("beforeunload", confirmLeave);

    return () => {
      window.removeEventListener("beforeunload", confirmLeave);
    };
  }, []);

  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      type: "reading",
      question: "Do you know ...",
      img: "",
      audio: "",
      answers: ["A", "B", "C", "D"],
      key: "A",
      difficulty: "HSK1",
    },
  ]);
  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/question.json")
      .then((response) => response.json())
      .then((data) => setQuestions(data));
  }, []);

  const [difficulty, setDifficulty] = useState("HSK1");
  const [type, setType] = useState(0); // 0:r+l / 1:reading / 2:listening

  const [content, setTest] = useState(0);
  const [review, setReview] = useState(false);
  const { page, numberOfQuestions, changePage, init, time, changeTime } =
    useContext(ExaminationContext);

  const loDs /*lv of difficulty */ = [
    "HSK1",
    "HSK2",
    "HSK3",
    "HSK4",
    "HSK5",
    "HSK6",
    "HSK7",
    "HSK8",
    "HSK9",
  ];
  const tests = Array.from({ length: 20 });
  // const questions: Question[] = [
  //   {
  //     question: "Is this website good?",
  //     answers: ["No", "Not Bad", "Excellent"],
  //     key: "Excellent",
  //     passed: true,
  //     id: "1",
  //     difficulty: "",
  //   },
  //   {
  //     question: "1 / 0 = ",
  //     answers: ["0", "1", "Wrong"],
  //     key: "Wrong",
  //     id: "2",
  //     difficulty: "HSK1",
  //   },
  //   {
  //     question: "What color is Oggy cat ?",
  //     answers: ["Black", "Orange", "Blue"],
  //     key: "Blue",
  //     difficulty: "HSK1",
  //     id: "3",
  //   },
  //   {
  //     question: "You + me = ",
  //     answers: ["2", "3", "we"],
  //     key: "we",
  //     id: "4",
  //     difficulty: "HSK1",
  //   },
  //   {
  //     question: "1 + 1 = ",
  //     answers: ["1", "2", "3"],
  //     key: "2",
  //     id: "5",
  //     difficulty: "HSK1",
  //   },
  // ];

  return (
    <>
      <div className="flex flex-col justify-start items-center lg:ml-[7%] w-full lg:w-[85%] h-full m-0">
        <div
          className={`flex h-16 flex-row items-center justify-center w-full `}
        >
          <h1 className="text-2xl font-bold text-center">Làm bài thi</h1>
        </div>

        <div
          className={`flex flex-col justify-center space-y-5 ${start ? "hidden" : ""}`}
        >
          <div className="flex flex-row justify-center space-x-6">
            <h1 className="text-center content-center">Chọn bài thi</h1>
            <select
              // defaultValue={0}
              className="select select-error w-1/4 md:w-24 max-w-xs !min-h-0 !h-8"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {loDs.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row justify-center space-x-6">
            <button
              className={`btn w-28 ${type == 0 ? "bg-secondary" : ""}`}
              onClick={() => setType(0)}
            >
              Đọc + Nghe
            </button>
            <button
              className={`btn w-28 ${type == 1 ? "bg-secondary" : ""}`}
              onClick={() => setType(1)}
            >
              Đọc
            </button>
            <button
              className={`btn w-28 ${type == 2 ? "bg-secondary" : ""}`}
              onClick={() => setType(2)}
            >
              Nghe
            </button>
          </div>
          <div className="flex flex-row flex-wrap justify-center">
            {tests.map((item, index) => (
              <div key={index} className="w-16 md:w-1/6 mb-4 mx-5 relative">
                <button
                  onClick={() => {
                    setTest(index + 1);
                  }}
                  className={`btn ${content == index + 1 ? "btn-secondary" : ""} w-full`}
                >
                  {index + 1}
                </button>
                <div className="flex justify-end right-0 bottom-1 absolute">
                  {index < 5 ? (
                    <Icon kind="tick" color="green" size={20}></Icon>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-10 disabled ">
            <label className="input input-bordered flex items-center gap-2 ">
              Number of Questions:
              <input type="number" className="w-12" defaultValue={5} />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              Time:
              <input
                type="number"
                className="w-12"
                value={time}
                onChange={(e) => changeTime(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="flex justify-center">
            <button
              className={`btn btn-primary w-40 ${content == 0 ? "btn-disabled" : ""}`}
              onClick={() => {
                setStart(true);
                init(time);
              }}
            >
              Bắt đầu
            </button>
          </div>
        </div>
        <div
          className={`flex flex-col justify-center w-full md:h-[65vh] items-center border-2 border-base-200 rounded-md ${start ? "" : "hidden"}`}
        >
          <MultipChoice questions={questions} />
          <div className="flex flex-row w-full h-full">
            <div className="flex items-center w-[50%] h-full">
              {page > 0 && (
                <button
                  className="btn btn-link"
                  onClick={() => changePage(page - 1)}
                >
                  ⇜Previous page
                </button>
              )}
            </div>
            <div className="flex items-center justify-end w-[50%]">
              {page < questions.length / numberOfQuestions - 1 && (
                <button
                  className="btn btn-link"
                  onClick={() => changePage(page + 1)}
                >
                  Next page ⇝
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-2 flex justify-end items-center m-5 lg:mr-6 ${start ? "" : "hidden"}`}
        >
          <button
            onClick={() => setReview(!review)}
            className="btn btn-outline w-24"
          >
            Review
          </button>
        </div>
        {review && (
          <ReviewBox
            numOfQuestions={questions.length}
            cancelReview={() => setReview(false)}
            endExam={() => setStart(false)}
          />
        )}
        <div
          className={`fixed flex-col right-6 top-16 flex z-20 bg-base-100 border-neutral-400 rounded-md md:border-none ${start ? "" : "hidden"}`}
        >
          <div className="flex justify-end items-center lg:mr-6 mb-2 h-full">
            <CountDown />
          </div>
          {/* <BoardQuestion /> */}
          <BoardQuestion numOfQuestions={questions.length} />
        </div>
      </div>
    </>
  );
}
