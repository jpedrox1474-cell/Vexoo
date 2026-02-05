// Mock Base44 Client to replace the real SDK and avoid 404s
// Uses localStorage to persist data

const getCollection = (entity) => {
  const key = `base44_mock_${entity}`;
  return JSON.parse(localStorage.getItem(key) || '[]');
};

const saveCollection = (entity, data) => {
  const key = `base44_mock_${entity}`;
  localStorage.setItem(key, JSON.stringify(data));
};

const createMockEntity = (entityName) => ({
  list: async (options = {}) => {
    return getCollection(entityName);
  },
  get: async (id) => {
    const items = getCollection(entityName);
    return items.find(i => i.id === id);
  },
  create: async (data) => {
    const items = getCollection(entityName);
    const newItem = { id: Date.now().toString(), ...data, createdAt: new Date().toISOString() };
    items.push(newItem);
    saveCollection(entityName, items);
    return newItem;
  },
  update: async (id, data) => {
    const items = getCollection(entityName);
    const index = items.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Not found');
    items[index] = { ...items[index], ...data, updatedAt: new Date().toISOString() };
    saveCollection(entityName, items);
    return items[index];
  },
  delete: async (id) => {
    const items = getCollection(entityName);
    const newItems = items.filter(i => i.id !== id);
    saveCollection(entityName, newItems);
    return { success: true };
  }
});

// Proxy handler to auto-generate entity APIs on access
const entitiesHandler = {
  get: (target, prop) => {
    if (!target[prop]) {
      target[prop] = createMockEntity(prop);
    }
    return target[prop];
  }
};

export const base44 = {
  entities: new Proxy({}, entitiesHandler),
  appLogs: {
    logUserInApp: async (page) => {
      console.log(`[MockBase44] Logged page view: ${page}`);
      return true;
    }
  },
  auth: {
    login: async () => { throw new Error("Use AuthContext for login"); },
    currentUser: null
  }
};

// Export appParams just in case, though not used by mock
export const appParams = {
  appId: 'mock-app-id',
  token: 'mock-token',
  functionsVersion: 'v1',
  appBaseUrl: 'http://localhost'
};
