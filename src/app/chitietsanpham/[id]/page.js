"use client";
import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/header/header";
import Footer from "../../../components/footer/footer";
import Slider from "../../../components/slider/slider";
import { cars } from "../../data";
import styles from "./detail.module.css";

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const car = cars.find((c) => c.id === parseInt(id));

  if (!car) {
    return (
      <div className={styles.container}>
        <Header />
        <div className={styles.notFound}>
          <h1>Không tìm thấy sản phẩm</h1>
          <Link href="/">← Quay về trang chủ</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const sliderImages = [car.image, ...cars.filter(c => c.id !== car.id).slice(0, 4).map(c => c.image)];
  const specLabels = {
    dongCo: "Động cơ",
    congSuat: "Công suất",
    hopSo: "Hộp số",
    danDong: "Dẫn động",
    tangToc: "Tăng tốc",
    tocDoToiDa: "Tốc độ tối đa",
    nhieuLieu: "Nhiên liệu",
    kichThuoc: "Kích thước",
  };

  return (
    <div className={styles.container}>
      <Header />

      <div className={styles.breadcrumb}>
        <Link href="/">Trang chủ</Link>
        <span className={styles.breadSep}>›</span>
        <span>{car.name}</span>
      </div>

      <div className={styles.detailLayout}>
        {/* SLIDER */}
        <div className={styles.sliderArea}>
          <Slider images={sliderImages} autoPlay={true} interval={5000} />
        </div>

        {/* INFO */}
        <div className={styles.infoArea}>
          {car.badge && <span className={styles.badge}>{car.badge}</span>}
          <span className={styles.category}>{car.category}</span>
          <h1 className={styles.carName}>{car.name}</h1>
          <div className={styles.priceRow}>
            <span className={styles.price}>{car.price}đ</span>
            {car.oldPrice && (
              <span className={styles.oldPrice}>{car.oldPrice}đ</span>
            )}
          </div>
          <p className={styles.remain}>
            {car.remain > 0 ? `✅ Còn ${car.remain} xe tại showroom` : "❌ Tạm hết hàng"}
          </p>

          <div className={styles.actions}>
            <button className={styles.btnPrimary}>Liên hệ mua xe</button>
            <button className={styles.btnSecondary}>Đặt lịch lái thử</button>
          </div>
        </div>
      </div>

      {/* SPECS TABLE */}
      <section className={styles.specsSection}>
        <h2 className={styles.sectionTitle}>Thông số kỹ thuật chi tiết</h2>
        <div className={styles.specsGrid}>
          {Object.entries(car.specs).map(([key, value]) => (
            <div key={key} className={styles.specItem}>
              <span className={styles.specLabel}>{specLabels[key] || key}</span>
              <span className={styles.specValue}>{value}</span>
            </div>
          ))}
        </div>
      </section>

      {/* REVIEW */}
      <section className={styles.reviewSection}>
        <h2 className={styles.sectionTitle}>Đánh giá chi tiết từ chuyên gia</h2>
        <div className={styles.reviewContent}>
          <h3>{car.name}: Đánh giá toàn diện 2026</h3>
          {car.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
          <div className={styles.reviewQuote}>
            <blockquote>
              &ldquo;Chúng tôi cam kết mang đến những mẫu xe hạng sang với chính sách bảo hành tốt nhất
              và nhiều ưu đãi đặc quyền cho sinh viên trường TC Kinh tế - Kỹ thuật Quận 12.
              {car.name} chính là biểu tượng của sự đẳng cấp mà bạn xứng đáng sở hữu.&rdquo;
            </blockquote>
          </div>
        </div>
      </section>

      {/* RELATED PRODUCTS */}
      <section className={styles.relatedSection}>
        <h2 className={styles.sectionTitle}>Xe có thể bạn quan tâm</h2>
        <div className={styles.relatedGrid}>
          {cars
            .filter((c) => c.id !== car.id && c.category === car.category)
            .slice(0, 4)
            .map((related) => (
              <Link key={related.id} href={`/chitietsanpham/${related.id}`} className={styles.relatedCard}>
                <div className={styles.relatedImage}>
                  <Image
                    alt={related.name}
                    src={related.image}
                    width={280}
                    height={180}
                    style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  />
                </div>
                <div className={styles.relatedInfo}>
                  <h4>{related.name}</h4>
                  <span>{related.price}đ</span>
                </div>
              </Link>
            ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
