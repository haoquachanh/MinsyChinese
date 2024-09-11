/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import { getApi } from "@/utils/axiosCofig";

interface UserData {
  fullname?: string;
  email?: string;
  avatar?: string;
  role?: string;
  id?: string;
  created?: string;
  updated?: string;
  birth?: string;
  phone?: string;
  status?: string;
}

export default function MinCourse() {
  const [userData, setData] = useState<UserData>({});
  const { access_token } = useContext(AuthContext);
  useEffect(() => {
    async function getInfo() {
      if (!access_token) return;
      const data = await getApi("user/profile", access_token);
      console.log("🚀 ~ ProfileContent ~ data:", data);
      setData(data);
    }
    getInfo();
  }, [access_token]);
  return (
    <div>
      <div role="tablist" className="tabs tabs-bordered mt-12">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab mx-5 px-5"
          aria-label="Lớp Kèm 1v1"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <h1>Lớp học siêu tốc Kèm 1v1 theo nhu cầu</h1>
          <h2>Linh hoạt - Chủ động - Hiệu quả tối đa</h2>
          <p>Học trực tiếp với Minsy Lão shi :))</p>
          <button className="btn">Đăng ký</button>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab mx-5 px-5"
          aria-label="Ghép lớp"
        />
        <div role="tabpanel" className="tab-content p-10">
          <h1>
            Lớp học ghép các bạn có trình độ tương đương nhau giúp tối ưu chi
            phí
          </h1>
          <h2>
            Tương tác số đông - Không khí lớp học, cạnh tranh - Hiệu quả cao
          </h2>
          <p>Học trực tiếp với Minsy Lão shi :))</p>
          <button className="btn">Đăng ký</button>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab mx-5 px-5"
          aria-label="Lớp video"
        />
        <div role="tabpanel" className="tab-content p-10">
          Comming soon!
        </div>
      </div>
    </div>
  );
}
