import React from 'react';

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen">
      <header className="bg-white shadow-sm">
        {/* Header content will go here */}
      </header>
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="bg-gray-100 mt-auto">
        {/* Footer content will go here */}
      </footer>
    </div>
  );
};

export default MainLayout; 