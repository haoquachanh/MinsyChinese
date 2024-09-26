import { pages } from "next/dist/build/templates/app-page";
import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import Search from "./Search";
import { Icon } from "../Icons";

/* eslint-disable @next/next/no-img-element */
export type Word = {
  id: number;
  Hans: string;
  // Tiếng Trung Giản Thể: Thường được ký hiệu là zh-Hans ("Hans" viết tắt của "Han Simplified").
  zht: string;
  // Tiếng Trung Phồn Thể: Thường được ký hiệu là zh-Hant ("Hant" viết tắt của "Han Traditional").
  pinyin: string;
  mean: string;
  img?: string;
  audio?: string;
  write?: string;
};
export default function Standard() {
  const [page, setPage] = useState(0);
  const [words, setWords] = useState<Word[]>([
    { id: 1, zht: "愛", Hans: "你", mean: "bạn, anh, chị,...", pinyin: "nǐ" },
  ]);

  const [keySearch, setKeySearch] = useState("");
  const [inputKey, setInputKey] = useState("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputKey(event.target.value);
  };
  useEffect(() => {
    // Fetch data from the JSON file
    fetch("/data-exam.json")
      .then((response) => response.json())
      .then((data) => setWords(data));
  }, []);

  const handleSearch = () => {
    if (inputKey.trim() !== "") {
      // Thực hiện tìm kiếm hoặc xử lý khác
      console.log("Searching for:", inputKey);
      setKeySearch(inputKey);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="w-full lg:w-4/5">
      <div className="flex flex-wrap justify-around ">
        <button
          className={`${keySearch ? "" : "hidden"}`}
          onClick={() => setKeySearch("")}
        >
          <Icon kind="exit" color="purple"></Icon>
        </button>
        <label className="input input-bordered flex items-center w-2/5 h-8 !min-h-0">
          <input
            type="text"
            className="grow"
            placeholder="Tra từ"
            value={inputKey}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </label>
        <select className="select select-secondary w-2/5 lg:w-1/5 max-w-xs h-8 !min-h-0">
          <option disabled defaultValue={0}>
            Tra trong
          </option>
          <option value={0}>All</option>
          <option value={1}>HSK 1</option>
          <option>HSK 2</option>
          <option>HSK 3</option>
          <option>HSK 4</option>
        </select>
      </div>

      {/* <Search /> */}
      <table className="table text-xl">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>
              {/* <label>
                <input type="checkbox" className="checkbox" />
              </label> */}
            </th>
            <th>Hán tự</th>
            <th>Pinyin</th>
            <th>Nghĩa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {words
            .filter(
              (word) =>
                word.mean.includes(keySearch) ||
                word.Hans.includes(keySearch) ||
                word.pinyin?.includes(keySearch)
            )
            .filter(
              (word) =>
                (word.id > page * 20 && word.id <= (page + 1) * 20) ||
                keySearch !== ""
            )
            .map((word) => (
              <tr key={word.id}>
                <th className="font-normal">{word.id}</th>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="from-neutral-800 grow text-3xl tracking-widest">
                        {word.Hans}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{word.pinyin}</td>
                <td>{word.mean}</td>
                <th>
                  {true ? (
                    <button
                      className="tooltip"
                      data-tip={`Thêm vào danh sách yêu thích`}
                    >
                      {/* Thêm vào dsach yêu thích */}
                      <Icon kind="heart"></Icon>
                    </button>
                  ) : (
                    <button
                      className="tooltip"
                      data-tip={`Xóa khỏi danh sách yêu thích`}
                    >
                      <Icon kind="heartfill"></Icon>
                    </button>
                  )}
                </th>
              </tr>
            ))}
        </tbody>

        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>
              {/* <label>
                <input type="checkbox" className="checkbox" />
              </label> */}
            </th>
            <th>Hán tự</th>
            <th>Pinyin</th>
            <th>Nghĩa</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      {!keySearch && (
        <Pagination
          currentPage={page}
          length={Math.ceil(words.length / 20)}
          setPage={setPage}
        />
      )}
    </div>
  );
}
