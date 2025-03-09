import React, { useEffect, useState } from 'react';
import indexedDBService from '../utils/indexedDBService';

interface Recording {
  id?: number;
  timestamp: number;
  audioBlob: Blob;
  transcript: string;
  title?: string;
}

const RecordingsList: React.FC = () => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecordings = async () => {
      try {
        setLoading(true);
        const data = await indexedDBService.getAllRecordings();
        setRecordings(data);
        setError(null);
      } catch (err) {
        setError('Failed to load recordings');
        console.error('Error loading recordings:', err);
      } finally {
        setLoading(false);
      }
    };

    loadRecordings();
  }, []);

  const handleDelete = async (id: number | undefined) => {
    if (id === undefined) return;
    
    try {
      await indexedDBService.deleteRecording(id);
      setRecordings(recordings.filter(recording => recording.id !== id));
    } catch (err) {
      console.error('Error deleting recording:', err);
      setError('Failed to delete recording');
    }
  };

  if (loading) {
    return <div className="text-center py-4">Loading saved recordings...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  if (recordings.length === 0) {
    return <div className="text-center py-4 text-gray-500">No saved recordings found</div>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Saved Recordings</h3>
      <div className="space-y-4">
        {recordings.map((recording) => (
          <div 
            key={recording.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">{recording.title || new Date(recording.timestamp).toLocaleString()}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {recording.transcript || 'No transcript available'}
                </p>
              </div>
              <button
                onClick={() => handleDelete(recording.id)}
                className="text-red-500 hover:text-red-700"
                aria-label="Delete recording"
              >
                Delete
              </button>
            </div>
            
            <div className="mt-3">
              <audio 
                src={URL.createObjectURL(recording.audioBlob)} 
                controls 
                className="w-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecordingsList; 