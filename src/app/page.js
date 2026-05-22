"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { cars, categories } from "./data";
import styles from "./page.module.css";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchTerm, setSearchTerm] = useState("");
  const pillRef = useRef(null);
  const categoryRefs = useRef([]);

  const filteredCars = cars.filter((car) => {
    const matchCategory = activeCategory === "Tất cả" || car.category === activeCategory;
    const matchSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  useEffect(() => {
    const activeIndex = categories.indexOf(activeCategory);
    const activeBtn = categoryRefs.current[activeIndex];
    if (activeBtn && pillRef.current) {
      pillRef.current.style.left = activeBtn.offsetLeft + "px";
      pillRef.current.style.width = activeBtn.offsetWidth + "px";
    }
  }, [activeCategory]);

  // Reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll(`.${styles.reveal}`).forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [filteredCars]);

  return (
    <div className={styles.container}>
      <Header />

      {/* HERO SECTION */}
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Bộ sưu tập 2026</span>
          <h1 className={styles.heroTitle}>Mercedes-Maybach S 680</h1>
          <p className={styles.heroSubtitle}>
            Trải nghiệm đỉnh cao sang trọng với động cơ V12 Twin-Turbo 621 mã lực.
          </p>
          <div className={styles.heroBtns}>
            <Link href="/chitietsanpham/1">
              <button className={styles.heroBtnPrimary}>Khám phá ngay</button>
            </Link>
            <button className={styles.heroBtnSecondary}>Đăng ký lái thử ›</button>
          </div>
        </div>
        <div className={styles.heroImage}>
          <Image
            alt="Mercedes-Maybach S 680"
            src="/images/xe1.jpg"
            width={550}
            height={400}
            priority
            style={{ objectFit: "cover", borderRadius: "20px" }}
          />
        </div>
      </section>

      {/* CATEGORY BAR */}
      <div id="products" className={`${styles.categoryBarWrapper} ${styles.reveal}`}>
        <div className={styles.categoryBar}>
          <div className={styles.activePill} ref={pillRef}></div>
          {categories.map((cat, i) => (
            <button
              key={cat}
              ref={(el) => (categoryRefs.current[i] = el)}
              className={`${styles.categoryItem} ${activeCategory === cat ? styles.activeText : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className={styles.mainLayout}>
        <div className={styles.mainContent}>
          <h2 className={styles.sectionHeading}>Sản phẩm nổi bật</h2>
          <div className={styles.productGrid}>
            {filteredCars.map((car, i) => (
              <div
                key={car.id}
                className={`${styles.product} ${styles.reveal}`}
                style={{ "--delay": i % 4 }}
              >
                {car.badge && <span className={styles.badge}>{car.badge}</span>}
                <Link href={`/chitietsanpham/${car.id}`}>
                  <div className={styles.productImage}>
                    <Image
                      alt={car.name}
                      src={car.image}
                      width={300}
                      height={200}
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{car.name}</h3>
                    <div className={styles.productPrice}>{car.price}đ</div>
                    <div className={styles.productRemain}>
                      {car.remain > 0 ? `Còn ${car.remain} xe` : "Hết hàng"}
                    </div>
                  </div>
                </Link>
                <div className={styles.actionButtons}>
                  <Link href={`/chitietsanpham/${car.id}`} style={{ flex: 1 }}>
                    <button className={styles.buyBtn}>Xem chi tiết</button>
                  </Link>
                  <button className={styles.cartBtn}>+ Yêu thích</button>
                </div>
              </div>
            ))}
          </div>
          {filteredCars.length === 0 && (
            <p style={{ textAlign: "center", color: "#666", padding: "60px 0" }}>
              Không tìm thấy xe phù hợp.
            </p>
          )}
        </div>

        {/* SIDEBAR */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarBox}>
            <h4>🔥 Ưu đãi đặc biệt</h4>
            <p>Giảm thêm 200 triệu cho khách hàng đặt cọc trước 30/06/2026. Áp dụng tại showroom TP.HCM.</p>
          </div>
          <div className={styles.sidebarBox}>
            <h4>🔄 Thu cũ đổi mới</h4>
            <p>Trợ giá lên đến 500 triệu đồng khi lên đời Mercedes mới. Định giá nhanh trong 30 phút.</p>
          </div>
          <div className={styles.sidebarBox}>
            <h4>🚚 Giao xe tận nơi</h4>
            <p>Miễn phí giao xe toàn quốc. Hỗ trợ đăng ký biển số và bảo hiểm xe.</p>
          </div>
          <div className={styles.sidebarBox}>
            <h4>🛡️ Bảo hành chính hãng</h4>
            <p>Bảo hành 3 năm không giới hạn km. Dịch vụ cứu hộ 24/7 trên toàn quốc.</p>
          </div>
        </aside>
      </div>

      <Footer />
    </div>
  );
}