export const SEED_PROPERTIES = [
  { id: 1, companyId: 1, name: "3477 E 48th Ave", address: "3477 E 48th Ave, Vancouver, BC", units: 6,  image: "🏘" },
  { id: 2, companyId: 1, name: "3479 E 48th Ave", address: "3479 E 48th Ave, Vancouver, BC", units: 6,  image: "🏘" },
  { id: 3, companyId: 1, name: "3416 E 4th Ave",  address: "3416 E 4th Ave, Vancouver, BC",  units: 8,  image: "🏢" },
];

export const SEED_TICKETS = [
  { id: 1, propertyId: 1, unit: "2", renterId: "renter-1", renter: "Sarah M.",  title: "Heating not working",      category: "HVAC",           priority: "HIGH",     status: "IN_PROGRESS", date: "2026-02-28", description: "The heater stopped working 3 days ago.", assignee: "Mike T.",   photos: [] },
  { id: 2, propertyId: 1, unit: "4", renterId: "renter-2", renter: "James L.",  title: "Leaky faucet in kitchen",  category: "Plumbing",        priority: "MEDIUM",   status: "OPEN",        date: "2026-03-01", description: "Kitchen faucet dripping constantly.",    assignee: null,        photos: [] },
  { id: 3, propertyId: 2, unit: "1", renterId: "renter-3", renter: "Priya K.",  title: "Broken window latch",      category: "Security",        priority: "HIGH",     status: "OPEN",        date: "2026-03-02", description: "Window won't lock properly.",            assignee: null,        photos: [] },
  { id: 4, propertyId: 3, unit: "3", renterId: "renter-4", renter: "Tom H.",    title: "Mold in bathroom",         category: "Health & Safety", priority: "CRITICAL", status: "OPEN",        date: "2026-03-01", description: "Black mold forming near shower.",        assignee: null,        photos: [] },
  { id: 5, propertyId: 2, unit: "5", renterId: "renter-5", renter: "Dana W.",   title: "Parking lot light out",    category: "Electrical",      priority: "LOW",      status: "RESOLVED",    date: "2026-02-20", description: "Light bulb in spot 12 is out.",          assignee: "Carlos R.", photos: [] },
];

export const SEED_USERS = [
  { id: "manager-1", role: "manager", name: "Admin",    email: "admin@propdesk.ca", password: "admin123",  companyId: 1 },
  { id: "renter-1",  role: "renter",  name: "Sarah M.", email: "sarah@email.com",   password: "renter123", propertyId: 1, unit: "2" },
  { id: "renter-2",  role: "renter",  name: "James L.", email: "james@email.com",   password: "renter123", propertyId: 1, unit: "4" },
  { id: "renter-3",  role: "renter",  name: "Priya K.", email: "priya@email.com",   password: "renter123", propertyId: 2, unit: "1" },
];

export const CATEGORIES = [
  "Plumbing", "Electrical", "HVAC", "Appliance",
  "Security", "Pest Control", "Health & Safety", "Structural", "Other"
];

export const PRIORITY_STYLES = {
  CRITICAL: { bg: "#FF2D2D22", text: "#FF2D2D", label: "Critical" },
  HIGH:     { bg: "#FF7A2222", text: "#FF7A22", label: "High"     },
  MEDIUM:   { bg: "#F5C84222", text: "#C49500", label: "Medium"   },
  LOW:      { bg: "#22AA5522", text: "#22AA55", label: "Low"      },
};

export const STATUS_STYLES = {
  OPEN:        { bg: "#FF2D2D18", text: "#FF2D2D", label: "Open"        },
  IN_PROGRESS: { bg: "#2A7BE818", text: "#2A7BE8", label: "In Progress" },
  RESOLVED:    { bg: "#22AA5518", text: "#22AA55", label: "Resolved"    },
};
