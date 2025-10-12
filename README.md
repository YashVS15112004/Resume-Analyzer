# 📄 AI Resume Analyzer

A full-stack web application that allows users to upload a resume, receive an in-depth analysis powered by the Google Gemini API, and view a history of all past analyses.

---

## ✨ Features

* **📄 PDF Resume Upload**: Easily upload resumes in PDF format.
* **🤖 AI-Powered Analysis**: Extracts key information like contact details, work experience, education, and skills.
* **💡 Actionable Feedback**: Provides a resume rating, concrete improvement suggestions, and tailored upskilling recommendations.
* **🗄️ Analysis History**: Stores and displays a complete history of all analyzed resumes in a clean, searchable table.
* **💻 Modern UI**: A clean, responsive, and user-friendly interface built with React and Material-UI.

---

## 📸 Screenshots

### Analysis Page
*The main interface for uploading a resume and viewing the live analysis results.*


### History Page
*A table view of all previously analyzed resumes, with an option to view detailed results in a modal.*


---

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React (Vite), Material-UI, Axios |
| **Backend** | Python 3.11+, FastAPI |
| **Database** | PostgreSQL |
| **AI / LLM**| Google Gemini API, LangChain |
| **Server** | Uvicorn |

---

## ⚙️ Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

* **Node.js** (v18 or later)
* **Python** (v3.10 or later)
* **PostgreSQL** server running locally

### 1. Clone the Repository

```bash
git clone [https://github.com/your-username/resume-analyzer.git](https://github.com/your-username/resume-analyzer.git)
cd resume-analyzer
