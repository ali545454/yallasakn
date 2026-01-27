// components/ErrorBoundary.tsx

import React from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { useTranslation } from 'react-i18next';

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg text-center">
        <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {t('errors.unexpected')}
        </h2>
        <p className="text-gray-600 mb-4">
          {t('errors.tryAgain')}
        </p>
        <details className="mb-4 text-left">
          <summary className="cursor-pointer text-sm text-gray-500">
            {t('errors.details')}
          </summary>
          <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">
            {error.message}
          </pre>
        </details>
        <Button onClick={resetErrorBoundary}>
          {t('errors.retry')}
        </Button>
      </div>
    </div>
  );
};

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

const ErrorBoundary = ({ children }: ErrorBoundaryProps) => {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;