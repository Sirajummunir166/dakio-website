// Data Deletion Request — copy ported verbatim from
// dakio-landing/src/pages/DataDeletion.jsx.

import LegalLayout, { Section, P, Ul, Step, A } from "../../components/legal/LegalLayout";

export const metadata = {
  title: "Data Deletion — Dakio",
  description: "How to request deletion of your personal data held by Dakio: who can request it, what to include, and what to expect.",
  alternates: { canonical: "/data-deletion" },
};

export default function DataDeletionPage() {
  return (
    <LegalLayout title="Data Deletion Request" lastUpdated="June 2026">
      <Section title="Overview">
        <P>You have the right to request deletion of your personal data held by Dakio. This page explains who can make a deletion request, what to include, how to submit it, and what to expect.</P>
        <P>This process applies to merchants, suppliers, and any individual whose data is held by Dakio directly. If you are a customer who placed an order through a merchant&apos;s Dakio storefront, your order data is controlled by that merchant — please contact the merchant directly for requests relating to their customer records.</P>
      </Section>

      <Section title="How to Submit a Deletion Request">
        <Step number="1" title="Prepare your request">
          <P>Gather the following information before sending your request:</P>
          <Ul items={[
            "Your full name as registered on the account",
            "The email address associated with your Dakio account",
            "The type of deletion you are requesting: full account deletion, specific data deletion, or removal of customer records processed on your behalf",
            "Any additional context that helps us identify the relevant records (e.g. store name, account ID if known)",
          ]} />
        </Step>

        <Step number="2" title="Send your request by email">
          <P>Email your request to <A href="mailto:hello@dakio.io" subject="Data Deletion Request">hello@dakio.io</A> with the subject line: <strong>Data Deletion Request</strong></P>
          <P>We may contact you to verify your identity before processing the request, to ensure we delete the correct records and do not act on unauthorized requests.</P>
        </Step>

        <Step number="3" title="We review and process your request">
          <P>Once we have verified your identity and the scope of your request, we will process the deletion and confirm when it has been completed. We aim to handle deletion requests within a reasonable period. Complex requests may take longer to process.</P>
        </Step>
      </Section>

      <Section title="What Happens After Deletion">
        <P>Upon a successful deletion request, we will remove your personal account data, business profile, and associated records from our active systems. However, certain data may be retained where necessary:</P>
        <Ul items={[
          "Transaction and financial records that are required for accounting, tax, or audit purposes",
          "Order and payout records needed to resolve outstanding financial obligations or disputes",
          "Records we are legally required to retain under applicable law",
          "Anonymised or aggregated data that cannot identify you",
          "Data relating to fraud prevention where retention is necessary to protect the platform and its users",
        ]} />
        <P>Data retained for these purposes will be kept only for as long as required, then securely disposed of.</P>
      </Section>

      <Section title="Contact">
        <P>If you have questions about this process or your data rights, contact us at <A href="mailto:hello@dakio.io">hello@dakio.io</A>. We are committed to handling your request fairly and promptly.</P>
      </Section>
    </LegalLayout>
  );
}
