# BloodLink - Developer's Guide

## 🎯 Architecture Overview

BloodLink follows a classic client-server architecture with:

```
┌─────────────────┐
│   React UI      │
│   (Port 3000)   │
└────────┬────────┘
         │ HTTP/REST
         ↓
┌─────────────────┐
│ Express API     │
│ (Port 5000)     │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│  JSON Files     │
│  (Mock DB)      │
└─────────────────┘
```

## 📦 Backend Architecture

### Directory Structure
```
backend/
├── server.js          # Express setup & middleware
├── agent.js           # AI/Agent logic (core business logic)
├── routes/            # API endpoints
│   ├── inventory.js   # Blood inventory operations
│   ├── surgeries.js   # Surgery scheduling
│   ├── requests.js    # Blood requests
│   └── hospitals.js   # Hospital info & recommendations
└── data/              # Mock database
    ├── citycare/
    ├── metro/
    └── sunrise/
```

### Key Files Explained

#### `server.js`
- Express application setup
- Middleware configuration (CORS, body-parser)
- Route imports and registration
- Server startup on port 5000

```javascript
// Key imports
const inventoryRoutes = require('./routes/inventory');
const surgeriesRoutes = require('./routes/surgeries');
const requestsRoutes = require('./routes/requests');
const hospitalsRoutes = require('./routes/hospitals');

// Routes registered
app.use('/api', inventoryRoutes);
app.use('/api', surgeriesRoutes);
app.use('/api', requestsRoutes);
app.use('/api', hospitalsRoutes);
```

#### `agent.js` - Core Logic
The BloodLinkAgent class handles:

```javascript
class BloodLinkAgent {
  constructor(hospitalName)        // Initialize for specific hospital
  
  // Data Operations
  loadData(hospital, filename)     // Read JSON files
  saveData(hospital, filename, data) // Write JSON files
  
  // Inventory Analysis
  getCurrentInventory()            // Get available blood
  calculateDemand()                // Calculate surgery demand
  identifyShortages()              // Find shortage situations
  findEligibleHospitals()          // Find hospitals to request from
  
  // Recommendations
  generateRecommendations()        // Core AI logic
  getSurgeryReadiness()            // Check if surgeries ready
  
  // Operations
  updateInventory()                // Modify blood stock
  addSurgery()                     // Schedule surgery
  sendBloodRequest()               // Send request to other hospital
  updateRequestStatus()            // Track request status
}
```

#### Route Files Structure

**inventory.js**
```javascript
router.get('/:hospital/inventory')           // Get current inventory
router.post('/:hospital/inventory/update')   // Update blood units
```

**surgeries.js**
```javascript
router.get('/:hospital/surgeries')           // Get upcoming surgeries
router.post('/:hospital/surgeries/add')      // Schedule new surgery
```

**requests.js**
```javascript
router.get('/:hospital/requests/incoming')   // Get incoming requests
router.get('/:hospital/requests/outgoing')   // Get outgoing requests
router.post('/:hospital/requests/send')      // Send blood request
router.post('/:hospital/requests/update-status') // Update status
```

**hospitals.js**
```javascript
router.get('/hospitals')                     // List all hospitals
router.get('/:hospital/agent/recommendations') // Get AI recommendations
```

### Mock Data Structure

Each hospital has 4 JSON files:

**inventory.json**
```json
{
  "A+": 12,
  "A-": 3,
  "B+": 6,
  ...
}
```

**surgeries.json**
```json
[
  {
    "id": 1,
    "procedure": "Cardiac Surgery",
    "units": 8,
    "bloodGroup": "O+",
    "priority": "high",
    "date": "2025-11-22"
  }
]
```

**incoming.json / outgoing.json**
```json
[
  {
    "id": 1637252400000,
    "from": "citycare",
    "to": "metro",
    "bloodGroup": "O+",
    "units": 5,
    "status": "pending",
    "dateCreated": "2025-11-18T10:30:00.000Z"
  }
]
```

---

## 🎨 Frontend Architecture

### Directory Structure
```
frontend/src/
├── pages/            # Page components (views)
│   ├── Dashboard.jsx
│   ├── Inventory.jsx
│   ├── SurgeryPlanner.jsx
│   ├── Requests.jsx
│   ├── AgentRecs.jsx
│   └── ...
├── components/       # Reusable components
│   ├── Sidebar.jsx
│   ├── HospitalSwitcher.jsx
│   ├── InventoryCard.jsx
│   ├── SurgeryCard.jsx
│   ├── RequestCard.jsx
│   └── StatusBadge.jsx
├── styles/          # Global styles
│   └── global.css
├── App.js           # Main app component
└── main.jsx         # React entry point
```

### Component Hierarchy

```
<App>
  ├── Hash Router (navigation)
  ├── <Dashboard>
  │   ├── <Sidebar>
  │   ├── <HospitalSwitcher>
  │   ├── Stats Cards
  │   ├── <InventoryCard> (multiple)
  │   └── Alert Cards
  ├── <Inventory>
  ├── <SurgeryPlanner>
  ├── <Requests>
  │   ├── <RequestCard> (multiple)
  └── <AgentRecs>
      └── Recommendation Cards
```

### Page Components

#### Dashboard
- Shows overview of blood stock
- Displays pending requests count
- Shows critical alert count
- Lists blood pouches with status

#### Inventory
- Search bar for blood types
- Grid of all blood types
- Real-time unit display

#### SurgeryPlanner
- Form to schedule surgeries
- List of upcoming surgeries
- Shows readiness status

#### Requests
- Tabbed interface (Incoming/Outgoing)
- List of blood requests
- Status indicators

#### AgentRecs
- AI recommendations
- Shortage analysis
- Hospital suggestions

### Component Props Pattern

```javascript
// InventoryCard
<InventoryCard 
  bloodType="O+"      // Blood type identifier
  units={10}          // Available units
/>

// SurgeryCard
<SurgeryCard 
  surgery={{          // Surgery object from API
    id: 1,
    procedure: "...",
    isReady: true
  }}
/>

// StatusBadge
<StatusBadge 
  status="critical"   // 'critical', 'high', 'medium', 'low', 'optimal'
/>
```

### State Management

Each page manages its own state using React hooks:

```javascript
const [hospital, setHospital] = useState('citycare');
const [inventory, setInventory] = useState({});
const [loading, setLoading] = useState(true);
```

### API Integration

Using Axios for HTTP requests:

```javascript
const API_BASE = 'http://localhost:5000/api';

// Fetch data
useEffect(() => {
  axios.get(`${API_BASE}/${hospital}/inventory`)
    .then(res => setInventory(res.data))
    .catch(err => console.error(err));
}, [hospital]);
```

---

## 🧠 AI Agent Logic Deep Dive

### Agent Algorithm

1. **Load Current State**
   - Read current inventory from hospital
   - Read all upcoming surgeries
   - Load data from other hospitals

2. **Calculate Demand**
   - Sum blood units needed from surgeries
   - Group by blood type

3. **Identify Shortages**
   - Compare available vs. required
   - Determine urgency based on gap size

4. **Find Solutions**
   - Check other hospitals' inventory
   - Rank by availability (score)
   - Return top candidates

5. **Generate Recommendations**
   - Package shortage info
   - Include recommended hospitals
   - Flag action required

### Urgency Calculation

```javascript
const urgency = shortage > 10 ? 'critical' : 
                shortage > 5  ? 'high'     : 
                             'medium';
```

### Hospital Scoring

```javascript
const score = availableUnits / unitsNeeded;
// Higher score = better source
// Only hospitals with 50%+ capacity are considered
```

---

## 🔄 Data Flow Example: Send Blood Request

### User Action → API → Agent → Storage

```
1. User clicks "Send Request"
   │
2. Frontend POST /api/citycare/requests/send
   ├─ targetHospital: "metro"
   ├─ bloodGroup: "O+"
   └─ units: 5
   │
3. Backend receives request
   │
4. Agent.sendBloodRequest()
   ├─ Create request object
   ├─ Save to citycare/outgoing.json
   ├─ Add to metro/incoming.json
   └─ Return request
   │
5. Frontend receives response
   │
6. Refresh incoming requests in other hospital UI
```

---

## 🛠️ Development Workflow

### Adding a New Feature

#### 1. Add Backend Route
```javascript
// In routes/surgeries.js
router.post('/:hospital/surgeries/update', (req, res) => {
  const agent = new BloodLinkAgent(req.params.hospital);
  // Implement feature
  res.json({ success: true });
});
```

#### 2. Add Frontend Handler
```javascript
// In pages/SurgeryPlanner.jsx
const updateSurgery = async (surgeryId, updates) => {
  const response = await axios.post(
    `${API_BASE}/${hospital}/surgeries/update`,
    { surgeryId, ...updates }
  );
  fetchSurgeries(); // Refresh list
};
```

#### 3. Add UI Component
```javascript
// In components/
const NewFeature = ({ onUpdate }) => {
  return (
    <button onClick={() => onUpdate(...)}>
      Update
    </button>
  );
};
```

### Testing

1. **Backend Testing**
```bash
# Test API endpoint
curl http://localhost:5000/api/citycare/inventory
```

2. **Frontend Testing**
- Use browser DevTools
- Check Network tab for API calls
- Use React DevTools to inspect state

---

## 🚀 Deployment Tips

### Environment Variables
Create `.env` file in backend:
```
PORT=5000
HOSPITAL_DATA_PATH=./data
```

### Production Build
```bash
# Frontend
cd frontend
npm run build
# Generates optimized bundle in dist/

# Backend
npm install --production
```

### Docker-ready
The project can be containerized:
```dockerfile
FROM node:18
WORKDIR /app
COPY backend ./
RUN npm install --production
CMD ["node", "server.js"]
```

---

## 📚 Code Patterns

### Async/Await Pattern
```javascript
const fetchData = async () => {
  try {
    const response = await axios.get(url);
    setData(response.data);
  } catch (error) {
    console.error(error);
  }
};
```

### Component Composition
```javascript
const ParentComponent = () => {
  return (
    <>
      <Sidebar />
      <MainContent>
        <Card title="Title">
          <StatusBadge status="critical" />
        </Card>
      </MainContent>
    </>
  );
};
```

---

## 🐛 Debugging Tips

### Backend Debugging
```javascript
// Add logging
console.log('Incoming request:', req.body);
console.log('Data loaded:', data);

// Use try-catch
try {
  // Code
} catch (error) {
  console.error('Error details:', error.message, error.stack);
}
```

### Frontend Debugging
```javascript
// React DevTools
// Redux DevTools
// Network tab in DevTools
// console.log for state tracking

// Conditional rendering for debugging
{process.env.NODE_ENV === 'development' && (
  <div style={{color: 'red'}}>Debug Info: {JSON.stringify(data)}</div>
)}
```

---

## 📖 Additional Resources

- Express.js Docs: https://expressjs.com/
- React Docs: https://react.dev/
- Vite Docs: https://vitejs.dev/
- Axios Docs: https://axios-http.com/

---

**Happy coding! 🚀**
