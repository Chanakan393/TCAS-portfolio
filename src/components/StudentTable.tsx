// src/components/StudentTable.tsx

"use client";

import Link from "next/link";
import { usePortfolioStore } from "@/store/PortfolioStore";

export default function StudentTable() {
  const students = usePortfolioStore((state) => state.students);

  if (students.length === 0) {
    return <p className="text-gray-600">ยังไม่มีนักเรียนสมัครเข้ามา</p>;
  }

  return (
    <table className="w-full border-collapse border border-gray-300 bg-white shadow-md rounded-xl overflow-hidden">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="border px-4 py-2 text-left">ชื่อ - นามสกุล</th>
          <th className="border px-4 py-2 text-center">GPA</th>
          <th className="border px-4 py-2 text-center">รายละเอียด</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.id} className="hover:bg-gray-100">
            <td className="border px-4 py-2">{s.firstName} {s.lastName}</td>
            <td className="border px-4 py-2 text-center">{s.gpa.toFixed(2)}</td>
            <td className="border px-4 py-2 text-center">
              <Link
                href={`/teacher/${s.id}`}
                className="text-blue-600 underline hover:text-blue-800"
              >
                ดูเพิ่มเติม
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}