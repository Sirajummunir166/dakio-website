// Privacy Policy — copy ported verbatim from dakio-landing/src/pages/Privacy.jsx.

import LegalLayout, { Section, P, Ul, A } from "../../../components/legal/LegalLayout";

export const metadata = {
  title: "Privacy Policy — Dakio",
  description: "How Dakio collects, uses, and handles data for merchants, suppliers and their customers.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" lastUpdated="June 2026">
      <Section title="About Dakio">
        <P>Dakio is an ecommerce management platform built for merchants in Bangladesh. We provide tools for order management, storefront creation, dropshipping, inventory, customer relationships, courier integration, and business reporting. This Privacy Policy explains how Dakio collects, uses, and handles data in connection with providing these services.</P>
        <P>By using Dakio, you agree to the collection and use of information as described in this policy. If you are a merchant using Dakio to run your store, this policy applies to your account and your use of the platform. When your customers place orders through your Dakio storefront, we process that data on your behalf as described below.</P>
      </Section>

      <Section title="Data We Collect">
        <P><strong>Merchant and supplier account data</strong></P>
        <Ul items={[
          "Name, email address, and phone number provided during registration",
          "Business name, address, and relevant business details",
          "Billing and payment information necessary for subscription management",
          "Login credentials (passwords are stored in hashed form)",
          "Communication history with Dakio support",
        ]} />
        <P><strong>Customer order data (processed on behalf of merchants)</strong></P>
        <P>When customers place orders through a merchant&apos;s Dakio storefront, we collect and store the information they provide in order to fulfill those orders. This includes:</P>
        <Ul items={[
          "Customer name, phone number, and delivery address",
          "Order details: items, quantities, prices, payment method, and order status",
          "Notes or instructions provided by the customer with the order",
          "Email address, if voluntarily provided",
        ]} />
        <P>This data is controlled by the merchant whose storefront the customer ordered from. Dakio processes it as a service provider on the merchant&apos;s behalf.</P>
        <P><strong>Technical and usage data</strong></P>
        <Ul items={[
          "IP address and approximate location derived from IP",
          "Browser type, device type, and operating system",
          "Platform usage logs: pages visited, features used, timestamps",
          "Error and diagnostic data to maintain platform stability",
        ]} />
        <P><strong>Tracking and integration data</strong></P>
        <P>When a merchant enables third-party tracking tools such as Meta Pixel or Google Tag Manager through their Dakio settings, those tools may collect visitor and conversion data on the merchant&apos;s storefront. This data is subject to the privacy policies of those third-party platforms. Dakio also operates server-side event forwarding (Conversions API) on behalf of merchants who configure it, to improve tracking reliability. These integrations are entirely optional and controlled by each merchant.</P>
      </Section>

      <Section title="Why We Collect This Data">
        <P>Data collected through the Dakio platform is used to:</P>
        <Ul items={[
          "Provide, operate, and maintain the Dakio platform and its services",
          "Process orders and manage order workflows for merchants",
          "Book and coordinate deliveries with courier partners",
          "Facilitate supplier payouts and merchant payable settlements",
          "Support fraud prevention and fake order detection",
          "Enable merchant analytics, reports, and business insights",
          "Respond to support requests and communicate important service updates",
          "Maintain platform security, reliability, and performance",
          "Comply with applicable legal and regulatory requirements",
        ]} />
      </Section>

      <Section title="How Data Is Shared">
        <P>Dakio does not sell personal data. We share data only where necessary to provide our services or as required by law.</P>
        <P><strong>Courier providers</strong></P>
        <P>When an order is shipped, we share the necessary delivery information (customer name, phone, address, and order reference) with the merchant&apos;s selected courier provider — such as Pathao, RedX, Steadfast, or Sundarban — to facilitate delivery.</P>
        <P><strong>Payment processors</strong></P>
        <P>Payment and transaction data is shared with payment service providers such as bKash, Nagad, and SSLCommerz as required to complete billing and subscription transactions. These processors have their own privacy policies and security standards.</P>
        <P><strong>Analytics and marketing platforms</strong></P>
        <P>Only when a merchant explicitly enables third-party tracking integrations (e.g. Meta Pixel, Google Tag Manager) through their Dakio settings does any storefront visitor or conversion data flow to those platforms. This is controlled entirely by the merchant for their own advertising and analytics purposes.</P>
        <P><strong>Infrastructure and service providers</strong></P>
        <P>Dakio uses third-party infrastructure providers to host, operate, and deliver the platform. These providers access data only as necessary to perform services on our behalf and are bound by appropriate confidentiality and data protection obligations.</P>
        <P><strong>Legal and regulatory</strong></P>
        <P>We may disclose data if required by applicable law, court order, or regulatory authority, or to protect the rights, property, or safety of Dakio, our merchants, their customers, or the public.</P>
      </Section>

      <Section title="Operational Communications">
        <P>Dakio sends operational messages to merchants, suppliers, and where relevant, to order participants. These include order confirmation notifications, account and billing messages, platform service updates, and responses to support requests.</P>
        <P>Dakio operates an AI-assisted order confirmation feature that may place automated or agent-assisted calls to customers on behalf of merchants to verify or confirm orders. These calls are part of the order management workflow. Calls or interactions conducted through the platform may be recorded or transcribed for purposes including quality assurance, workflow processing, customer service, and fraud prevention. Such recordings or transcriptions are handled with the same care as other operational data and retained only as long as needed for these purposes.</P>
        <P>Merchants who use AI-assisted calling or other automated communication features are responsible for ensuring their customers are appropriately informed and that their use of these features complies with applicable laws and regulations in their jurisdiction.</P>
      </Section>

      <Section title="Merchant Responsibilities">
        <P>Merchants using Dakio are responsible for how they collect, use, and manage their customers&apos; data through the platform. This includes ensuring customers are aware that their order information is being processed, complying with applicable data protection laws in their jurisdiction, and using Dakio&apos;s tools — including any tracking integrations they choose to enable — in accordance with the policies of those tools and the expectations of their customers.</P>
        <P>Dakio processes customer order data on behalf of merchants to provide order management and fulfillment services. Merchants are the data controllers for their customers&apos; information.</P>
      </Section>

      <Section title="Data Security">
        <P>Dakio implements industry-standard security measures to protect the data we hold, including:</P>
        <Ul items={[
          "TLS/SSL encryption for all data in transit",
          "Role-based access controls so platform users only see what is relevant to their role",
          "Regular data backups to support recovery in the event of failure",
          "Access controls limiting internal access to data on a need-to-know basis",
        ]} />
        <P>No system is completely immune to risk. We cannot guarantee absolute security, but we take reasonable and appropriate measures to protect the data in our care.</P>
      </Section>

      <Section title="Data Retention">
        <P>We retain account and operational data for as long as necessary to provide our services and for a reasonable period afterwards to handle support matters, billing disputes, and legal obligations. Transaction and financial records may be retained for longer periods as required by applicable tax, accounting, and regulatory requirements. When data is no longer needed, we dispose of it securely.</P>
      </Section>

      <Section title="Your Choices">
        <P>Merchants may update their account information through the Dakio dashboard at any time. To request deletion of your account or data, see our <A href="/data-deletion">Data Deletion</A> page.</P>
        <P>Tracking integrations such as Meta Pixel and Google Tag Manager can be enabled or disabled at any time through the Addons section of the merchant dashboard.</P>
      </Section>

      <Section title="Updates to This Policy">
        <P>We may update this Privacy Policy from time to time. When we make material changes, we will notify merchants via email or an in-platform notice. Continued use of Dakio after an update constitutes acceptance of the revised policy.</P>
      </Section>

      <Section title="Contact">
        <P>For privacy-related questions or requests, please contact us at <A href="mailto:hello@dakio.io">hello@dakio.io</A>. Please use &quot;Privacy Request&quot; as the subject line so we can route your message appropriately.</P>
      </Section>
    </LegalLayout>
  );
}
