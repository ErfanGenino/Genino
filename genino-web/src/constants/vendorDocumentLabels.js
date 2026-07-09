// ============================================================================
// File: src/constants/vendorDocumentLabels.js
// Description: عناوین فارسی انواع مدارک و بخش‌های اصلاح فروشندگان ژنینو
// ============================================================================

export const vendorDocumentLabels = {
  BANK_INFO: "اطلاعات بانکی",
  NATIONAL_CARD: "کارت ملی",
  SELFIE_WITH_NATIONAL_CARD: "سلفی با کارت ملی",
  BUSINESS_LICENSE: "جواز کسب",
  COMPANY_OFFICIAL_NEWSPAPER: "روزنامه رسمی شرکت",
  COMPANY_REGISTRATION: "آگهی ثبت شرکت",
  REPRESENTATIVE_LETTER: "معرفی‌نامه نماینده",
  BANK_DOCUMENT: "مدرک بانکی",
  OTHER: "سایر مدارک",
};

// ============================================================================
// بخش‌هایی که مدیر می‌تواند برای اصلاح انتخاب کند
// ============================================================================

export const vendorCorrectionFields = [
  "BANK_INFO",
  "NATIONAL_CARD",
  "SELFIE_WITH_NATIONAL_CARD",
  "BUSINESS_LICENSE",
  "COMPANY_OFFICIAL_NEWSPAPER",
  "COMPANY_REGISTRATION",
];