# 🏠 HedraHome – Decentralized Smart Home Automation  

**HedraHome** is a **full-stack Web3 smart home automation and control system** built on **Hedera Hashgraph**, enabling users to manage and monitor their connected devices securely, transparently, and efficiently.  

The platform blends **IoT automation**, **blockchain-powered ownership**, and **Hedera-based smart contracts**, offering users full control over their smart devices with **real-time blockchain-backed data integrity**.  

---

## 🎨 Design & UI Theme

- **Primary Color:** Blue `#1D4ED8`
- **Accent Colors:** White `#FFFFFF` and Dark Gray `#1F2937`
- **Design Style:** Futuristic, responsive, and minimalist
- **User Experience:** Optimized for both mobile and desktop, with smooth animations and intuitive layouts

---

## 🚀 Core Features

### 🔐 Web3 Authentication
- Login and connect via **HashPack Wallet**
- Secure user identity and session management using **Hedera accounts**

### 🧠 Smart Device Control
- Add and manage smart home devices (lights, doors, thermostats, etc.)
- Toggle automation on/off directly from the dashboard
- Smart contract triggers device events on-chain for transparency

### 🌐 Hedera Integration
- **Hedera Smart Contracts:** Manage automation rules, device ownership, and on-chain logging  
  ↳ [Docs](https://hashgraph.github.io/hedera)
- **Hedera Token Service (HTS):** Tokenize devices for ownership and access rights  
  ↳ [Docs](https://docs.hedera.com/hedera/sdks-and-apis/rest-api/tokens)
- **Mirror Node API:** Fetch device logs, automation history, and verified events  
  ↳ [Docs](https://mainnet.mirrornode.hedera.com/api/v1/docs)

### 📱 Device Tokenization
- Each registered smart device is represented as a **non-fungible token (NFT)** on Hedera  
- Enables **ownership transfer**, **leasing**, and **shared access rights**  

### 🧩 Automation Rules Engine
- Create on-chain automation rules (e.g., *“Turn off lights at 11PM”*)  
- Uses **Solidity smart contracts** to enforce rule execution with verifiable results  

### 💡 Energy Analytics
- Real-time energy consumption tracking  
- Mirror Node integration for timestamped, tamper-proof usage data  

---

## 🧰 Tech Stack

| Layer | Technology |
|:------|:------------|
| **Frontend** | React + TypeScript + TailwindCSS |
| **Backend** | Node.js + Express |
| **Blockchain** | Hedera Hashgraph (HTS + Smart Contracts) |
| **Wallet** | HashPack |
| **Database** | Firebase / MongoDB |
| **APIs** | Hedera REST API + Mirror Node API |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/yourusername/hedrahome.git
cd hedrahome
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Configure Environment Variables
Create a .env file in the root directory:

ini
Copy code
HEDERA_ACCOUNT_ID=your_account_id
HEDERA_PRIVATE_KEY=your_private_key
MIRROR_NODE_URL=https://mainnet.mirrornode.hedera.com/api/v1
HASHPACK_CLIENT_ID=your_hashpack_client_id
4️⃣ Run the Development Server
bash
Copy code
npm run dev
Your app will be live at http://localhost:3000

🔗 Hedera Components Overview
Component	Description	Docs
Hedera REST API	Mint, manage, and transfer tokens for device access and automation	REST API Docs
Smart Contracts	Execute automation logic and validate device states	Smart Contract Docs
Mirror Node API	Retrieve transaction history and event data	Mirror Node Docs
HashPack Wallet	User authentication and token management	HashPack App

🧠 Future Enhancements
AI-driven predictive automation (learning user habits)

Integration with solar energy and smart metering

Voice assistant integration (Google Assistant, Alexa)

DAO governance for community-driven automation templates

🌍 Vision
HedraHome aims to redefine how people interact with smart devices by combining IoT convenience with blockchain trust.
It provides users full control, transparency, and privacy in managing their smart homes — the Web3 way.

