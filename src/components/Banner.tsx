import { usePostHog } from "@posthog/react";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "../i18n";
import { CloseIcon, LegalChevronRight, LegalIconCookies, SettingsIcon } from "./svg-icon";

const CONSENT_VERSION = "1.0";
const COOKIE_KEY = "nuxipro_cookie_consent";
const COOKIE_CONSENT_VERSION = "nuxipro_cookie_consent_version";
const COOKIE_CONSENT_DATE = "nuxipro_cookie_consent_date";
const COOKIE_ANALYTICS_KEY = "nuxipro_cookie_analytics";
const COOKIE_RECORDING_KEY = "nuxipro_cookie_recording";

const PRIVACY_URL = "/legal-center/cookies";

type ConsentChoice = "accepted" | "declined" | "partial" | null;

function getStoredConsentVersion(): string | null {
  return localStorage.getItem(COOKIE_CONSENT_VERSION);
}

function isConsentExpired(): boolean {
  const date = localStorage.getItem(COOKIE_CONSENT_DATE);
  if (!date) return true;
  const consentDate = new Date(date);
  const expiryDate = new Date(consentDate);
  expiryDate.setMonth(expiryDate.getMonth() + 12);
  return new Date() > expiryDate;
}

export function CookieBanner() {
  const posthog = usePostHog();
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);
  const [previousChoice, setPreviousChoice] = useState<ConsentChoice>(null);

  const applyConsent = useCallback(
    (analytics: boolean, recording: boolean) => {
      if (analytics) {
        posthog?.opt_in_capturing();
      } else {
        posthog?.opt_out_capturing();
      }
      if (recording && analytics) {
        posthog?.startSessionRecording();
      } else {
        posthog?.stopSessionRecording();
      }
      setAnalyticsEnabled(analytics);
      setRecordingEnabled(recording && analytics);
    },
    [posthog],
  );

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY) as ConsentChoice;
    const storedVersion = getStoredConsentVersion();

    if (!consent || storedVersion !== CONSENT_VERSION || isConsentExpired()) {
      setVisible(true);
      posthog?.opt_out_capturing();
      posthog?.stopSessionRecording();
    } else {
      setHasDecided(true);
      setPreviousChoice(consent);
      const analytics = localStorage.getItem(COOKIE_ANALYTICS_KEY) === "true";
      const recording = localStorage.getItem(COOKIE_RECORDING_KEY) === "true";
      setAnalyticsEnabled(analytics);
      setRecordingEnabled(recording);
      applyConsent(analytics, recording);
    }
  }, [posthog, applyConsent]);

  const saveConsent = (choice: ConsentChoice, analytics: boolean, recording: boolean) => {
    localStorage.setItem(COOKIE_KEY, choice ?? "declined");
    localStorage.setItem(COOKIE_CONSENT_VERSION, CONSENT_VERSION);
    localStorage.setItem(COOKIE_CONSENT_DATE, new Date().toISOString());
    localStorage.setItem(COOKIE_ANALYTICS_KEY, String(analytics));
    localStorage.setItem(COOKIE_RECORDING_KEY, String(recording && analytics));
    if (analytics) {
      window.dispatchEvent(new CustomEvent("posthog-consent-given"));
    }
    applyConsent(analytics, recording && analytics);
    setPreviousChoice(choice);
    setVisible(false);
    setHasDecided(true);
  };

  const handleAccept = () => saveConsent("accepted", true, true);
  const handleDecline = () => saveConsent("declined", false, false);

  const handleSavePreferences = () => {
    const choice = analyticsEnabled ? "partial" : "declined";
    saveConsent(choice, analyticsEnabled, recordingEnabled);
  };

  const toggleAnalytics = (enabled: boolean) => {
    setAnalyticsEnabled(enabled);
    if (!enabled) setRecordingEnabled(false);
  };

  const toggleRecording = () => {
    setRecordingEnabled((prev) => !prev);
  };

  useEffect(() => {
    const handleReopen = () => {
      setVisible(true);
    };
    window.addEventListener("reopen-cookie-banner", handleReopen);
    return () => window.removeEventListener("reopen-cookie-banner", handleReopen);
  }, []);

  const reopenBanner = () => {
    setVisible(true);
  };

  return (
    <>
      {hasDecided && !visible && (
        <button
          type="button"
          className="cookie-settings-fab"
          onClick={reopenBanner}
          aria-label={t("banner.manageCookies")}
        >
          <SettingsIcon />
        </button>
      )}

      {visible && (
        <div className="cookie-panel">
          <div className="cookie-panel-header">
            <div className="cookie-panel-brand">
              <LegalIconCookies />
              <span>{t("banner.title")}</span>
            </div>
            <button
              type="button"
              className="cookie-panel-close"
              onClick={handleDecline}
              aria-label={t("banner.close")}
            >
              <CloseIcon />
            </button>
          </div>

          <div className="cookie-panel-body">
            <p className="cookie-panel-text">{t("banner.text")}</p>

            <div className="cookie-option">
              <div className="cookie-option-info">
                <span className="cookie-option-name">{t("banner.analytics")}</span>
                <span className="cookie-option-desc">{t("banner.analyticsDesc")}</span>
              </div>
              <button
                type="button"
                className={`cookie-toggle ${analyticsEnabled ? "active" : ""}`}
                onClick={() => toggleAnalytics(!analyticsEnabled)}
                aria-label={t("banner.analytics")}
              >
                <span className="cookie-toggle-knob" />
              </button>
            </div>

            <div className="cookie-option">
              <div className="cookie-option-info">
                <span className="cookie-option-name">{t("banner.recording")}</span>
                <span className="cookie-option-desc">{t("banner.recordingDesc")}</span>
              </div>
              <button
                type="button"
                className={`cookie-toggle ${recordingEnabled ? "active" : ""}`}
                onClick={toggleRecording}
                disabled={!analyticsEnabled}
                aria-label={t("banner.recording")}
              >
                <span className="cookie-toggle-knob" />
              </button>
            </div>

            <a href={PRIVACY_URL} className="cookie-learn-more">
              {t("banner.learnMore")}
              <LegalChevronRight />
            </a>
          </div>

          <div className="cookie-panel-footer">
            <button
              type="button"
              className={`cookie-btn cookie-btn-secondary ${previousChoice === "declined" ? "chosen" : ""}`}
              onClick={handleDecline}
            >
              {t("banner.decline")}
            </button>
            <button
              type="button"
              className="cookie-btn cookie-btn-secondary"
              onClick={handleSavePreferences}
            >
              {t("banner.save")}
            </button>
            <button
              type="button"
              className={`cookie-btn cookie-btn-primary ${previousChoice === "accepted" ? "chosen" : ""}`}
              onClick={handleAccept}
            >
              {t("banner.accept")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
