'use client';

/**
 * IndexedDB service for storing voice recordings offline
 */

const DB_NAME = 'voiceRecorderDB';
const DB_VERSION = 1;
const RECORDINGS_STORE = 'recordings';

interface Recording {
  id?: number;
  timestamp: number;
  audioBlob: Blob;
  transcript: string;
  title?: string;
}

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof window.indexedDB !== 'undefined';

/**
 * Initialize the IndexedDB database
 */
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      reject(new Error('IndexedDB is not available in this environment'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(new Error('Error opening IndexedDB'));
    };

    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store for recordings
      if (!db.objectStoreNames.contains(RECORDINGS_STORE)) {
        const store = db.createObjectStore(RECORDINGS_STORE, { 
          keyPath: 'id', 
          autoIncrement: true 
        });
        
        // Create indexes for searching
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('transcript', 'transcript', { unique: false });
      }
    };
  });
};

/**
 * Save a recording to IndexedDB
 */
export const saveRecording = async (recording: Recording): Promise<number> => {
  if (!isBrowser) {
    return Promise.reject(new Error('IndexedDB is not available in this environment'));
  }

  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readwrite');
    const store = transaction.objectStore(RECORDINGS_STORE);
    
    const request = store.add(recording);
    
    request.onsuccess = () => {
      resolve(request.result as number);
    };
    
    request.onerror = () => {
      reject(new Error('Error saving recording to IndexedDB'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Get all recordings from IndexedDB
 */
export const getAllRecordings = async (): Promise<Recording[]> => {
  if (!isBrowser) {
    return Promise.resolve([]);
  }

  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readonly');
    const store = transaction.objectStore(RECORDINGS_STORE);
    
    const request = store.getAll();
    
    request.onsuccess = () => {
      resolve(request.result as Recording[]);
    };
    
    request.onerror = () => {
      reject(new Error('Error getting recordings from IndexedDB'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Get a recording by ID
 */
export const getRecordingById = async (id: number): Promise<Recording> => {
  if (!isBrowser) {
    return Promise.reject(new Error('IndexedDB is not available in this environment'));
  }

  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readonly');
    const store = transaction.objectStore(RECORDINGS_STORE);
    
    const request = store.get(id);
    
    request.onsuccess = () => {
      if (request.result) {
        resolve(request.result as Recording);
      } else {
        reject(new Error('Recording not found'));
      }
    };
    
    request.onerror = () => {
      reject(new Error('Error getting recording from IndexedDB'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

/**
 * Delete a recording by ID
 */
export const deleteRecording = async (id: number): Promise<void> => {
  if (!isBrowser) {
    return Promise.reject(new Error('IndexedDB is not available in this environment'));
  }

  const db = await initDB();
  
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([RECORDINGS_STORE], 'readwrite');
    const store = transaction.objectStore(RECORDINGS_STORE);
    
    const request = store.delete(id);
    
    request.onsuccess = () => {
      resolve();
    };
    
    request.onerror = () => {
      reject(new Error('Error deleting recording from IndexedDB'));
    };
    
    transaction.oncomplete = () => {
      db.close();
    };
  });
};

export default {
  initDB,
  saveRecording,
  getAllRecordings,
  getRecordingById,
  deleteRecording
}; 