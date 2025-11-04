# Expense Tracker (React + Vite)

Ứng dụng theo dõi thu chi cá nhân, xây dựng bằng React (Vite), dùng Context để quản lý state, Recharts cho biểu đồ và Firebase cho lưu trữ.

## Tính năng
- Thêm/xóa giao dịch (thu/chi), tính tổng thu, tổng chi và số dư
- Biểu đồ xu hướng theo ngày (Recharts)
- Cấu trúc tách component/pages/context rõ ràng
- ESLint + Prettier, TailwindCSS, Vite HMR

## Yêu cầu hệ thống
- Node.js >= 18
- npm >= 9

## Cài đặt và chạy
```bash
# Cài dependencies
npm install

# Chạy dev server (mặc định: http://localhost:5173, tự mở trình duyệt)
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

## Cấu hình môi trường (.env)
Tạo file `.env` ở thư mục gốc (Vite yêu cầu prefix `VITE_`):
```bash
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Scripts hữu ích
- `npm run lint`: chạy ESLint cho `src`
- `npm run format`: format toàn bộ dự án bằng Prettier

## Tech stack
- React 18, React Router v6
- Context API (quản lý transactions, số liệu tổng)
- Recharts (biểu đồ)
- TailwindCSS + PostCSS + Autoprefixer
- Firebase (Auth/Firestore – file stub sẵn)
- Axios, clsx, react-hot-toast, react-icons, prop-types
- ESLint + Prettier

## Cấu trúc thư mục
```
Expense-Tracker/
├─ public/
│  └─ index.html
├─ src/
│  ├─ assets/
│  ├─ components/
│  │  ├─ AddTransactionForm.jsx
│  │  ├─ TransactionList.jsx
│  │  ├─ SummaryCard.jsx
│  │  └─ ChartDisplay.jsx
│  ├─ context/
│  │  └─ ExpenseContext.jsx
│  ├─ pages/
│  │  ├─ Login.jsx
│  │  ├─ Register.jsx
│  │  └─ Dashboard.jsx
│  ├─ services/
│  │  └─ firebase.js
│  ├─ utils/
│  │  └─ dateUtils.js
│  ├─ index.css
│  ├─ App.jsx
│  └─ main.jsx
├─ .eslintrc.cjs
├─ .prettierrc
├─ tailwind.config.js
├─ postcss.config.js
├─ vite.config.js
└─ package.json
```

## TailwindCSS
- Đã cấu hình trong `tailwind.config.js` và `postcss.config.js`
- Import tại `src/index.css` với 3 directive: `@tailwind base; @tailwind components; @tailwind utilities;`

## Ghi chú phát triển
- Mặc định chưa kết nối Firebase Auth/Firestore trong UI. `src/services/firebase.js` đã có config + stub CRUD; bạn có thể gọi từ Context hoặc pages theo nhu cầu.
- Nếu cần cập nhật packages: `npm outdated` / `npm audit` (có thể có vài cảnh báo mức độ vừa; xem xét trước khi dùng `--force`).

## License
MIT
