import { FallbackProps } from 'react-error-boundary';

const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => (
  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
    <h2 className="text-xl font-semibold text-red-700 dark:text-red-400 mb-2">Something went wrong</h2>
    <p className="text-red-600 dark:text-red-300 mb-4">{error.message}</p>
    <button
      onClick={resetErrorBoundary}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors"
    >
      Try again
    </button>
  </div>
);

export default ErrorFallback; 