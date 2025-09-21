"use client";

import { useParams } from "next/navigation";
import { usePortfolioStore } from "@/store/PortfolioStore";

export default function StudentDetailPage() {
    const { id } = useParams();
    const student = usePortfolioStore((state) =>
        state.students.find((s) => s.id === id)
    );

    if (!student) {
        return <p className="text-gray-600 p-6">ไม่พบข้อมูลนักเรียน</p>;
    }

    return (
        <main className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-8">

                <h1 className="text-3xl font-bold text-blue-700 text-center">
                    {student.title} {student.firstName} {student.lastName}
                </h1>

                {/* --- ข้อมูลส่วนตัว --- */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600 border-b pb-2">1. ข้อมูลส่วนตัว</h2>
                    <div className="flex flex-wrap gap-6 mt-2">
                        {student.studentPhoto && (
                            <img
                                src={student.studentPhoto}
                                alt="รูปนักเรียน"
                                className="w-48 h-48 object-cover rounded-xl shadow"
                            />
                        )}
                        <div className="flex-1 space-y-2">
                            {/* ชื่อและนามสกุล */}
                            <div className="flex gap-4">
                                <p><strong>คำนำหน้า:</strong> {student.title}</p>
                                <p><strong>ชื่อ-นามสกุล:</strong> {student.firstName} {student.lastName}</p>
                            </div>

                            {/* เบอร์โทรและอีเมล */}
                            <div className="flex gap-4">
                                <p><strong>เบอร์โทร:</strong> {student.phone}</p>
                                <p><strong>อีเมล:</strong> {student.email}</p>
                            </div>


                            {/* ที่อยู่ */}
                            <p><strong>ที่อยู่:</strong> {student.address}</p>

                            {/* ความสามารถพิเศษ */}
                            <p><strong>ความสามารถพิเศษ:</strong> {student.talent || "-"}</p>
                        </div>
                    </div>
                </section>


                {/* --- ข้อมูลการศึกษา --- */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600 border-b pb-2">2. ข้อมูลการศึกษา</h2>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <p><strong>วุฒิการศึกษา:</strong> {student.educationLevel}</p>
                        <p><strong>โรงเรียน:</strong> {student.school}</p>
                        <p><strong>GPA:</strong> {student.gpa.toFixed(2)}</p>
                    </div>
                </section>

                {/* --- คณะ/สาขาที่เลือก --- */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-bold text-blue-600 border-b pb-2">3. คณะ/สาขาที่เลือก</h2>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                        <p><strong>มหาวิทยาลัย:</strong> {student.university}</p>
                        <p><strong>คณะ:</strong> {student.faculty}</p>
                        <p><strong>สาขา:</strong> {student.major}</p>
                    </div>
                    <p className="mt-2"><strong>เหตุผลสมัคร:</strong> {student.reason}</p>
                </section>

                {/* --- รูปกิจกรรม --- */}
                {student.activityPhotos?.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-2xl font-bold text-blue-600 border-b pb-2">รูปกิจกรรม / รางวัล</h2>
                        <div className="flex flex-wrap gap-4 mt-2">
                            {student.activityPhotos.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`กิจกรรม ${index + 1}`}
                                    className="w-32 h-32 object-cover rounded-xl shadow"
                                />
                            ))}
                        </div>
                    </section>
                )}

            </div>
        </main>
    );
}