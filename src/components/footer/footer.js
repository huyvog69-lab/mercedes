import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerColumn}>
          <h3>Khám phá</h3>
          <ul>
            <li>Sedan</li>
            <li>SUV</li>
            <li>AMG Performance</li>
            <li>Maybach</li>
            <li>Electric (EQ)</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3>Hỗ trợ</h3>
          <ul>
            <li>Đăng ký lái thử</li>
            <li>Báo giá xe</li>
            <li>Chính sách bảo hành</li>
            <li>Hướng dẫn mua xe</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3>Trường TC Kinh tế - Kỹ thuật Quận 12</h3>
          <ul className={styles.contactList}>
            <li><strong>CS1:</strong> 592 Nguyễn Ảnh Thủ, P. Trung Mỹ Tây, Quận 12, TP.HCM</li>
            <li><strong>CS2:</strong> 36 Nguyễn Văn Vân, P. Hiệp Thành, Quận 12, TP.HCM</li>
            <li><strong>Điện thoại:</strong> (058) 979.46.53</li>
            <li><strong>Email:</strong> tuyensinh@dttec.edu.vn</li>
          </ul>
        </div>
        <div className={styles.footerColumn}>
          <h3>Nhận thông tin ưu đãi</h3>
          <p className={styles.footerDesc}>
            Đăng ký email để không bỏ lỡ những chương trình khuyến mãi và mẫu xe mới nhất.
          </p>
          <div className={styles.subscribeBox}>
            <input type="email" placeholder="Nhập email của bạn..." />
            <button>Đăng ký</button>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div>Bản quyền © 2026 Nguyễn Võ Gia Huy - WEB12B1</div>
        <div className={styles.legalLinks}>
          <span>Chính sách quyền riêng tư</span>
          <span className={styles.separator}>|</span>
          <span>Điều khoản sử dụng</span>
          <span className={styles.separator}>|</span>
          <span>Pháp lý</span>
        </div>
        <div className={styles.region}>Việt Nam</div>
      </div>
    </footer>
  );
}
