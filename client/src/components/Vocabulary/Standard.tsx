/* eslint-disable @next/next/no-img-element */
type Word = {
  id: number;
  zhs: string;
  // Tiếng Trung Giản Thể: Thường được ký hiệu là zh-Hans ("Hans" viết tắt của "Han Simplified").
  zht: string;
  // Tiếng Trung Phồn Thể: Thường được ký hiệu là zh-Hant ("Hant" viết tắt của "Han Traditional").
  pinyin?: string;
  mean: string;
  img?: string;
  audio?: string;
  write?: string;
};
export default function Standard() {
  const words: Word[] = [
    { id: 1, zht: "愛", zhs: "你", mean: "bạn, anh, chị,...", pinyin: "nǐ" },
  ];
  return (
    <div className="w-full lg:w-4/5">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Hán tự</th>
            <th>Pinyin</th>
            <th>Nghĩa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-bold">{word.zhs}</div>
                  </div>
                </div>
              </td>
              <td>{word.pinyin}</td>
              <td>{word.mean}</td>
              <th>
                <button className="btn btn-ghost btn-xs">details</button>
              </th>
            </tr>
          ))}
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
