import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/shared/components/layout/Sidebar';
import { Topbar } from '@/shared/components/layout/Topbar';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

interface AppLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, rightPanel }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Close mobile menu when screen size increases
  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpen(false);
    }
  }, [isMobile]);

  // Toggle body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen || rightPanelOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, rightPanelOpen]);

  // Mobile layout
  if (isMobile) {
    return (
      <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
        {/* Mobile Header with Hamburger */}
        <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 shrink-0">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <Bars3Icon className="w-6 h-6 text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <span className="font-semibold text-gray-900">Kopano</span>
          </div>

          {rightPanel && (
            <button
              onClick={() => setRightPanelOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <span className="text-sm font-medium text-blue-600">Insights</span>
            </button>
          )}
        </div>

        {/* Mobile Sidebar Drawer */}
        {mobileMenuOpen && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileMenuOpen(false)}
            />
            
            {/* Sidebar Drawer */}
            <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl animate-slide-in">
         
              <div className="h-[calc(100%-4rem)] overflow-y-auto">
                <Sidebar isCollapsed={false} onToggle={() => {}} />
              </div>
            </div>
          </>
        )}

        {/* Right Panel Drawer for Mobile */}
        {rightPanelOpen && rightPanel && (
          <>
            {/* Overlay */}
            <div 
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setRightPanelOpen(false)}
            />
            
            {/* Right Panel Drawer */}
            <div className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-xl animate-slide-in">
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">Insights Panel</h2>
                <button
                  onClick={() => setRightPanelOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <XMarkIcon className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <div className="h-[calc(100%-4rem)] overflow-y-auto">
                {rightPanel}
              </div>
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto scrollable p-4">
          {children}
        </main>
      </div>
    );
  }

  // Tablet layout
  if (isTablet) {
    return (
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Sidebar - partially collapsed on tablet */}
        <Sidebar isCollapsed={true} onToggle={() => {}} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          
          <main className="flex-1 overflow-y-auto scrollable p-6">
            {children}
          </main>
        </div>

        {/* Right Panel - hidden on tablet, accessible via button */}
        {rightPanel && (
          <>
            <button
              onClick={() => setRightPanelOpen(true)}
              className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-30"
            >
              View Insights
            </button>

            {rightPanelOpen && (
              <>
                <div 
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setRightPanelOpen(false)}
                />
                <aside className="fixed inset-y-0 right-0 w-80 bg-white z-50 shadow-xl overflow-y-auto">
                  {rightPanel}
                </aside>
              </>
            )}
          </>
        )}
      </div>
    );
  }

  // Desktop layout
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        
        <main className="flex-1 overflow-y-auto scrollable p-6">
          {children}
        </main>
      </div>

      {rightPanel && (
        <aside className="w-80 border-l border-gray-200 bg-white overflow-y-auto scrollable shrink-0">
          {rightPanel}
        </aside>
      )}
    </div>
  );
};