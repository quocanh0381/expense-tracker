# Expense Tracker (React + Vite)

Ứng dụng theo dõi thu chi cá nhân, xây dựng bằng React (Vite), Context API, Recharts và Firebase. Giao diện đã được làm mới với TailwindCSS.

## Tính năng
- Thêm/xóa giao dịch (thu/chi), tính tổng thu, tổng chi và số dư
- Biểu đồ xu hướng theo ngày (Recharts)
- Bảo vệ route Dashboard theo trạng thái đăng nhập
- Giao diện hiện đại: card, form, nút, trạng thái trống/loading
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
Tạo file `.env` ở thư mục gốc (Vite yêu cầu prefix `VITE_`). Chọn 1 trong 2 chế độ sau:

### A) Demo mode (không cần Firebase)
Cho phép bạn vào Dashboard và thêm/xóa giao dịch cục bộ (localStorage). App sẽ tự đăng nhập bằng tài khoản demo:
```bash
VITE_DEMO_MODE=true
```

### B) Firebase mode (đầy đủ Auth + Firestore)
Nếu KHÔNG cấu hình, ứng dụng vẫn chạy ở chế độ không backend (không đăng nhập được, không lưu Firestore):
```bash
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Lưu ý:
- Demo mode: không cần Firebase, dữ liệu lưu cục bộ (localStorage), có thể dùng ngay.
- Nếu không bật demo mode và không cấu hình Firebase: bạn sẽ không đăng nhập được và danh sách giao dịch rỗng.

## Hướng dẫn sử dụng nhanh
1) Chạy dự án: `npm install` rồi `npm run dev`.
2) Chọn chế độ:
   - Demo mode: tạo `.env` với `VITE_DEMO_MODE=true`, restart server, vào Dashboard thêm/xóa giao dịch ngay.
   - Firebase mode:
     - Tạo project Firebase → bật Authentication (Email/Password) và Firestore.
     - Lấy config Web app, tạo `.env` với các `VITE_FIREBASE_*` ở trên, restart server.
     - Vào trang Register để tạo tài khoản → Login → dùng Dashboard.

## Scripts hữu ích
- `npm run lint`: chạy ESLint cho `src`
- `npm run format`: format toàn bộ dự án bằng Prettier

## Tech stack
- React 18, React Router v6
- Context API (quản lý transactions, số liệu tổng)
- Recharts (biểu đồ)
- TailwindCSS + PostCSS + Autoprefixer
- Firebase (Auth/Firestore – optional; an toàn khi thiếu .env)
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
│  │  ├─ AuthContext.jsx
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
- Component đã dùng class Tailwind (không cần thêm UI lib bên ngoài)

## Ghi chú phát triển
- `src/context/AuthContext.jsx`: quản lý trạng thái đăng nhập, an toàn khi thiếu cấu hình Firebase.
- `src/context/ExpenseContext.jsx`: tải giao dịch theo user, xử lý loading/error.
- `src/services/firebase.js`: khởi tạo an toàn (`isFirebaseConfigured`) để tránh crash khi thiếu `.env`.
- Nếu cần cập nhật packages: `npm outdated` / `npm audit` (xem xét trước khi dùng `--force`).

## Triển khai (Deploy) lên domain
Bạn có thể deploy như một SPA bình thường. Các cách phổ biến:

### Vercel (khuyên dùng)
1. Push code lên GitHub/GitLab/Bitbucket.
2. Trên Vercel: New Project → Import repo.
3. Thiết lập biến môi trường (nếu dùng Firebase mode): thêm các `VITE_FIREBASE_*` trong Project Settings → Environment Variables.
4. Build command: `npm run build`, Output dir: `dist`.
5. Deploy và trỏ domain theo hướng dẫn của Vercel.

### Netlify
1. Netlify → Add new site → Import from Git.
2. Build command: `npm run build`, Publish directory: `dist`.
3. Environment variables: thêm `VITE_FIREBASE_*` nếu dùng Firebase.
4. SPA routing: file `public/_redirects` đã được thêm sẵn với nội dung `/* /index.html 200`.

### Firebase Hosting
1. Cài Firebase CLI: `npm i -g firebase-tools` → `firebase login`.
2. `npm run build` → tạo thư mục `dist`.
3. `firebase init hosting` → chọn project → set public directory là `dist` → SPA rewrite: Yes.
4. `firebase deploy`.

### GitHub Pages (không bắt buộc)
- Nếu dùng GH Pages cần cấu hình `base` trong `vite.config.js` theo repo name và dùng branch `gh-pages`. Với Router v6 cần đảm bảo fallback về `index.html` (GH Pages có hạn chế SPA). Vercel/Netlify/Firebase Hosting thuận tiện hơn.

### Lưu ý khi deploy Firebase Auth
- Trong Firebase Console → Authentication → Settings → Authorized domains: thêm domain của bạn (ví dụ `example.com`, `www.example.com`).
- Nếu bật Demo mode, không cần domain cho Auth.

## License
MIT
