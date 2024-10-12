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

export type Section = {
  id: number;
  questions: number[];
  passed: boolean;
  difficulty: string;
};
export type Test = {
  reading: Section[];
  listening: Section[];
  mix: Section[];
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

  const [questions, setQuestions] = useState<number[]>([]);

  const [tests, setTests] = useState<Test>({
    reading: [
      {
        id: 1,
        questions: [1, 2, 3, 4, 5],
        passed: false,
        difficulty: "HSK1",
      },
    ],
    listening: [
      {
        id: 1,
        questions: [1, 2, 3, 4, 5],
        passed: false,
        difficulty: "HSK1",
      },
    ],
    mix: [
      {
        id: 1,
        questions: [1, 2, 3, 4, 5],
        passed: false,
        difficulty: "HSK1",
      },
      {
        id: 1,
        questions: [1, 2, 3, 4, 5],
        passed: false,
        difficulty: "HSK1",
      },
    ],
  });

  useEffect(() => {
    // Fetch data from the JSON file
    // fetch("/question.json")
    //   .then((response) => response.json())
    //   .then((data) => setQuestions(data));
    fetch("/tests.json")
      .then((res) => res.json())
      .then((data) => setTests(data));
  }, []);

  const [difficulty, setDifficulty] = useState("HSK1");
  const [type, setType] = useState<"listening" | "reading" | "mix">(
    "listening"
  );

  const [random, setRandom] = useState(false);
  const [escape, setEscape] = useState(false);
  const [content, setContent] = useState(0);
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
  const handleEscape = () => {
    setEscape(false);
    setStart(false);
  };
  const handleChangeType = (x: "listening" | "reading" | "mix") => {
    setType(x);
    setContent(0);
  };
  const handleChangeDifficulty = (e: string) => {
    setDifficulty(e);
    setContent(0);
  };
  // const tests = Array.from({ length: 20 });
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
          className={`flex h-16 flex-row items-center justify-center w-full lg:my-5`}
        >
          <h1 className="text-3xl font-bold text-center">Làm bài thi</h1>
        </div>

        <div
          className={`flex flex-col justify-center space-y-5 ${start ? "hidden" : ""}`}
        >
          <div className="flex flex-row justify-center space-x-6">
            <h1 className="text-center content-center text-lg">
              Độ khó bài thi
            </h1>
            <select
              // defaultValue={0}
              className="select select-error w-1/4 md:w-24 max-w-xs !min-h-0 !h-8"
              value={difficulty}
              onChange={(e) => handleChangeDifficulty(e.target.value)}
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
              className={`btn w-28 ${type == "mix" ? "bg-secondary" : ""}`}
              onClick={() => handleChangeType("mix")}
            >
              Đọc + Nghe
            </button>
            <button
              className={`btn w-28 ${type == "reading" ? "bg-secondary" : ""}`}
              onClick={() => handleChangeType("reading")}
            >
              Đọc
            </button>
            <button
              className={`btn w-28 ${type == "listening" ? "bg-secondary" : ""}`}
              onClick={() => handleChangeType("listening")}
            >
              Nghe
            </button>
          </div>
          <div
            className="flex flex-row flex-wrap justify-start lg:min-w-[65vw] border space-x-5 rounded-xl pt-2 pe-5 hover:bg-base-300"
            onClick={() => setRandom(false)}
          >
            <div className="flex w-full mb-2">
              <input
                type="radio"
                name="radio-7"
                className="radio radio-info mx-5"
                checked={!random}
              />
              <p>Bài thi soạn mẫu:</p>
            </div>
            {tests[type]
              .filter((i) => i.difficulty == difficulty)
              .map((item, index) => (
                <div
                  key={index}
                  className="flex flex-1 w-16 md:max-w-44 md: min-w-36 mb-4 relative"
                >
                  <button
                    onClick={() => {
                      setContent(index + 1);
                    }}
                    className={`btn ${content == index + 1 ? "btn-secondary" : ""} w-full`}
                  >
                    {index + 1}
                  </button>
                  <div className="flex justify-end right-0 bottom-1 absolute">
                    {item.passed && (
                      <Icon kind="tick" color="green" size={20}></Icon>
                    )}
                  </div>
                </div>
              ))}
            {/* {tests.map((item, index) => (
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
            ))} */}
          </div>

          <div
            className="flex flex-row flex-wrap justify-center border rounded-xl py-2 hover:bg-base-300"
            onClick={() => setRandom(true)}
            aria-disabled
          >
            <div className="flex w-full mb-2">
              <input
                type="radio"
                name="radio-7"
                className="radio radio-info mx-5"
                // onChange={() => setRandom(true)}
                checked={random}
              />
              <p>Bài thi tùy chỉnh:</p>
            </div>
            <div className="flex justify-center space-x-10 lg:justify-around">
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
          </div>
          <div className="flex justify-center pb-5">
            <button
              className={`btn btn-primary w-40 ${content == 0 && !random ? "btn-disabled" : ""}`}
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
          className={`flex flex-1 flex-col justify-between w-full md:min-h-[65vh] border-2 border-base-200 rounded-md ${start ? "" : "hidden"}`}
        >
          <MultipChoice questions={tests[type][content].questions} />
          <div className="flex flex-row w-full h-full">
            <div className="flex items-center justify-start w-[50%] h-20">
              {page > 0 && (
                <button
                  className="btn btn-link"
                  onClick={() => changePage(page - 1)}
                >
                  ⇜ Câu hỏi trước
                </button>
              )}
            </div>
            <div className="flex items-center justify-end w-[50%] h-20">
              {page <
                tests[type][content].questions.length / numberOfQuestions -
                  1 && (
                <button
                  className="btn btn-link"
                  onClick={() => changePage(page + 1)}
                >
                  Câu tiếp theo ⇝
                </button>
              )}
            </div>
          </div>
        </div>
        <div
          className={`${escape ? "fixed" : "hidden"} flex h-screen w-screen top-0 left-0 bg-primary/20 justify-center items-center !z-50`}
        >
          <div className="flex w-[90%] md:w-3/5 h-[50vh] bg-primary flex-col items-center justify-center rounded-xl bg-primary/95">
            <h1 className="text-3xl h-[10%]">Thoát bài thi?</h1>
            <div className="flex w-full h-[10%]"></div>
            <div className="flex h-12 space-x-10">
              <button
                onClick={() => handleEscape()}
                className="btn btn-neutral/100"
              >
                Dừng lại và thoát
              </button>
              <button
                onClick={() => setEscape(false)}
                className="btn btn-neutral/100"
              >
                Tiếp tục làm bài
              </button>
            </div>
          </div>
        </div>
        <div
          className={`fixed bottom-2 flex justify-end items-center space-x-10 m-5 lg:mr-6 ${start ? "" : "hidden"}`}
        >
          <button
            onClick={() => setEscape(true)}
            className="btn btn-outline w-24"
          >
            Thoát
          </button>
          <button
            onClick={() => setReview(!review)}
            className="btn btn-outline w-24"
          >
            Xem lại
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
