// Google Tag Manager events utility

declare global {
  interface Window {
    dataLayer: any[];
  }
}

export const GTM_EVENTS = {
  FORM_SUBMISSION: 'form_submission',
  FORM_ERROR: 'form_error',
  BUTTON_CLICK: 'button_click',
  SECTION_VIEW: 'section_view',
  CONVERSION: 'conversion',
} as const;

export type GTMEvent = typeof GTM_EVENTS[keyof typeof GTM_EVENTS];

interface EventData {
  [key: string]: any;
}

export const pushToDataLayer = (event: GTMEvent, data?: EventData) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push({
      event,
      ...data,
      timestamp: new Date().toISOString(),
    });
    console.log(`GTM Event pushed: ${event}`, data);
  } else {
    console.warn('dataLayer not available');
  }
};

// Helper function for tracking form submissions
export const trackFormSubmission = (formName: string, formData?: any) => {
  pushToDataLayer(GTM_EVENTS.FORM_SUBMISSION, {
    form_name: formName,
    form_data: formData,
  });
};

// Helper function for tracking conversions
export const trackConversion = (conversionType: string, value?: number) => {
  pushToDataLayer(GTM_EVENTS.CONVERSION, {
    conversion_type: conversionType,
    conversion_value: value,
  });
};

// Helper function for tracking button clicks
export const trackButtonClick = (buttonName: string, buttonLocation: string) => {
  pushToDataLayer(GTM_EVENTS.BUTTON_CLICK, {
    button_name: buttonName,
    button_location: buttonLocation,
  });
};