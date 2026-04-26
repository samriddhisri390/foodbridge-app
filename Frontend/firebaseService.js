// Mock Firebase Service for FoodBridge
// This structure simulates optimal Firebase usage patterns for future backend integration.

const mockDB = {
    // Simulated Database Collection
    donations: [
        { id: "don_1", foodName: "Rice & Curry (50 plates)", status: "Pending", createdAt: Date.now() - 100000 },
        { id: "don_2", foodName: "Fresh Bread (20 loaves)", status: "Pending", createdAt: Date.now() - 200000 },
        { id: "don_3", foodName: "Apples (10 kg)", status: "Accepted", createdAt: Date.now() - 500000 }
    ]
};

const FirebaseService = {
    // 1. Lazy Loading Firebase (Simulated)
    init: async () => {
        console.log("[Firebase]: Lazy loading modules...");
        // Example logic:
        // const { initializeApp } = await import('firebase/app');
        // const { getFirestore, enableIndexedDbPersistence } = await import('firebase/firestore');
        // const app = initializeApp(firebaseConfig);
        // const db = getFirestore(app);
        // await enableIndexedDbPersistence(db);
        
        await new Promise(r => setTimeout(r, 500)); // Simulate load time
        console.log("[Firebase]: Initialized with offline persistence");
        return true;
    },

    // 2. Optimized Queries (Pagination & Select Specific Fields)
    getDonations: async (limitCount = 10, startAfterDoc = null) => {
        // Simulated Firestore query:
        // let q = query(collection(db, "donations"), orderBy("createdAt", "desc"), limit(limitCount));
        
        return new Promise((resolve) => {
            setTimeout(() => {
                let results = [...mockDB.donations].sort((a, b) => b.createdAt - a.createdAt).slice(0, limitCount);
                resolve(results);
            }, 800); // Simulate network delay
        });
    },

    // 3. Batch Writes
    acceptMultipleDonations: async (donationIds, ngoId) => {
        // Simulated Batch Write
        // const batch = writeBatch(db);
        // donationIds.forEach(id => {
        //     const docRef = doc(db, "donations", id);
        //     batch.update(docRef, { status: "Accepted", acceptedBy: ngoId });
        // });
        // await batch.commit();

        console.log(`[Firebase Batch]: Updating ${donationIds.length} donations to 'Accepted'`);
        return new Promise(resolve => setTimeout(() => resolve(true), 500));
    },

    // 4. Real-time Listeners (Proper Unsubscribe)
    listenToDonation: (donationId, callback) => {
        // Simulated real-time snapshot
        // const unsub = onSnapshot(doc(db, "donations", donationId), (doc) => {
        //     callback(doc.data());
        // });
        // return unsub;

        console.log(`[Firebase Listener]: Subscribed to ${donationId}`);
        const interval = setInterval(() => {
            // Mock a status change occasionally
            callback({ id: donationId, status: Math.random() > 0.5 ? "In Transit" : "Delivered" });
        }, 5000);

        return () => {
            console.log(`[Firebase Listener]: Unsubscribed from ${donationId}`);
            clearInterval(interval);
        };
    }
};

window.FirebaseService = FirebaseService;
