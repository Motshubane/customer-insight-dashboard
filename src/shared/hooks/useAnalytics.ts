import { useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import type { ExportFormat } from '@/shared/components/ui/ExportButton';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const useAnalytics = () => {
  const location = useLocation();

  const trackPageView = useCallback((path: string = location.pathname) => {
    console.log('Page View:', path);
    
    try {
      const views = JSON.parse(localStorage.getItem('pageViews') || '[]');
      views.push({ path, timestamp: new Date().toISOString() });
      localStorage.setItem('pageViews', JSON.stringify(views.slice(-100)));
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  }, [location]);

  const trackEvent = useCallback(({ category, action, label, value }: AnalyticsEvent) => {
    console.log('Analytics Event:', { category, action, label, value });
    
    try {
      const events = JSON.parse(localStorage.getItem('analyticsEvents') || '[]');
      events.push({ category, action, label, value, timestamp: new Date().toISOString() });
      localStorage.setItem('analyticsEvents', JSON.stringify(events.slice(-100)));
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, []);

  const trackFilter = useCallback((filterName: string, value: unknown) => {
    trackEvent({
      category: 'Filter',
      action: 'Apply',
      label: filterName,
      value: Array.isArray(value) ? value.length : 1,
    });
  }, [trackEvent]);

  const trackExport = useCallback((format: ExportFormat, recordCount: number) => {
    trackEvent({
      category: 'Export',
      action: 'Download',
      label: format,
      value: recordCount,
    });
  }, [trackEvent]);

  return {
    trackPageView,
    trackEvent,
    trackFilter,
    trackExport,
  };
};