"use client";

import { LoginAdmin } from "./_components/login";

export default function AdminLogin() {
  return (
    <div className="border-b border-gray-60 flex items-center h-screen justify-center">
      <div className="flex flex-col gap-6 text-red-500">
          <div >Энэ хэсэгээр зөвхөн админ эрхтэй хүн нэвтрэнэ </div>
        <div className="mt-4 w-90 text-white">
  
          <LoginAdmin />
        </div>
      </div>
    </div>
  );
}
