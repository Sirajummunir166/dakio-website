// Return and Refund Policy — copy ported verbatim from
// dakio-landing/src/pages/RefundPolicy.jsx.

import LegalLayout, { Section, P, Ul, A } from "../../components/legal/LegalLayout";

export const metadata = {
  title: "Return and Refund Policy — Dakio",
  description: "How refunds are handled for payments made to Dakio, and how returns work for purchases from Dakio merchant stores.",
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <LegalLayout title="Return and Refund Policy" lastUpdated="July 2026">
      <Section title="Overview">
        <P>This Return and Refund Policy explains how refunds are handled for payments made directly to Dakio (Digidhaka Communication Limited) — primarily platform subscription fees paid when a merchant signs up for or renews a Dakio plan.</P>
        <P>Dakio is an ecommerce platform that merchants use to run their own online stores. Products and services sold by merchants through their Dakio-powered storefronts are not sold by Dakio. Returns and refunds for those purchases are handled by the individual merchant under their own return policy, as described below under &quot;Purchases Made From a Dakio Merchant Store.&quot;</P>
      </Section>

      <Section title="Subscription Refunds">
        <P>Dakio subscription fees are billed in advance for the plan period you select (e.g. 6 months or 1 year). Because platform access, storefront hosting, and account resources are provisioned immediately upon payment, subscription fees are generally non-refundable once your account has been activated.</P>
        <P>You may be eligible for a refund in the following cases:</P>
        <Ul items={[
          "You were charged twice for the same subscription period due to a payment or system error",
          "A payment was successfully captured by the payment gateway but your account was never activated",
          "You cancel within 24 hours of an initial paid signup and have not materially used the platform (e.g. no orders processed, no storefront published)",
        ]} />
        <P>To request a refund, contact <A href="mailto:hello@dakio.io">hello@dakio.io</A> with your registered email and payment reference. We aim to review and respond to refund requests within 3 business days.</P>
      </Section>

      <Section title="Refund Processing Time">
        <P>Approved refunds are processed back to the original payment method (bKash, Nagad, card, or other method used via SSLCommerz) within <strong>7 to 10 working days</strong> from the date of approval. Actual time for the funds to appear may vary slightly depending on your bank or mobile wallet provider&apos;s own processing time.</P>
      </Section>

      <Section title="Purchases Made From a Dakio Merchant Store">
        <P>If you bought a product or service from a store built on Dakio (a merchant&apos;s own storefront), your purchase is a transaction between you and that merchant, not with Dakio. Dakio provides the underlying platform and payment infrastructure but is not the seller of record.</P>
        <P>For returns, exchanges, or refunds on such a purchase, please contact the merchant directly using the contact details published on their store. Merchants are responsible for setting and honoring their own return and refund terms, and for processing eligible refunds within a reasonable timeframe, consistent with applicable consumer protection law.</P>
        <P>If you&apos;re unable to reach a merchant or believe a merchant is not honoring a reasonable return request, you may contact <A href="mailto:hello@dakio.io">hello@dakio.io</A> and we will assist where we can, though final resolution rests with the merchant.</P>
      </Section>

      <Section title="Non-Refundable Items">
        <P>The following are not eligible for a refund:</P>
        <Ul items={[
          "Operational charges already incurred on your behalf, such as dropship fulfillment costs, courier fees, or SMS/email credits already consumed",
          "Subscription periods that have already elapsed",
          "Add-ons or one-time services that have already been delivered or activated",
        ]} />
      </Section>

      <Section title="Contact">
        <P>Questions about this policy or a specific refund request can be sent to <A href="mailto:hello@dakio.io">hello@dakio.io</A> or 01521 305 403.</P>
      </Section>
    </LegalLayout>
  );
}
