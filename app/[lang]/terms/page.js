// Terms of Service — copy ported verbatim from dakio-landing/src/pages/Terms.jsx.

import LegalLayout, { Section, P, Ul, A } from "../../../components/legal/LegalLayout";

export const metadata = {
  title: "Terms of Service — Dakio",
  description: "The terms that govern use of the Dakio platform for merchants and suppliers.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service" lastUpdated="June 2026">
      <Section title="Overview">
        <P>These Terms of Service (&quot;Terms&quot;) govern your use of the Dakio platform and all related services (&quot;Dakio&quot; or the &quot;Service&quot;). By registering for or using Dakio, you agree to these Terms. Please read them carefully.</P>
        <P>Dakio provides an ecommerce management platform designed for merchants in Bangladesh, offering tools for order management, storefront creation, inventory, customer management, courier booking, dropshipping, reporting, and related integrations.</P>
      </Section>

      <Section title="Eligibility and Account Responsibility">
        <P>To use Dakio, you must be at least 18 years old and have the legal capacity to enter into a binding agreement. By registering, you represent that the information you provide is accurate and that you have the authority to act on behalf of any business entity you register.</P>
        <P>You are responsible for maintaining the security of your account credentials. You must not share your login details with unauthorized parties. Any activity that occurs under your account is your responsibility. If you suspect unauthorized access, notify us immediately at <A href="mailto:hello@dakio.io">hello@dakio.io</A>.</P>
        <P>Merchant accounts are intended for business use. Each merchant account grants access to the number of staff users defined by the active subscription plan.</P>
      </Section>

      <Section title="Merchant Responsibilities">
        <P>As a merchant using Dakio, you are solely responsible for:</P>
        <Ul items={[
          "The products and services you sell through your Dakio storefront, including their accuracy, legality, quality, and safety",
          "Setting accurate pricing and clearly communicating all costs to your customers, including delivery charges",
          "All customer communications, post-sale support, returns, and dispute resolution",
          "Ensuring your store content — including product descriptions, images, and promotional material — does not infringe third-party rights or violate applicable laws",
          "Compliance with consumer protection laws, tax obligations, and any other regulations applicable to your business and jurisdiction",
          "Managing your inventory levels and ensuring products offered for sale are available",
          "The accuracy of business information you provide on the platform",
        ]} />
        <P>Dakio provides infrastructure and tools; we are not a party to the commercial transactions between you and your customers. Any dispute between you and a customer is your responsibility to resolve.</P>
      </Section>

      <Section title="Supplier Responsibilities">
        <P>Suppliers participating in the Dakio dropshipping marketplace are responsible for:</P>
        <Ul items={[
          "Maintaining accurate product listings, pricing, and stock availability",
          "Fulfilling orders in a timely manner consistent with agreed service levels",
          "Ensuring products comply with applicable safety and quality standards",
          "Providing accurate shipping and tracking information",
          "Resolving product quality or supply disputes with Dakio and affected merchants",
        ]} />
      </Section>

      <Section title="Dropshipping and Fulfillment Operations">
        <P>Dakio&apos;s dropshipping service connects merchants with supplier inventory for fulfillment. When a merchant sells a dropship product, Dakio coordinates warehouse reservation, packing, and courier handover on behalf of the merchant. Merchants are charged for dropship costs as described in applicable service documentation.</P>
        <P>Dakio does not guarantee continuous availability of any specific dropship product. Stock availability is subject to supplier inventory levels and warehouse capacity. Merchants should not commit to customers for orders that cannot be fulfilled.</P>
      </Section>

      <Section title="Acceptable Use">
        <P>You agree not to use Dakio to:</P>
        <Ul items={[
          "Sell counterfeit, stolen, prohibited, or illegal products or services",
          "Engage in fraudulent, deceptive, or misleading practices toward customers",
          "Abuse, harass, or harm other users of the platform",
          "Circumvent or tamper with platform security controls or technical protections",
          "Use the platform to generate or facilitate spam, phishing, or unauthorized marketing",
          "Scrape or extract platform data without authorization",
          "Violate applicable laws or regulations in Bangladesh or any other jurisdiction",
          "Submit orders you know to be fraudulent or fabricated",
        ]} />
        <P>Dakio may investigate suspected violations and take appropriate action, including account suspension or termination, without prior notice where necessary to protect the integrity of the platform.</P>
      </Section>

      <Section title="Integrations and Third-Party Services">
        <P>Dakio integrates with third-party services including courier providers (Pathao, RedX, Steadfast, Sundarban, and others), payment processors (bKash, Nagad, SSLCommerz), and optional marketing tools (Meta Pixel, Google Tag Manager, and others). These integrations are provided as a convenience.</P>
        <P>Third-party services are governed by their own terms of service and privacy policies. Dakio is not responsible for the performance, availability, or actions of third-party platforms. If a third-party service changes its policies or becomes unavailable, Dakio will make reasonable efforts to maintain service continuity but cannot guarantee uninterrupted availability of specific integrations.</P>
        <P>Merchants are responsible for their own use of any third-party integrations they enable through the platform, including compliance with those platforms&apos; advertising and data policies.</P>
      </Section>

      <Section title="Subscription, Billing, and Charges">
        <P>Access to Dakio requires an active paid subscription. Pricing details, plan limits, and billing cycles are described on the Dakio website and may be updated from time to time. By subscribing, you authorize Dakio to charge your selected payment method for the applicable subscription fee.</P>
        <P>Subscription fees are generally non-refundable. Refund eligibility, if any, is described in our <A href="/refund-policy">Return and Refund Policy</A>. If you cancel, your access continues until the end of the current billing period.</P>
        <P>In addition to subscription fees, merchants may incur operational charges for platform services such as dropshipping fulfillment, courier service fees, and any other charges disclosed at time of use. Dakio reserves the right to adjust pricing with reasonable notice.</P>
      </Section>

      <Section title="Suspension and Termination">
        <P>Either party may terminate the relationship at any time. You may cancel your account through the platform or by contacting <A href="mailto:hello@dakio.io">hello@dakio.io</A>.</P>
        <P>Dakio reserves the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or cause harm to other users or the platform — with or without prior notice depending on the severity of the situation. We will make reasonable efforts to notify you in non-urgent cases.</P>
        <P>Upon termination, your access to the platform will cease. Certain data may be retained as described in our <A href="/privacy">Privacy Policy</A>.</P>
      </Section>

      <Section title="Limitation of Liability">
        <P>To the maximum extent permitted by applicable law, Dakio and its team members are not liable for any indirect, incidental, consequential, or punitive damages arising from your use of or inability to use the platform, including but not limited to loss of revenue, loss of data, or business interruption.</P>
        <P>Dakio&apos;s total liability to you for any claim related to the Service shall not exceed the amount you paid to Dakio in the three months preceding the claim.</P>
        <P>The platform is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. We do not warrant that the Service will be uninterrupted, error-free, or free from security vulnerabilities, though we take reasonable steps to maintain quality and security.</P>
      </Section>

      <Section title="Changes to the Service and These Terms">
        <P>Dakio may update these Terms from time to time. We will provide notice of material changes via email or an in-platform notification. Your continued use of the Service after the effective date of any update constitutes acceptance of the revised Terms.</P>
        <P>Dakio may also modify, limit, or discontinue features or functionality of the platform at any time. We will make reasonable efforts to communicate significant changes in advance.</P>
      </Section>

      <Section title="Contact">
        <P>For questions about these Terms or the Dakio platform, contact us at <A href="mailto:hello@dakio.io">hello@dakio.io</A>.</P>
      </Section>
    </LegalLayout>
  );
}
