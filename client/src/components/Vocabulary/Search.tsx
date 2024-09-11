import { Word } from "./Standard";

type Props = {
  words: Word[];
  key: string;
  search: (x: number) => void;
};

export default function Search() {
  return (
    <div className="flex flex-wrap justify-around ">
      <label className="input input-bordered flex items-center w-2/5 h-8 !min-h-0">
        <input type="text" className="grow" placeholder="Tra từ" />
        <button>
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
  );
}
