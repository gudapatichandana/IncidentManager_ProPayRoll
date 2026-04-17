# Incident Management & Troubleshooting System (IMTS)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Enterprise Ready](https://img.shields.io/badge/Enterprise-Ready-blue?style=for-the-badge&logo=shippable&logoColor=white)]()

A high-fidelity operational portal engineered for **ProPayroll AI** Support & Operations. This system manage technical disruptions through a standardized lifecycle—from automated incident reception to mandatory root cause analysis and resolution auditing.

---

## 🏛️ System Architecture

The IMTS is designed as a decoupled support tier that integrates seamlessly with core payroll engines to ensure high "System Availability" and compliance.

```mermaid
graph TD
    subgraph "External Ecosystem"
        PAI["ProPayroll AI Engine"]
    end

    subgraph "Incident Management System (React)"
        FB["Failure Simulator (API Mirror)"]
        Dashboard["Monitoring Dashboard"]
        Registry["Incident Registry (Search/Filter)"]
        Detail["Investigation & RCA Portal"]
        Audit["Immutable Audit Log Service"]
        Export["CSV Reporting Engine"]
        LS[("LocalStorage Persistence Layer")]
    end

    PAI -- "Encrypted Error Signal (E001-E004)" --> FB
    FB -- "Generate INC Record" --> LS
    LS -- "Real-time Sync" --> Dashboard
    LS -- "Registry Feed" --> Registry
    Registry -- "Contextual Selection" --> Detail
    Detail -- "Workflow State Update" --> LS
    Detail -- "RCA Data Logging" --> Audit
    LS -- "Historical Data" --> Export
```

---

## 💼 Business Intelligence: The Problem & Solution

### **The Challenge**
In large-scale fintech environments (like Deloitte payroll clients), manual tracking of system failures leads to **Data Silos**, **Audit Failures**, and **Increased Downtime**. Without a structured RCA (Root Cause Analysis) framework, recurring bugs are rarely fixed at the source.

### **The Solution**
The IMTS addresses these challenges by:
- **Centralizing Failure Signals**: Converting technical errors into actionable business incidents.
- **Enforcing Accountability**: Mandatory Root Cause Analysis ensure every fix is justified and documented.
- **Ensuring Compliance**: An immutable audit trail captures every responder action for regulatory review.

---

## 🔄 Operational Workflow

The following sequence illustrates the end-to-end lifecycle of a critical payroll failure:

```mermaid
sequenceDiagram
    participant P as ProPayroll AI
    participant I as Incident System
    participant E as Support Engineer
    participant A as Admin/Auditor

    P->>I: Critical Error (E003: Tax Calculation Variance)
    I->>I: Auto-Generate INC-003 & Notify Queue
    E->>I: Accesse Registry & "Start Work"
    I->>I: Record Timestamp & Responder Role
    E->>I: Perform Troubleshooting & Analysis
    E->>I: Select Root Cause (e.g., Configuration Mismatch)
    E->>I: "Mark Resolved"
    A->>I: Export CSV for Weekly Audit Review
```

---

## 🚀 Core Functionalities

> [!TIP]
> Use the **"Simulate Payroll Failure"** button on the Dashboard to demonstrate real-time data reception from the payroll engine.

| Feature | Description | Business Value |
| :--- | :--- | :--- |
| **Simulated Integration** | API Mirror receiving signals from ProPayroll AI. | Demonstrates End-to-End system thinking. |
| **Standardized Lifecycle** | Open → In Progress → Resolved workflow. | ensures engineering rigor and process control. |
| **Mandatory RCA** | Predefined root cause selection for every ticket. | Eliminates "guesswork" and targets permanent fixes. |
| **Immutable Audit Logs** | chronological trail of all responder actions. | Essential for regulatory compliance and accountability. |
| **CSV Export Engine** | Dynamic data extraction for stakeholder reporting. | Facilitates data-driven operational decisions. |

---

## 🛠️ Technical Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18 / Vite | High-performance, modular UI with HMR. |
| **Styling Engine** | Tailwind CSS v3 | Utility-first design for professional UI consistency. |
| **Persistence** | Browser LocalStorage | Local data integrity without backend dependency. |
| **Iconography** | Lucide-React | Industry-standard vector iconography. |
| **Visualization** | Mermaid.js | Technical architecture and workflow modeling. |

---

## ⚡ Setup & Deployment

> [!NOTE]
> This project is designed as a standalone "Frontend + Storage" demo for portability during interviews.

1.  **Clone & Install**:
    ```bash
    npm install
    ```
2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
3.  **Build for Production**:
    ```bash
    npm run build
    ```

---

## 🎓 Interview Talking Points
- **System Stability**: Discuss how this portal reduces **MTTR (Mean Time To Resolution)** by mapping technical error codes to business context.
- **Consulting Mindset**: Explain how the **Audit Trail** and **RCA Module** align with the compliance-heavy requirements of Deloitte's clients.

---

Designed for Professional Excellence in Support Operations.
