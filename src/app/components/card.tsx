import React from "react";

// Card Component
export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="max-w-sm rounded-lg border border-gray-200 shadow-md overflow-hidden bg-white">
      {children}
    </div>
  );
};

// CardHeader Component
export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-4 py-3 border-b">{children}</div>;
};

// CardTitle Component
export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h3 className="text-lg font-semibold">{children}</h3>;
};

// CardContent Component
export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="px-4 py-3">{children}</div>;
};
