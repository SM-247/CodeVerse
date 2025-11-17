# BloodLink - Hospital-to-Hospital Blood Coordination System

## 🩸 Overview

BloodLink is a predictive hospital-to-hospital blood coordination system that uses AI-powered recommendations to optimize blood inventory management and reduce shortages. The system enables seamless communication between hospitals to ensure blood availability for critical surgeries.

## 🎯 Key Features

- **Smart Inventory Management**: Real-time blood inventory tracking across multiple hospitals
- **Predictive Analytics**: AI agent that forecasts blood demand based on scheduled surgeries
- **Hospital Coordination**: Send and receive blood requests between partner hospitals
- **Surgery Planner**: Schedule surgeries and track blood readiness
- **Agent Recommendations**: Get intelligent suggestions for blood procurement
- **Real-time Status Updates**: Track request status and hospital availability

## 📁 Project Structure

```
bloodlink/
├── backend/
│   ├── server.js                 # Express server entry point
│   ├── agent.js                  # AI agent logic
│   ├── package.json
│   ├── routes/
│   │   ├── inventory.js
│   │   ├── surgeries.js
│   │   ├── requests.js
│   │   └── hospitals.js
│   └── data/
│       ├── citycare/             # Hospital data
│       ├── metro/
│       └── sunrise/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Inventory.jsx
│   │   │   ├── SurgeryPlanner.jsx
│   │   │   ├── Requests.jsx
│   │   │   ├── AgentRecs.jsx
│   │   │   └── ...
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── HospitalSwitcher.jsx
│   │   │   ├── InventoryCard.jsx
│   │   │   └── ...
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.js
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   cd bloodlink
   ```

2. **Install root dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   cd ..
   ```

4. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

### Running the Application

#### Option 1: Run Both Backend and Frontend Concurrently
```bash
npm start
```

This command will:
- Start the Express backend on `http://localhost:5000`
- Start the Vite dev server on `http://localhost:3000`

#### Option 2: Run Backend Only
```bash
npm run backend-only
```
Backend will run on `http://localhost:5000`

## 📚 API Endpoints

### Inventory
- `GET /api/:hospital/inventory` - Get hospital inventory
- `POST /api/:hospital/inventory/update` - Update blood units

### Surgeries
- `GET /api/:hospital/surgeries` - Get upcoming surgeries with readiness status
- `POST /api/:hospital/surgeries/add` - Schedule a new surgery

### Requests
- `GET /api/:hospital/requests/incoming` - Get incoming blood requests
- `GET /api/:hospital/requests/outgoing` - Get outgoing blood requests
- `POST /api/:hospital/requests/send` - Send blood request to another hospital
- `POST /api/:hospital/requests/update-status` - Update request status

### Hospitals
- `GET /api/hospitals` - Get list of all hospitals
- `GET /api/:hospital/agent/recommendations` - Get AI recommendations

## 🧠 Agent Logic

The BloodLink Agent analyzes:

1. **Current Inventory**: Available blood units by type in each hospital
2. **Upcoming Surgeries**: Scheduled procedures with blood requirements
3. **Demand Forecasting**: Calculates total blood needed based on surgeries
4. **Shortage Identification**: Identifies blood types with insufficient stock
5. **Hospital Coordination**: Suggests eligible hospitals for blood requests

### Recommendation Output

```json
{
  "bloodGroup": "O+",
  "totalRequired": 15,
  "available": 10,
  "shortage": 5,
  "urgency": "high",
  "recommendedHospitals": [
    {
      "hospital": "metro",
      "available": 14,
      "score": 0.93
    }
  ],
  "actionRequired": true
}
```

## 🎨 UI Components

### Pages
- **Dashboard**: Overview of blood inventory, pending requests, and critical alerts
- **Inventory**: Detailed blood inventory with search and filter
- **Surgery Planner**: Schedule surgeries and track readiness
- **Requests**: Manage incoming and outgoing blood requests
- **Agent Recs**: View AI-powered recommendations

### Components
- **Sidebar**: Navigation menu
- **HospitalSwitcher**: Switch between hospitals
- **StatusBadge**: Status indicators (Optimal, Low, Critical)
- **InventoryCard**: Blood type card with units and status
- **SurgeryCard**: Surgery details with readiness status
- **RequestCard**: Blood request details

## 📊 Mock Data

The system includes sample data for three hospitals:

- **City Care Hospital** - Urban hospital with standard inventory
- **Metro Medical Center** - Large metro hospital with higher capacity
- **Sunrise Health Clinic** - Smaller clinic with lower inventory

Each hospital has:
- Blood inventory (8 blood types)
- Upcoming surgeries (2-3 scheduled)
- Empty incoming/outgoing request queues (populated dynamically)

## 🔄 Workflow Example

1. **Surgery Scheduled** → Surgeon creates surgery with blood requirements
2. **Agent Analysis** → Agent checks inventory vs. demand
3. **Shortage Detected** → If insufficient blood, agent identifies problem
4. **Recommendations** → Agent suggests hospitals with available blood
5. **Request Sent** → Coordinator sends request to recommended hospital
6. **Status Tracking** → Track request approval and delivery timeline

## 🛠️ Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing
- **File System** - Mock JSON database

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Axios** - HTTP client
- **CSS** - Styling with Tailwind-inspired design

## 📝 Notes

- All data is stored in JSON files (mock database)
- No persistent database is used (data is reset on server restart)
- The system uses hash-based routing for single-page navigation
- API runs on port 5000, frontend on port 3000

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or issues.

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ for hospitals and blood banks**
