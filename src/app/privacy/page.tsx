import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { PageHeader } from "@/components/shared/page-header";
import { Section } from "@/components/ui";
import { SITE_NAME } from "@/lib/constants";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy",
  description: "MSMM Engineering privacy policy — how we collect, use, and protect your information.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <Section>
        <div className="mx-auto max-w-3xl prose prose-gray">
          <p className="text-base text-muted sm:text-lg">
            Last updated: March 2026
          </p>

          <h2 className="mt-8 text-xl font-bold text-foreground sm:text-2xl">Information We Collect</h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            {SITE_NAME} collects information you voluntarily provide through our
            contact and career application forms, including your name, email address,
            phone number, and any additional information you choose to share.
          </p>

          <h2 className="mt-8 text-xl font-bold text-foreground sm:text-2xl">How We Use Your Information</h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            We use the information you provide to respond to your inquiries, process
            job applications, and communicate with you about our services. We do not
            sell or share your personal information with third parties for marketing purposes.
          </p>

          <h2 className="mt-8 text-xl font-bold text-foreground sm:text-2xl">Analytics</h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            We use Google Analytics and Vercel Analytics to understand how visitors
            interact with our website. These services may collect anonymous usage data
            including pages visited, time on site, and device information. This data
            helps us improve our website and user experience.
          </p>

          <h2 className="mt-8 text-xl font-bold text-foreground sm:text-2xl">Cookies</h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            Our website may use cookies for analytics and basic site functionality.
            You can manage cookie preferences through your browser settings.
          </p>

          <h2 className="mt-8 text-xl font-bold text-foreground sm:text-2xl">Contact</h2>
          <p className="mt-4 text-sm text-muted sm:text-base">
            If you have questions about this privacy policy or your personal data,
            please contact us at{" "}
            <a href="/contact" className="text-primary hover:text-primary-dark">
              our contact page
            </a>.
          </p>
        </div>
      </Section>
    </>
  );
}
