"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const navItems = [
    { label: "Trang chủ", href: "/" },
    { label: "Sản phẩm", href: "/#products" },
    { label: "Giới thiệu", href: "/#about" },
    { label: "Liên hệ", href: "/#contact" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              alt="Mercedes-Benz Logo"
              src="/images/logo.png"
              width={60}
              height={60}
              priority
              className={styles.logo}
              style={{ objectFit: "contain" }}
            />
          </Link>
          <div className={styles.brandName}>
            <span className={styles.mainText}>MERCEDES-BENZ</span>
            <span className={styles.subText}>VIETNAM</span>
          </div>
        </div>

        <div className={styles.searchWrapper}>
          <div className={styles.searchBox}>
            <div className={styles.searchIcon}>🔍</div>
            <input
              type="text"
              placeholder="Tìm kiếm xe..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <nav className={styles.nav}>
          <ul>
            {navItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
