# HUIT E-Learn

**HUIT E-Learn** là hệ thống hỗ trợ học tập và chia sẻ tài liệu trực tuyến dành cho sinh viên trường Đại học Công Thương TP.HCM (HUIT). Dự án cung cấp nền tảng để sinh viên tiếp cận tài liệu, làm bài kiểm tra và cập nhật tin tức học tập.

## 🌟 Tính năng chính

-   **Quản lý tài khoản**: Đăng ký, Đăng nhập (hỗ trợ Google/Facebook qua Firebase), Quản lý thông tin cá nhân.
-   **Kho tài liệu**:
    -   Tải lên và chia sẻ tài liệu.
    -   Tìm kiếm và lọc tài liệu theo Khoa, Môn học.
    -   Xem chi tiết tài liệu trực tuyến (PDF).
-   **Học tập & Kiểm tra**:
    -   Tạo bài kiểm tra.
    -   Làm bài trắc nghiệm (Multiple Choice).
    -   Nộp bài tập (Assignment).
-   **Tin tức & Blog**: Cập nhật tin tức, bài viết mới nhất.

## 🛠 Công nghệ sử dụng

Dự án được chia thành 2 phần chính: **Client** (Frontend) và **Server** (Backend).

### Client (Frontend)

-   **Framework**: [React 19](https://react.dev/)
-   **Routing**: [React Router DOM 7](https://reactrouter.com/)
-   **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/), Redux Persist
-   **API Client**: [Apollo Client](https://www.apollographql.com/docs/react/) (GraphQL), Axios
-   **UI Library**:
    -   SCSS (CSS Modules)
    -   [Material UI](https://mui.com/)
    -   [Ant Design](https://ant.design/)
    -   Icons: Lucide React, FontAwesome, React Icons
-   **Authentication**: Firebase Auth
-   **Khác**: React PDF, React Slick, EmailJS

### Server (Backend)

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express](https://expressjs.com/)
-   **API**: [Apollo Server](https://www.apollographql.com/docs/apollo-server/) (GraphQL)
-   **Authentication**: Firebase Admin SDK
-   **Email**: Nodemailer

## 🚀 Cài đặt và Hướng dẫn sử dụng

### Yêu cầu tiên quyết

-   Node.js (Khuyến nghị phiên bản LTS mới nhất)
-   Trình quản lý gói npm hoặc yarn

### 1. Cài đặt và chạy Server

Server chịu trách nhiệm xử lý API GraphQL và xác thực.

1.  Di chuyển vào thư mục server:
    ```bash
    cd server
    ```
2.  Cài đặt các thư viện phụ thuộc:
    ```bash
    npm install
    ```
3.  Khởi động server:
    ```bash
    npm start
    ```
    Server sẽ hoạt động tại: `http://localhost:8888/graphql`

### 2. Cài đặt và chạy Client

Client là giao diện người dùng của ứng dụng.

1.  Di chuyển vào thư mục client (từ thư mục gốc):
    ```bash
    cd client
    ```
2.  Cài đặt các thư viện phụ thuộc:
    ```bash
    npm install
    ```
3.  Khởi động ứng dụng:
    ```bash
    npm start
    ```
    Ứng dụng sẽ tự động mở tại: `http://localhost:3000`

## 📂 Cấu trúc dự án

```
huit-elearn/
├── client/                 # Source code Frontend
│   ├── public/             # File tĩnh (index.html, images...)
│   ├── src/
│   │   ├── assets/         # Tài nguyên (fonts, icons, images)
│   │   ├── components/     # Các component tái sử dụng (Button, Alert...)
│   │   ├── config/         # Cấu hình dự án (routes...)
│   │   ├── context/        # React Context (AuthProvider...)
│   │   ├── firebase/       # Cấu hình Firebase Client
│   │   ├── layouts/        # Bố cục trang (DefaultLayout, HeaderOnly...)
│   │   ├── pages/          # Các trang chính (Home, Login, Detail...)
│   │   ├── redux/          # Redux store và slices
│   │   ├── routes/         # Định nghĩa routes
│   │   ├── services/       # Các hàm gọi API
│   │   └── utils/          # Các hàm tiện ích
│   └── package.json
│
├── server/                 # Source code Backend
│   ├── server.mjs          # Entry point của server (Apollo Server + Express)
│   ├── firebaseConfig.js   # Cấu hình Firebase Admin
│   └── package.json
└── ...
```

## 🤝 Đóng góp

Mọi đóng góp đều được hoan nghênh. Vui lòng tạo Pull Request hoặc mở Issue để thảo luận về những thay đổi bạn muốn thực hiện.

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)
