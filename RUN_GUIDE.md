# 🚀 Getting Started: Incident Management System

This guide will walk you through setting up and running your new **Incident Management & Troubleshooting System**.

## 📋 Prerequisites
Before you begin, ensure you have the following installed on your machine:
- **Node.js** (v18.0.0 or higher)
- **npm** (usually comes with Node.js)

---

## 🛠️ Step 1: Installation
Open your terminal in the project directory and run:

```bash
npm install
```
> [!NOTE]
> This will install all necessary dependencies, including **React**, **Vite**, and **Lucide-React** for icons.

---

## 🏃 Step 2: Running the Application
To start the development server, run:

```bash
npm run dev
```

After running this, you will see a local URL in your terminal (typically `http://localhost:5173`). 
**Click the link** or copy it into your browser to view the application.

---

## 📦 Step 3: Production Build (Optional)
If you want to create a production-ready bundle of the app:

```bash
npm run build
```
This generates a `dist` folder containing the optimized HTML, CSS, and JS files.

---

## 🔍 Feature Tour (What to demo)

To get the most out of this project for your Deloitte application, try this workflow:

1.  **Dashboard Insight**: View the "Systems Overview" to see the health of the ProPayroll AI.
2.  **Filter Incidents**: Go to the **Incident List** and use the category filter (e.g., Click "Compliance") to see targeted issues.
3.  **Create a Ticket**: Click **"New Incident"** and select `E003 - Tax calculation error`. Notice how it automatically maps to the Compliance category.
4.  **Resolve an Issue**: 
    - Click an incident like `INC-001`.
    - Click **"Start Investigation"**.
    - Type a "Root Cause" (e.g., "Mismatched tax brackets in local config").
    - Click **"Resolve Incident"**.
5.  **Audit Trail Check**: Scroll down on an incident detail page to see the **Audit Trail**—this shows the exact time each action was taken.
6.  **Export Data**: Click the **Download icon** (FileDown) in the top navigation to export your incident logs as a CSV file.

---

## 💡 Deloitte Context Tip
When discussing this project, emphasize how it demonstrates your **operational rigor**:
- "I implemented an **Auto-Audit Trail** to ensure every support action is logged for compliance."
- "The system handles **Specific Payroll Error Codes** to bridge the gap between technical failures and business impact."
