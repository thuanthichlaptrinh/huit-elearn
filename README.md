# Đề tài: Ứng dụng thư viện số và tạo bài kiểm tra kết hợp trí tuệ nhân tạo

## Mục tiêu

Giúp sinh viên HUIT có thể tạo bài kiểm tra (tạo đề từ ngân hàng câu hỏi hoặc tạo đề từ AI) để ôn tập, có thể chat với AI để hỏi và có thể upload tài liệu lên cho các sinh viên của trường cùng xem.

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

### Một số ảnh demo về trang web:

![image](https://github.com/user-attachments/assets/17401874-10ac-4403-932e-09618ab51d2d)
![image](https://github.com/user-attachments/assets/248208d2-ba6f-4500-82d4-6e632e336925)
![image](https://github.com/user-attachments/assets/48fccc5b-0c3a-49bb-8afd-541fe39ec59a)
![image](https://github.com/user-attachments/assets/daa95e4c-7f8e-49c0-aa81-10ba22902f7d)
![image](https://github.com/user-attachments/assets/23690182-401b-4072-8ef8-d23200482413)
![image](https://github.com/user-attachments/assets/3e5b7e91-cc18-4182-9e79-d6ec7389dc9f)
![image](https://github.com/user-attachments/assets/c83faea1-29dd-41c0-a96f-8a86bbce35ea)
![image](https://github.com/user-attachments/assets/ec57f10a-bc76-4a27-8890-71f945bc8316)
![image](https://github.com/user-attachments/assets/661a27e5-7553-496c-99e7-4e01eb7aa633)
![image](https://github.com/user-attachments/assets/edb0dde3-fc29-476c-9249-27dec725ae35)
![image](https://github.com/user-attachments/assets/cec03cd6-9342-4aa4-bb33-08c2e423a791)
![image](https://github.com/user-attachments/assets/524eb4ed-f780-4ac4-9aff-9c90e61d9645)
![image](https://github.com/user-attachments/assets/e89a3245-ab6c-48b0-9e61-4037efb8e2c6)
![image](https://github.com/user-attachments/assets/72d58df5-2749-48f7-ad4a-b11e58b2308a)
![image](https://github.com/user-attachments/assets/32b9e5fd-ae40-458c-98a7-bee501407ff4)
![image](https://github.com/user-attachments/assets/e1a9358d-b347-4a49-afab-9ba702a02507)
![image](https://github.com/user-attachments/assets/61ed559e-38dd-4c51-b27d-00fe63c4ec6c)
