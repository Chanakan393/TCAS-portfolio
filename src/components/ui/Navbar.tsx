"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="space-x-6 text-white font-medium">
      <Link
        href="/"
        className="hover:text-yellow-300 transition-colors duration-200"
      >
        Home
      </Link>
      <Link
        href="/form"
        className="hover:text-yellow-300 transition-colors duration-200"
      >
        แบบฟอร์มรับสมัคร
      </Link>
      <Link
        href="/teacher"
        className="hover:text-yellow-300 transition-colors duration-200"
      >
        สำหรับอาจารย์
      </Link>
    </nav>
  );
}