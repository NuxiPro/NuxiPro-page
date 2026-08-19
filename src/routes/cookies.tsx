import { createFileRoute } from "@tanstack/react-router";
import { LegalHeading, LegalList, LegalSubHeading, LegalText, BulletItem } from "../components/legal";
import { Navbar } from "../components/Navbar";
import { createPageHead, SITE_URL } from "../config/seo";

const COOKIE_TITLE = "Politique de cookies - NuxiPro";
const COOKIE_DESCRIPTION =
  "Politique de cookies de NuxiPro — informations sur les cookies utilisés et leur finalité.";
const COOKIE_URL = `${SITE_URL}/cookies`;

export const Route = createFileRoute("/cookies")({
  head: () =>
    createPageHead({
      title: COOKIE_TITLE,
      description: COOKIE_DESCRIPTION,
      url: COOKIE_URL,
      links: [
        { rel: "alternate", hreflang: "fr", href: `${SITE_URL}/fr/cookies` },
        { rel: "alternate", hreflang: "en", href: `${SITE_URL}/en/cookies` },
        { rel: "alternate", hreflang: "x-default", href: COOKIE_URL },
      ],
    }),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-[#fafafa] text-[#141413] font-body">
      <Navbar />
      <main className="max-w-[720px] mx-auto px-6 pt-10 pb-16">
        <a
          href="/"
          className="inline-flex items-center gap-1 text-[#6c6a64] hover:text-[#141413] text-sm transition-all duration-300 ease-out hover:gap-2 active:scale-95"
        >
          <span className="transition-transform duration-300 ease-out hover:-translate-x-1">
            &larr;
          </span>
          Retour
        </a>

        <h1 className="font-heading text-[28px] font-normal mt-[60px] mb-10">
          Politique de cookies
        </h1>

        <LegalText>
          La présente politique de cookies explique ce que sont les cookies, comment nous les
          utilisons sur le site NuxiPro, et quels choix vous avez à leur sujet.
        </LegalText>

        <div className="mt-10 space-y-8">
          <section>
            <LegalHeading>1. Qu'est-ce qu'un cookie ?</LegalHeading>
            <LegalText>
              Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette,
              smartphone) lorsque vous visitez un site web. Il permet au site de mémoriser vos
              actions et préférences pendant une durée déterminée.
            </LegalText>
          </section>

          <section>
            <LegalHeading>2. Cookies utilisés sur ce site</LegalHeading>
            <LegalText>
              Ce site utilise uniquement des cookies liés à la mesure d'audience et au
              fonctionnement du site. Aucun cookie publicitaire n'est déposé.
            </LegalText>

            <LegalSubHeading className="mt-4">Cookie d'analyse (PostHog)</LegalSubHeading>
            <LegalText>
              Finalité : mesurer l'audience du site et comprendre comment les visiteurs interagissent
              avec les pages.
            </LegalText>
            <LegalList>
              <BulletItem>Nom : <code>ph_*</code> (PostHog)</BulletItem>
              <BulletItem>Durée : 12 mois</BulletItem>
              <BulletItem>Données collectées : pages visitées, clics, navigation</BulletItem>
              <BulletItem>Ne collecte pas : données personnelles, frappes clavier</BulletItem>
            </LegalList>

            <LegalSubHeading className="mt-4">Enregistrement session</LegalSubHeading>
            <LegalText>
              Fonctionnalité optionnelle permettant d'enregistrer les sessions utilisateur pour
              identifier les problèmes d'ergonomie.
            </LegalText>
            <LegalList>
              <BulletItem>Durée de conservation : 30 jours</BulletItem>
              <BulletItem>Données enregistrées : actions de la page (clics, navigation)</BulletItem>
              <BulletItem>Ne capture pas : frappes clavier, données de formulaires</BulletItem>
            </LegalList>

            <LegalSubHeading className="mt-4">Stockage local (localStorage)</LegalSubHeading>
            <LegalText>
              Vos préférences de consentement sont stockées dans le localStorage de votre navigateur
              pour mémoriser votre choix.
            </LegalText>
            <LegalList>
              <BulletItem>nuxipro_cookie_consent : votre choix (accepted / declined)</BulletItem>
              <BulletItem>nuxipro_cookie_recording : état de l'enregistrement session</BulletItem>
            </LegalList>
          </section>

          <section>
            <LegalHeading>3. Gestion de vos préférences</LegalHeading>
            <LegalText>
              Vous pouvez modifier vos choix à tout moment en cliquant sur l'icône de rouage en bas à
              droite de l'écran. Vous pouvez :
            </LegalText>
            <LegalList>
              <BulletItem>Accepter ou refuser les cookies d'analyse</BulletItem>
              <BulletItem>Activer ou désactiver l'enregistrement session</BulletItem>
            </LegalList>
          </section>

          <section>
            <LegalHeading>4. Vos droits</LegalHeading>
            <LegalText>
              Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
              d'un droit d'accès, de rectification et de suppression de vos données.
            </LegalText>
            <LegalText>
              Pour toute question concernant cette politique de cookies, contactez-nous via les
              coordonnées disponibles sur la page de mentions légales.
            </LegalText>
          </section>

          <section>
            <LegalHeading>5. Mise à jour</LegalHeading>
            <LegalText>
              Cette politique de cookies peut être mise à jour à tout moment. La date de dernière
              modification est indiquée ci-dessous.
            </LegalText>
            <LegalText className="mt-2 text-[#8e8b82]">Dernière mise à jour : août 2026</LegalText>
          </section>
        </div>
      </main>
    </div>
  );
}
