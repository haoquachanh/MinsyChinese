/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
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
  const [userData, setUserData] = useState<UserData>({});
  const { access_token } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!access_token) return;
      try {
        const data = await getApi("user/profile", access_token);
        console.log("🚀 ~ User Profile Data:", data);
        setUserData(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [access_token]);

  return (
    <div className="flex justify-center items-center w-full">
      <div role="tablist" className="tabs tabs-bordered mt-12 w-full">
        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab mx-5 px-5"
          aria-label="Lớp Kèm 1v1"
          defaultChecked
        />
        <div role="tabpanel" className="tab-content p-10">
          <h1 className="text-2xl font-bold">
            Lớp học siêu tốc Kèm 1v1 theo nhu cầu
          </h1>
          <h2 className="text-xl font-semibold text-primary">
            Linh hoạt - Chủ động - Hiệu quả tối đa
          </h2>
          <p className="mt-4">Học trực tiếp với Minsy Lão shi :))</p>
          <button className="btn btn-primary mt-5">Đăng ký</button>
        </div>

        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab mx-5 px-5"
          aria-label="Ghép lớp"
        />
        <div role="tabpanel" className="tab-content p-10">
          <h1 className="text-2xl font-bold">
            Lớp học ghép các bạn có trình độ tương đương nhau giúp tối ưu chi
            phí
          </h1>
          <h2 className="text-xl font-semibold text-primary">
            Tương tác số đông - Không khí lớp học, cạnh tranh - Hiệu quả cao
          </h2>
          <p className="mt-4">Học trực tiếp với Minsy Lão shi :))</p>
          <button className="btn btn-primary mt-5">Đăng ký</button>
        </div>

        <input
          type="radio"
          name="course_tabs"
          role="tab"
          className="tab mx-5 px-5"
          aria-label="Lớp video"
        />
        <div role="tabpanel" className="tab-content p-10">
          <p className="text-lg font-semibold text-gray-500">Coming soon!</p>
        </div>
      </div>
    </div>
  );
}
