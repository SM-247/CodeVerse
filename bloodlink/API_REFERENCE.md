# BloodLink API Reference & Examples

## Base URL
```
http://localhost:5000/api
```

## Authentication
No authentication required (mock system)

---

## 🏥 Hospital Endpoints

### Get All Hospitals
```http
GET /api/hospitals
```

**Response:**
```json
["citycare", "metro", "sunrise"]
```

---

## 🩸 Inventory Endpoints

### Get Hospital Inventory
```http
GET /api/:hospital/inventory
```

**Parameters:**
- `hospital` (path): `citycare`, `metro`, or `sunrise`

**Example:**
```http
GET /api/citycare/inventory
```

**Response:**
```json
{
  "A+": 12,
  "A-": 3,
  "B+": 6,
  "B-": 2,
  "O+": 10,
  "O-": 1,
  "AB+": 4,
  "AB-": 2
}
```

### Update Inventory
```http
POST /api/:hospital/inventory/update
```

**Body:**
```json
{
  "bloodGroup": "O+",
  "units": 5
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/citycare/inventory/update \
  -H "Content-Type: application/json" \
  -d '{"bloodGroup": "O+", "units": 5}'
```

**Response:**
```json
{
  "message": "Inventory updated",
  "inventory": {
    "A+": 12,
    "A-": 3,
    "B+": 6,
    "B-": 2,
    "O+": 15,
    "O-": 1,
    "AB+": 4,
    "AB-": 2
  }
}
```

---

## 🏥 Surgery Endpoints

### Get Upcoming Surgeries
```http
GET /api/:hospital/surgeries
```

**Example:**
```http
GET /api/citycare/surgeries
```

**Response:**
```json
{
  "surgeries": [
    {
      "id": 1,
      "procedure": "Cardiac Surgery",
      "units": 8,
      "bloodGroup": "O+",
      "priority": "high",
      "date": "2025-11-22",
      "isReady": true,
      "availableUnits": 10,
      "requiredUnits": 8,
      "status": "ready"
    }
  ],
  "count": 1
}
```

### Schedule New Surgery
```http
POST /api/:hospital/surgeries/add
```

**Body:**
```json
{
  "procedure": "Emergency Trauma Surgery",
  "units": 6,
  "bloodGroup": "B+",
  "date": "2025-11-20",
  "priority": "critical"
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/citycare/surgeries/add \
  -H "Content-Type: application/json" \
  -d '{
    "procedure": "Emergency Trauma",
    "units": 6,
    "bloodGroup": "B+",
    "date": "2025-11-20",
    "priority": "critical"
  }'
```

**Response:**
```json
{
  "message": "Surgery added successfully",
  "surgeries": [...]
}
```

---

## 📤 Request Endpoints

### Get Incoming Requests
```http
GET /api/:hospital/requests/incoming
```

**Response:**
```json
[]
```

### Get Outgoing Requests
```http
GET /api/:hospital/requests/outgoing
```

**Response:**
```json
[]
```

### Send Blood Request
```http
POST /api/:hospital/requests/send
```

**Body:**
```json
{
  "targetHospital": "metro",
  "bloodGroup": "O+",
  "units": 5
}
```

**Example cURL:**
```bash
curl -X POST http://localhost:5000/api/citycare/requests/send \
  -H "Content-Type: application/json" \
  -d '{
    "targetHospital": "metro",
    "bloodGroup": "O+",
    "units": 5
  }'
```

**Response:**
```json
{
  "message": "Request sent successfully",
  "request": {
    "id": 1637252400000,
    "from": "citycare",
    "to": "metro",
    "bloodGroup": "O+",
    "units": 5,
    "status": "pending",
    "dateCreated": "2025-11-18T10:30:00.000Z"
  }
}
```

### Update Request Status
```http
POST /api/:hospital/requests/update-status
```

**Body:**
```json
{
  "requestId": 1637252400000,
  "status": "accepted"
}
```

**Status values:** `pending`, `accepted`, `declined`, `delivered`

---

## 🧠 AI Agent Recommendations

### Get Agent Recommendations
```http
GET /api/:hospital/agent/recommendations
```

**Example:**
```http
GET /api/citycare/agent/recommendations
```

**Response:**
```json
[
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
]
```

**Urgency Levels:**
- `critical`: Shortage > 10 units
- `high`: Shortage 5-10 units
- `medium`: Shortage < 5 units

---

## 📋 Complete Workflow Example

### Step 1: Check Inventory
```bash
curl http://localhost:5000/api/citycare/inventory
```

### Step 2: View Upcoming Surgeries
```bash
curl http://localhost:5000/api/citycare/surgeries
```

### Step 3: Get AI Recommendations
```bash
curl http://localhost:5000/api/citycare/agent/recommendations
```

### Step 4: Send Blood Request
```bash
curl -X POST http://localhost:5000/api/citycare/requests/send \
  -H "Content-Type: application/json" \
  -d '{"targetHospital": "metro", "bloodGroup": "O+", "units": 5}'
```

### Step 5: Check Incoming Requests (at metro)
```bash
curl http://localhost:5000/api/metro/requests/incoming
```

### Step 6: Accept Request
```bash
curl -X POST http://localhost:5000/api/metro/requests/update-status \
  -H "Content-Type: application/json" \
  -d '{"requestId": 1637252400000, "status": "accepted"}'
```

---

## 🧪 Test Data

### Available Hospitals
- `citycare` - City Care Hospital
- `metro` - Metro Medical Center
- `sunrise` - Sunrise Health Clinic

### Blood Types
- `O+` (Universal Donor)
- `O-` (Universal Donor Negative)
- `A+`
- `A-`
- `B+`
- `B-`
- `AB+` (Universal Recipient)
- `AB-` (Universal Recipient Negative)

### Priority Levels
- `low`
- `medium`
- `high`
- `critical`

---

## 💡 Common Use Cases

### Use Case 1: Emergency Blood Shortage
1. Schedule emergency surgery
2. Check inventory - insufficient blood
3. Get AI recommendations
4. Send request to recommended hospital
5. Track request status

### Use Case 2: Routine Surgery Planning
1. Schedule surgery weeks in advance
2. System checks stock
3. If shortage detected, plan for requests
4. Prepare blood before surgery date

### Use Case 3: Multi-Hospital Coordination
1. Hospital A detects shortage
2. Requests from Hospital B
3. Hospital B approves transfer
4. Updates inventory in both hospitals
5. Confirms surgery readiness

---

## 🔗 Frontend Integration

### Axios Examples

```javascript
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Get inventory
axios.get(`${API_BASE}/citycare/inventory`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// Send blood request
axios.post(`${API_BASE}/citycare/requests/send`, {
  targetHospital: 'metro',
  bloodGroup: 'O+',
  units: 5
})
.then(res => console.log(res.data))
.catch(err => console.error(err));

// Get recommendations
axios.get(`${API_BASE}/citycare/agent/recommendations`)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
```

---

## 📊 Response Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

---

## 🔒 Error Handling

All endpoints return error responses in this format:

```json
{
  "error": "Error message describing what went wrong"
}
```

---

**For more information, see README.md**
