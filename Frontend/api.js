var BASE_URL = "http://localhost:5000";

async function getAllDonations() {
  const res = await fetch(`${BASE_URL}/api/donations/all`);
  return res.json();
}

async function addDonation(data) {
  const res = await fetch(`${BASE_URL}/api/donations/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function acceptDonation(id, ngoId) {
  const res = await fetch(`${BASE_URL}/api/ngo/accept/${id}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ngoId })
  });
  return res.json();
}

async function createSOS(data) {
  const res = await fetch(`${BASE_URL}/api/sos/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return res.json();
}

async function getExpiringFood() {
  const res = await fetch(`${BASE_URL}/api/donations/expiring`);
  return res.json();
}

async function trackDonation(id) {
  const res = await fetch(`${BASE_URL}/api/donations/track/${id}`);
  return res.json();
}