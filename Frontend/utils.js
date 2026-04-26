// Utility functions for FoodBridge Optimization

// 1. Caching
const cache = {};

window.fetchWithCache = async (key, fn, ttl = 300000) => {
    // Check if cache exists and is valid (ttl: 5 mins default)
    const cachedItem = cache[key];
    if (cachedItem && (Date.now() - cachedItem.timestamp < ttl)) {
        console.log(`[Cache Hit]: ${key}`);
        return cachedItem.data;
    }
    
    // Fetch new data
    try {
        console.log(`[Cache Miss]: Fetching ${key}`);
        const data = await fn();
        cache[key] = {
            data,
            timestamp: Date.now()
        };
        return data;
    } catch (error) {
        console.error(`[Fetch Error] for ${key}:`, error);
        throw error;
    }
};

// 2. Retry Mechanism
window.fetchWithRetry = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries > 0) {
            console.warn(`[Retry]: ${retries} attempts left. Retrying in ${delay}ms...`);
            await new Promise(r => setTimeout(r, delay));
            return window.fetchWithRetry(fn, retries - 1, delay * 1.5); // Exponential backoff
        }
        throw error;
    }
};

// 3. Image Compression
window.compressImage = (file, maxWidth = 800, quality = 0.7) => {
    return new Promise((resolve, reject) => {
        if (!file || !file.type.startsWith('image/')) {
            reject(new Error("Invalid file type. Please upload an image."));
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                
                // Return compressed Blob and Data URL
                canvas.toBlob((blob) => {
                    const dataUrl = canvas.toDataURL('image/jpeg', quality);
                    resolve({ blob, dataUrl });
                }, 'image/jpeg', quality);
            };
            img.onerror = (error) => reject(error);
        };
        reader.onerror = (error) => reject(error);
    });
};
