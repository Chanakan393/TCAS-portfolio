// src/app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-20 px-4">
      
      {/* Hero Card */}
      <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full p-10 text-center border-t-8 border-blue-600">
        <h1 className="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
          TCAS 69 รอบที่ 1 Portfolio
        </h1>
        <p className="text-gray-700 text-lg md:text-xl mb-8">
          ระบบรับสมัครนักศึกษา TCAS69 รอบที่ 1 Portfolio
        </p>
        <Link
          href="/form"
          className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
        >
          กรอกฟอร์มสมัคร
        </Link>
      </div>
    </main>
  );
}