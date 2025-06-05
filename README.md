# 💸 Kaluuba Pay – Crypto Payments Made Simple

Kaluuba is a **mobile-first, crypto-powered payment app** that enables users in Africa to **send, receive, and manage payments** using simple usernames — not long wallet addresses. It's built to solve real problems for freelancers, remote workers, and small businesses struggling with slow, expensive, and error-prone payments.

> 🚀 Built with Expo Go, Smart Contracts (Base), Node.js backend, and real-time analytics.

---

## 🌍 Why Kaluuba?

**The Problem:**
- Traditional payment apps in Africa suffer from **network failures**, **delayed transfers**, and **expensive international payments**.
- Crypto alternatives are **too technical** — full of scary wallet addresses, high risk of errors, and poor user experience.
- Users want **simplicity**, **security**, and **transparency**.

**Our Solution:**
- Replace wallet addresses with **@usernames**
- Allow users to **send/receive crypto** like they would with PayPal or Opay
- Show balances in **local currencies (₦, $, USDC)**
- Offer **analytics, invoices, security, and offline readiness** — all through a mobile-first experience

---

## 📱 App Features

| Feature                        | Description                                                                 |
|-------------------------------|-----------------------------------------------------------------------------|
| 🧍 Username-Based Payments     | Users receive funds using `username.kaluuba.eth` instead of hex addresses   |
| 📤 Send & Receive Crypto       | Via QR code, username, or contact picker                                   |
| 💱 Fiat View & Auto-Convert    | Display balances in ₦/$; toggle auto-convert to fiat                        |
| 📊 Real-Time Analytics         | Total received/sent, top clients, CSV/PDF export                           |
| 🧾 Invoicing                   | Create branded invoices, share links, get paid in crypto                   |
| 🔐 Security Features           | 2FA, Face ID/Fingerprint login, inactivity lock                            |
| 🌐 Multi-Language Support      | Supports English, Yoruba, Igbo, Hausa                                      |
| 🧪 Testnet Mode                | “Try it Free” demo for first-time crypto users                             |

---

## 🧠 Built With

- **Frontend (Mobile)**: Expo Go (React Native), Viem + WalletConnect, i18n-js
- **Smart Contracts**: Solidity on Base Sepolia (username registry, invoice, payments)
- **Backend**: Node.js, Express, MongoDB (transaction logs, analytics, auth)
- **Other**: CoinGecko API (rates), PDFKit, QR code scanner, biometric auth

---

## 🧑‍💻 Team Roles

| Name           | Role                 | Responsibilities                                             |
|----------------|----------------------|--------------------------------------------------------------|
| Dev 1          | Frontend Dev (Mobile) | UI, QR scanner, screens, multi-language, wallet connect     |
| Dev 2          | Frontend Dev (Mobile) | Analytics UI, Send/Receive, invoice screens, state handling |
| Dev 3          | Backend Developer     | Auth, user profiles, APIs, invoice storage, PDF export       |
| Dev 4          | Smart Contract Dev    | Username registry, invoice/payment contracts, testnet deploy|

---

## ⚙️ How to Run the App (Dev Mode)

### 📦 Requirements
- Node.js ≥ 18
- Expo CLI
- MongoDB (or Supabase/Firebase)
- Hardhat (for smart contract testing)

### 🛠️ Steps

```bash
# Clone the repo
git clone https://github.com/your-username/kaluuba-pay.git
cd kaluuba

# Install mobile app dependencies
npm install

# Start Expo project
npx expo start
