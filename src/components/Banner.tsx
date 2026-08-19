import { usePostHog } from "@posthog/react";
import { Settings } from "lucide-react";
import { useEffect, useState } from "react";


const COOKIE_KEY = "nuxipro_cookie_consent";
const COOKIE_RECORDING_KEY = "nuxipro_cookie_recording";

export function CookieBanner() {
  const posthog = usePostHog();
  const [visible, setVisible] = useState(false);
  const [showWhy, setShowWhy] = useState(false);
  const [recordingEnabled, setRecordingEnabled] = useState(false);
  const [hasDecided, setHasDecided] = useState(false);
  const [previousChoice, setPreviousChoice] = useState<"accepted" | "declined" | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) {
      setVisible(true);
    } else {
      setHasDecided(true);
      setPreviousChoice(consent as "accepted" | "declined");
      const recording = localStorage.getItem(COOKIE_RECORDING_KEY);
      setRecordingEnabled(recording === "true");
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, "accepted");
    localStorage.setItem(COOKIE_RECORDING_KEY, "false");
    posthog?.opt_in_capturing();
    posthog?.stopSessionRecording();
    setRecordingEnabled(false);
    setPreviousChoice("accepted");
    setVisible(false);
    setHasDecided(true);
  };

  const handleDecline = () => {
    localStorage.setItem(COOKIE_KEY, "declined");
    localStorage.setItem(COOKIE_RECORDING_KEY, "false");
    posthog?.opt_out_capturing();
    posthog?.stopSessionRecording();
    setRecordingEnabled(false);
    setPreviousChoice("declined");
    setVisible(false);
    setHasDecided(true);
  };

  const toggleRecording = () => {
    if (recordingEnabled) {
      posthog?.stopSessionRecording();
      localStorage.setItem(COOKIE_RECORDING_KEY, "false");
      setRecordingEnabled(false);
    } else {
      posthog?.startSessionRecording();
      localStorage.setItem(COOKIE_RECORDING_KEY, "true");
      setRecordingEnabled(true);
    }
  };

  const reopenBanner = () => {
    setShowWhy(false);
    setVisible(true);
  };

  return (
    <>
      {hasDecided && !visible && (
        <button
          type="button"
          className="cookie-settings-fab"
          onClick={reopenBanner}
          aria-label="Gérer les cookies"
        >
          <Settings/>
        </button>
      )}

      {visible && (
        <div className="cookie-banner">
          <p>Nous utilisons des cookies pour améliorer votre expérience.</p>
          <button type="button" className="cookie-why" onClick={() => setShowWhy(!showWhy)}>
            Pourquoi ce cookie ?
          </button>
          <div className="cookie-banner-recording">
            <span className="cookie-recording-label">Enregistrement session</span>
            <button
              type="button"
              className={`cookie-recording-toggle ${recordingEnabled ? "active" : ""}`}
              onClick={toggleRecording}
              aria-label={
                recordingEnabled ? "Désactiver l'enregistrement" : "Activer l'enregistrement"
              }
            >
              <span className="cookie-recording-knob" />
            </button>
          </div>
          <div className="cookie-banner-actions">
            <button
              type="button"
              className={previousChoice === "accepted" ? "chosen" : ""}
              onClick={handleAccept}
            >
              Tout accepter
            </button>
            <button
              type="button"
              className={previousChoice === "declined" ? "chosen" : ""}
              onClick={handleDecline}
            >
              Tout refuser
            </button>
          </div>
          {showWhy && (
            <div className="cookie-explanation">
              <strong>Pourquoi ce cookie ?</strong>
              <br />
              Nous utilisons un seul cookie de mesure d'audience (PostHog) pour comprendre comment
              le site est utilisé et améliorer l'expérience. Aucune donnée personnelle n'est
              collectée. Ce cookie est activé uniquement si vous acceptez. Vous pouvez changer d'avis
              à tout moment en cliquant sur l'icône en bas à droite de l'écran.
              <br />
              <br />
              <strong>Durée de conservation</strong>
              <br />
              Les données d'analyse sont conservées pendant 12 mois. L'enregistrement session est
              conservé pendant 30 jours. Passé ce délai, les données sont automatiquement supprimées.
              <br />
              <br />
              <strong>Enregistrement session</strong>
              <br />
              L'enregistrement session capture les actions de la page (clics, navigation) pour nous
              aider à identifier les problèmes d'ergonomie. Aucune frappe au clavier ni aucune donnée
              sensible n'est enregistrée. Vous pouvez activer ou désactiver cette fonctionnalité
              indépendamment des cookies d'analyse.
              <br />
              <br />
              <a href="/cookies" className="cookie-explanation-link">
                Politique de cookies
              </a>
            </div>
          )}
        </div>
      )}
    </>
  );
}
