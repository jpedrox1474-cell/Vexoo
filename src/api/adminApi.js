/**
 * Admin API - Standalone data management using localStorage
 * No Base44 dependency
 */

const getCollection = (entityName) => {
    const key = `vexo_${entityName.toLowerCase()}`;
    try {
        return JSON.parse(localStorage.getItem(key) || '[]');
    } catch (e) {
        console.error(`Error loading ${entityName}:`, e);
        return [];
    }
};

const saveCollection = (entityName, data) => {
    const key = `vexo_${entityName.toLowerCase()}`;
    localStorage.setItem(key, JSON.stringify(data));
};

export const adminApi = {
    /**
     * List all records for a given entity.
     */
    list: async (entityName) => {
        return getCollection(entityName);
    },

    /**
     * Get a single record by ID.
     */
    get: async (entityName, id) => {
        const items = getCollection(entityName);
        return items.find(i => i.id === id);
    },

    /**
     * Create or Sync a User record.
     * This is the "API Nova" bridge.
     */
    syncUser: async (userData) => {
        const users = getCollection('User');
        const existingIdx = users.findIndex(u => u.email === userData.email);

        const now = new Date().toISOString();

        if (existingIdx !== -1) {
            // Update existing user, but PROTECT the trial start date (createdAt)
            const updatedUser = {
                ...users[existingIdx],
                ...userData,
                updatedAt: now,
                // Ensure we don't accidentally overwrite the original creation date
                createdAt: users[existingIdx].createdAt || now
            };
            users[existingIdx] = updatedUser;
            saveCollection('User', users);
            return updatedUser;
        } else {
            // New User Registration
            const newUser = {
                id: Date.now().toString(),
                ...userData,
                createdAt: now,
                status: 'active',
                role: 'admin'
            };
            users.push(newUser);
            saveCollection('User', users);
            return newUser;
        }
    },

    /**
     * Create a generic record.
     */
    create: async (entityName, data) => {
        const items = getCollection(entityName);
        const newItem = {
            id: Date.now().toString(),
            ...data,
            createdAt: new Date().toISOString()
        };
        items.push(newItem);
        saveCollection(entityName, items);
        return newItem;
    },

    /**
     * Update an existing record.
     */
    update: async (entityName, id, data) => {
        const items = getCollection(entityName);
        const index = items.findIndex(i => i.id === id);
        if (index === -1) throw new Error('Record not found');

        items[index] = {
            ...items[index],
            ...data,
            updatedAt: new Date().toISOString()
        };
        saveCollection(entityName, items);
        return items[index];
    },

    /**
     * Delete a record.
     */
    delete: async (entityName, id) => {
        const items = getCollection(entityName);
        const newItems = items.filter(i => i.id !== id);
        saveCollection(entityName, newItems);
        return { success: true };
    },

    /**
     * Helper to check system connectivity status
     */
    getStatus: () => {
        const hasFirebase = !!import.meta['env']?.VITE_FIREBASE_API_KEY;
        return {
            database: 'Local Database (Admin API/LocalStorage)',
            authMode: hasFirebase ? 'Production (Real Google Auth)' : 'Development (Mock Google Auth)',
            totalUsers: getCollection('User').length
        };
    }
};

