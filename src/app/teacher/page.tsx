// src/app/teacher/page.tsx

import StudentTable from "@/components/StudentTable";

export default function TeacherPage() {
  return (
    <main className="p-8 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">
          รายชื่อนักเรียนที่สมัครเรียน
        </h1>
        <StudentTable />
      </div>
    </main>
  );
}