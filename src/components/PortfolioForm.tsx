"use client";

import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { usePortfolioStore } from "@/store/PortfolioStore";
import { Portfolio } from "@/types/portfolio";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";

export default function PortfolioForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Portfolio & { studentPhoto: FileList; activityPhotos: FileList }>();
    const addStudent = usePortfolioStore((state) => state.addStudent);

    // refs สำหรับรีเซ็ตไฟล์
    const studentPhotoRef = useRef<HTMLInputElement | null>(null);
    const activityPhotosRef = useRef<HTMLInputElement | null>(null);

    const onSubmit = (data: Portfolio & { studentPhoto: FileList; activityPhotos: FileList }) => {
        const studentPhotoUrl = data.studentPhoto?.[0] ? URL.createObjectURL(data.studentPhoto[0]) : '';
        const activityPhotosUrls = data.activityPhotos
            ? Array.from(data.activityPhotos).map(file => URL.createObjectURL(file))
            : [];

        addStudent({
            ...data,
            id: uuidv4(),
            gpa: Number(data.gpa),
            studentPhoto: studentPhotoUrl,
            activityPhotos: activityPhotosUrls,
        });

        Swal.fire({
            title: 'สมัครสำเร็จแล้ว! ✅',
            text: 'บันทึกข้อมูลเรียบร้อยแล้ว',
            icon: 'success',
            confirmButtonText: 'ปิด',
            background: '#f0f9ff',
            color: '#0369a1',
            showClass: { popup: 'animate__animated animate__fadeInDown' },
            hideClass: { popup: 'animate__animated animate__fadeOutUp' }
        }).then(() => {
            // รีเซ็ตฟอร์ม
            reset({
                title: '',
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                address: '',
                talent: '',
                studentPhoto: undefined,
                activityPhotos: undefined,
                educationLevel: '',
                school: '',
                gpa: '', // ให้ว่าง
                university: '',
                faculty: '',
                major: '',
                reason: ''
            });

            // รีเซ็ตไฟล์ด้วย ref
            if (studentPhotoRef.current) studentPhotoRef.current.value = '';
            if (activityPhotosRef.current) activityPhotosRef.current.value = '';
        });
    };

    const sectionClass = "bg-gray-50 p-6 rounded-xl shadow-inner";
    const labelClass = "block text-gray-700 font-medium mb-1";
    const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-white text-gray-800";
    const errorClass = "text-red-500 text-sm mt-1";

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8 bg-white shadow-xl rounded-3xl max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
                <span>แบบฟอร์มรับสมัครนักศึกษา TCAS69</span>
                <span className="block">รอบที่ 1 Portfolio</span>
            </h2>

            {/* --- Personal Information Section --- */}
            <div className={sectionClass}>
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3 mb-4">
                    <span className="text-blue-500 mr-2">1.</span> ข้อมูลส่วนตัว
                </h3>
                <div className="flex flex-wrap -mx-2">
                    {/* Title */}
                    <div className="w-full sm:w-1/4 px-2 mb-4">
                        <label className={labelClass}>คำนำหน้า</label>
                        <select {...register("title", { required: true })} className={inputClass}>
                            <option value="">เลือก</option>
                            <option value="นาย">นาย</option>
                            <option value="นาง">นาง</option>
                            <option value="นางสาว">นางสาว</option>
                        </select>
                        {errors.title && <p className={errorClass}>กรุณาเลือกคำนำหน้า</p>}
                    </div>

                    {/* First & Last Name */}
                    <div className="w-full sm:w-3/4 px-2 mb-4">
                        <label className={labelClass}>ชื่อ - นามสกุล</label>
                        <div className="flex space-x-2">
                            <input placeholder="ชื่อ" {...register("firstName", { required: true })} className={inputClass} />
                            <input placeholder="นามสกุล" {...register("lastName", { required: true })} className={inputClass} />
                        </div>
                        {(errors.firstName || errors.lastName) && <p className={errorClass}>กรุณากรอกชื่อและนามสกุล</p>}
                    </div>

                    {/* Phone & Email */}
                    <div className="w-full sm:w-1/2 px-2 mb-4">
                        <label className={labelClass}>เบอร์โทร</label>
                        <input placeholder="เบอร์โทร" {...register("phone", { required: true })} className={inputClass} />
                        {errors.phone && <p className={errorClass}>กรุณากรอกเบอร์โทร</p>}
                    </div>
                    <div className="w-full sm:w-1/2 px-2 mb-4">
                        <label className={labelClass}>อีเมล</label>
                        <input type="email" placeholder="อีเมล" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} className={inputClass} />
                        {errors.email && <p className={errorClass}>กรุณากรอกอีเมลที่ถูกต้อง</p>}
                    </div>

                    {/* Address */}
                    <div className="w-full px-2 mb-4">
                        <label className={labelClass}>ที่อยู่</label>
                        <textarea placeholder="ที่อยู่" {...register("address", { required: true })} className={`${inputClass} h-24`} />
                    </div>

                    {/* Talent */}
                    <div className="w-full px-2 mb-4">
                        <label className={labelClass}>ความสามารถพิเศษ</label>
                        <textarea placeholder="ความสามารถพิเศษ" {...register("talent")} className={`${inputClass} h-24`} />
                    </div>
                </div>
            </div>

            {/* --- Image Upload Section --- */}
            <div className={sectionClass}>
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3 mb-4">
                    <span className="text-blue-500 mr-2">2.</span> ส่วนอัปโหลดรูปภาพ
                </h3>
                {/* --- รูปนักเรียน --- */}
                <div className="w-full px-2 mb-4">
                    <label className={labelClass}>รูปภาพนักเรียน (1 รูป)</label>
                    <input
                        type="file"
                        {...register("studentPhoto", { required: true })}
                        className={`${inputClass} p-2`}
                        accept="image/*"
                    />
                    {errors.studentPhoto && (
                        <p className={errorClass}>กรุณาอัปโหลดรูปนักเรียน</p>
                    )}
                </div>

                {/* --- รูปกิจกรรม --- */}
                <div className="w-full px-2 mb-4">
                    <label className={labelClass}>รูปภาพกิจกรรม/รางวัล (สามารถเลือกได้หลายรูป)</label>
                    <input
                        type="file"
                        multiple
                        {...register("activityPhotos", { required: true })}
                        className={`${inputClass} p-2`}
                        accept="image/*"
                    />
                    {errors.activityPhotos && (
                        <p className={errorClass}>กรุณาอัปโหลดรูปกิจกรรมอย่างน้อย 1 รูป</p>
                    )}
                </div>
            </div>

            {/* --- Educational Information Section --- */}
            <div className={sectionClass}>
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3 mb-4">
                    <span className="text-blue-500 mr-2">3.</span> ข้อมูลการศึกษา
                </h3>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full sm:w-1/2 px-2 mb-4">
                        <label className={labelClass}>วุฒิการศึกษา</label>
                        <select {...register("educationLevel", { required: true })} className={inputClass}>
                            <option value="">เลือกวุฒิ</option>
                            <option value="ม.6">มัธยมศึกษาปีที่ 6</option>
                            <option value="ปวช.">ปวช.</option>
                            <option value="ปวส.">ปวส.</option>
                            <option value="กศน.">กศน.</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                        </select>
                        {errors.educationLevel && <p className={errorClass}>กรุณาเลือกวุฒิการศึกษา</p>}
                    </div>
                </div>

                <div className="flex flex-wrap -mx-2">
                    <div className="w-full sm:w-2/3 px-2 mb-4">
                        <label className={labelClass}>โรงเรียน</label>
                        <input placeholder="โรงเรียน" {...register("school", { required: true })} className={inputClass} />
                        {(errors.school) && <p className={errorClass}>กรุณากรอกชื่อโรงเรียน</p>}
                    </div>
                    <div className="w-full sm:w-1/3 px-2 mb-4">
                        <label className={labelClass}>GPA</label>
                        <input type="number" step="0.01" placeholder="GPA" {...register("gpa", { required: true, min: 0, max: 4 })} className={inputClass} />
                        {errors.gpa && <p className={errorClass}>กรุณากรอก GPA (0.00 - 4.00)</p>}
                    </div>
                </div>
            </div>

            {/* --- University Information Section --- */}
            <div className={sectionClass}>
                <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-200 pb-3 mb-4">
                    <span className="text-blue-500 mr-2">4.</span> คณะ/สาขาที่ต้องการศึกษาต่อ
                </h3>
                <div className="flex flex-wrap -mx-2">
                    <div className="w-full sm:w-1/3 px-2 mb-4">
                        <label className={labelClass}>มหาวิทยาลัย</label>
                        <input placeholder="มหาวิทยาลัย" {...register("university", { required: true })} className={inputClass} />
                        {(errors.university) && <p className={errorClass}>กรุณากรอกชื่อมหาวิทยาลัย</p>}
                    </div>
                    <div className="w-full sm:w-1/3 px-2 mb-4">
                        <label className={labelClass}>คณะ</label>
                        <input placeholder="คณะ" {...register("faculty", { required: true })} className={inputClass} />
                        {(errors.faculty) && <p className={errorClass}>กรุณากรอกชื่อคณะ</p>}
                    </div>
                    <div className="w-full sm:w-1/3 px-2 mb-4">
                        <label className={labelClass}>สาขา</label>
                        <input placeholder="สาขา" {...register("major", { required: true })} className={inputClass} />
                        {(errors.major) && <p className={errorClass}>กรุณากรอกชื่อสาขา</p>}
                    </div>
                    <div className="w-full px-2 mb-4">
                        <label className={labelClass}>เหตุผลในการสมัคร</label>
                        <textarea placeholder="เหตุผลในการสมัคร" {...register("reason", { required: true })} className={`${inputClass} h-24`} />
                        {(errors.reason) && <p className={errorClass}>กรุณากรอกเหตุผลในการสมัคร</p>}
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full py-4 bg-blue-600 text-white font-bold text-xl rounded-xl shadow-lg hover:bg-blue-700 transition-colors transform hover:scale-105"
            >
                ยืนยันการสมัคร
            </button>
        </form>
    );
}
