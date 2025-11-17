# CodeVerse
🩸 BloodBank AI — Smart Blood Bank Management Dashboard

A modern, high-tech, enterprise-grade blood bank management system built using React, Vite, Tailwind CSS, Framer Motion, and Headless UI.
Designed for hospitals, blood centers, and emergency coordinators with real-time monitoring, polished UI, and agentic intelligence.

🚀 Features
🏥 Dashboard

Realistic blood pouch visuals

Blood inventory grid (A+, A−, B+, B−, O+, O−, AB+, AB−)

Expiry bars with safe/warning/critical levels

Premium card UI with deep shadows & gradients

Live statistics tiles

🔄 Smart Request Management

Vertical auto-scrolling carousel for:

Incoming requests

Outgoing requests

Detailed request cards:

Patient name

Hospital

Blood group & units

Urgency tags

Status badges

🔔 Incoming Request Modal

Modern glassmorphism / neo-brutalism hybrid

Headless UI + Framer Motion animations

Accept / Reject actions

Optional subtle alert sound

🗂 Inventory Management

Editable blood stock

Validation & error handling

Sorting & filters

Low-stock alerts and expiry warnings

🧪 Donor Management

Donor list with:

Avatar thumbnails

Status indicators

Filters (blood group, availability, city)

🤖 Agent Recommendations

Automated insights:

Predicted shortages

Suggested transfers

Donor targeting

Expiry-based alerts

🔥 High-End UI & UX

Left vertical navigation bar

Top navigation bar with search, profile, notifications

Framer-motion animations & micro-interactions

Premium spacing, shadows, and medical-grade color palette

Toast notification system (success / error / info)

Modern typography (Inter)

🛠 Tech Stack

Frontend

React + Vite

Tailwind CSS

React Router

Framer Motion

Headless UI

React Icons

Custom UI components

Design

Figma-inspired modern healthcare UI

Inter font

Deep Red #8A0E0E + Dark Navy

Rounded corners (12–16px)

Soft medical gradients & shadows

📁 Project Structure
src/
 ├── assets/ui/          # blood pouch images, icons, avatars
 ├── components/         # Sidebar, Topbar, UnitCard, Modal, Carousel, etc.
 ├── contexts/           # ToastProvider & global states
 ├── hooks/              # useAutoCarousel, useSound, etc.
 ├── pages/              # Dashboard, Inventory, Requests, Donors, Offers
 ├── App.jsx             # routing + layout shell
 ├── main.jsx            # entry point
 └── index.css           # Tailwind + global styles

🔧 Installation & Setup
# Clone repository
git clone https://github.com/<your-username>/<repo-name>

# Navigate into project
cd <repo-name>

# Install dependencies
npm install

# Start development server
npm run dev


App runs at:

http://localhost:5173

🎨 Customization

You can easily customize:

Colors (tailwind.config.cjs)

Blood pouch assets (src/assets/ui/)

Component styles

Animations

Toast variants

Pages & navigation

All UI is modular and reusable.

🧠 Future Enhancements

Backend integration (Node/Express, Django, Firebase, Supabase)

Real-time updates (WebSockets)

Authentication & role-based access

Donor notification automation

Production deployment pipelines

Machine learning predictions

🤝 Contributing

Contributions are welcome!
Feel free to submit issues or pull requests.

📜 License

MIT License — free for personal & commercial use.

⭐ Show Support

If you found this project helpful, please ⭐ star the repo on GitHub!
Your support helps the project grow.