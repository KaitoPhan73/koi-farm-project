import Image from "next/image";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaPhoneAlt,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { GrMapLocation } from "react-icons/gr";
import { MdOutlineMail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-neutral-50 dark:bg-gray-900 ">
      <div className="flex flex-col md:flex-row justify-between gap-2 items-start border-t-b border-black py-8 px-12 bg-gray-100 dark:bg-gray-800">
        <div className="text-center md:text-left md:w-2/5">
          <div className="flex items-center">
            <Icon className="h-180 w-80 dark:filter dark:invert" />
            <div className="text-lg max-w-xl ml-4">
              <h2 className="text-2xl font-semibold mb-4">
                Trải nghiệm tuyệt vời với KALBAN
              </h2>
              <p>
                Khám phá vẻ đẹp của các sản phẩm túi xanh và những thiết kế độc
                đáo. Chúng tôi cung cấp thông tin chi tiết và hướng dẫn lựa chọn
                các túi phù hợp nhất cho nhu cầu của bạn.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/5">
          <h3 className="text-2xl font-semibold mb-4">Thương hiệu KALBAN</h3>
          <ul>
            <li className="flex gap-2 items-center mb-2">
              <FaPhoneAlt className="h-6 w-6 text-green-400" />
              <p className="text-gray-600 dark:text-white">0976-325-953</p>
            </li>
            <li className="flex gap-2 items-center mb-2">
              <GrMapLocation className="h-8 w-8 text-green-400" />
              <p className="text-gray-600 dark:text-white">
                FPT University HCMC, Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ,
                Thành Phố Thủ Đức, Hồ Chí Minh 700000{" "}
              </p>
            </li>
            <li className="flex gap-2 items-center mb-2">
              <MdOutlineMail className="h-6 w-6 text-green-400" />
              <p className="text-gray-600 dark:text-white">
                longdhpse171112@fpt.edu.vn
              </p>
            </li>
          </ul>
        </div>
        <div className="mt-8 md:mt-0 md:w-1/5">
          <h3 className="text-2xl font-semibold mb-4">Chính sách đổi trả</h3>
          <ul className="text-gray-600 dark:text-white">
            <li className="mb-2">Đổi trả trong vòng 30 ngày</li>
            <li className="mb-2">Sản phẩm còn nguyên vẹn</li>
            <li className="mb-2">Hỗ trợ đổi hàng tại cửa hàng</li>
            <li>Liên hệ để biết thêm chi tiết</li>
          </ul>
        </div>
        <div className="mt-8 md:mt-0 md:w-0/5">
          <h3 className="text-2xl font-semibold mb-4">Kết nối với chúng tôi</h3>
          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/profile.php?id=100086570243903"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://www.instagram.com/kalban.624/?fbclid=IwY2xjawFx2qFleHRuA2FlbQIxMAABHbTokm91AZa7HpbkaMYpn52MFw5wdRxgmHdBVAXnBjZp8U_KKobcOJ21RQ_aem_dCDc4G3ARtkxdm7EWD3wVw"
              className="text-pink-700 hover:text-pink-500"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      
      </div>
      <div className="text-center border-t border-black py-8">
        <p>
          &copy; 2024 Khám Phá Các Mẫu Túi Có Sẵn Và Tự Lên Ý Tưởng. Sáng Tạo
          Nào!
        </p>
      </div>
    </footer>
  );
};

function Icon(props: any) {
  return (
    <div className="flex items-center">
      <Image
        priority
        src="/svgs/kalban-logo.svg"
        height={32}
        width={32}
        alt="Kalban-logo"
        {...props}
      />
    </div>
  );
}

export default Footer;
