# 🩸 BloodBanker  

**BloodBanker** is an online platform designed to connect blood donors and recipients, enabling seamless and efficient blood donation management. It allows users to register as donors, browse available donation campaigns, and get in touch with nearby blood banks or individuals in need. The platform also offers features like user profiles, donation tracking, and volunteer opportunities. Its goal is to make blood donation more accessible, organized, and impactful for communities.  

🔗 **Live Website:** [BloodBanker](https://bloodbanker-567f0.web.app/)  

---

## 📌 Key Features  

- **User Roles:** Manage roles for donors, volunteers, and admins with secure access.  
- **Donation Management:** Schedule and track blood donations seamlessly.  
- **Localized Search:** Search donors and recipients by district and upazila.  
- **Secure Authentication:** Protect user data with JWT-based authentication.  
- **Admin Dashboard:** View real-time stats on users and donations.  
- **Blog Section:** Share updates, health tips, and donation stories.  
- **Donation Tracking:** Monitor and update the status of donations.  
- **Payment Integration:** Support campaigns with Stripe-powered payments.  
- **Responsive Design:** Enjoy a seamless experience across devices.  
- **Community Impact:** Host events and build awareness to save lives.  

---

## 📜 Table of Contents  

- [Installation](#-installation)  
- [Usage](#-usage-guide)  
- [Configuration](#-configuration)  
- [Dependencies](#-dependencies)  
- [Development](#-development-commands)  
- [Contributing](#-contributing)  
- [License](#-license)  

---

## 🛠 Tech Stack  

### **Frontend:**  
- React (with React Router & React Query)  
- Tailwind CSS & DaisyUI  
- Firebase (Authentication & Database)  
- Stripe (Payment Processing)  

---

## 📦 Dependencies  

**Key dependencies:**  
- **Frontend:** React, React Router, Tailwind CSS  
- **State management:** React Query  
- **Authentication:** Firebase  
- **Payment processing:** Stripe  
- **Forms & validation:** React Hook Form  
- **UI components:** DaisyUI, SweetAlert2  
- **SEO:** React Helmet Async  

🔹 Full dependency list available in [`package.json`](package.json).  

---

## 📥 Installation  

1️⃣ Clone the repository:  
```sh
git clone https://github.com/istiak19/BloodBanker-client
cd bloodbanker
```  

2️⃣ Install dependencies:  
```sh
npm install
```  

3️⃣ Start the development server:  
```sh
npm run dev
```  

---

## 🎯 Usage Guide  

- **Donors** → Register, track donations, and find nearby recipients.  
- **Recipients** → Search for donors and request blood.  
- **Admins** → Manage users, oversee donation campaigns, and update the blog.  

💡 **Make sure to configure Firebase and Stripe API keys in the `.env` file before running the app.**  

---

## 🔧 Configuration  

- **Firebase Setup** → Add Firebase credentials in `firebaseConfig.js`.  
- **Stripe Payment** → Configure Stripe API keys in `.env`.  

---

## 🚀 Development Commands  

🔹 **Start Development Server:**  
```sh
npm run dev
```  

🔹 **Build for Production:**  
```sh
npm run build
```  

---

## 🔑 Admin Credentials  

- **Username:** `istiak12@gmail.com`  
- **Password:** `123456`  

⚠️ _For security reasons, avoid sharing sensitive credentials in public repositories._  