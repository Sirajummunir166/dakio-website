// Terms of Service — copy ported verbatim from dakio-landing/src/pages/Terms.jsx.

import LegalLayout, { englishOnly, Section, P, Ul, A } from "../../../components/legal/LegalLayout";

export const metadata = {
  title: "Terms of Service — Dakio",
  description: "The terms that govern use of the Dakio platform for merchants and suppliers.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage({ params }) {
  const { lang } = await params;
  englishOnly(lang);

  return (
    <LegalLayout title="Terms of Service" lastUpdated="November 2026">
      <Section title="Overview">
        <P>These Terms of Service (&quot;Terms&quot;) govern your use of the Dakio platform and all related services (&quot;Dakio&quot; or the &quot;Service&quot;). By registering for or using Dakio, you agree to these Terms. Please read them carefully.</P>
        <P>Dakio is operated by <strong>Digidhaka Communication Limited</strong>, a company registered in Bangladesh (Trade License No. TRAD/DSCC/041467/2021; registered office: 253-254 Dr. Kudrat-e-Khuda Road, Kataban, Dhaka, Bangladesh). In these Terms, &quot;we&quot;, &quot;us&quot; and &quot;Dakio&quot; mean Digidhaka Communication Limited.</P>
        <P>Dakio is software: a subscription-based platform that shops and service businesses use to run their business, in Bangladesh and in other countries. It includes a shared inbox with an AI assistant (Nova), customer and client records (CRM), a website, order management and inventory for businesses that sell products, bookings, a team calendar, quotes and invoices for businesses that sell services, money records, reporting and related integrations. Some services (the online storefront checkout, courier booking, dropshipping and the Dakio warehouse) are currently available to merchants in Bangladesh only.</P>
        <P>In these Terms, &quot;merchant&quot; means any business that uses Dakio, whether it sells products, provides services, or both, and &quot;customer&quot; includes a merchant&apos;s clients.</P>
        <P>Dakio does not sell or ship physical goods, and does not provide services, to merchants&apos; customers. Merchants sell their own products and provide their own services to their own customers; Dakio provides the software they use to do it.</P>
      </Section>

      <Section title="Eligibility and Account Responsibility">
        <P>To use Dakio, you must be at least 18 years old and have the legal capacity to enter into a binding agreement. By registering, you represent that the information you provide is accurate and that you have the authority to act on behalf of any business entity you register.</P>
        <P>You are responsible for maintaining the security of your account credentials. You must not share your login details with unauthorized parties. Any activity that occurs under your account is your responsibility. If you suspect unauthorized access, notify us immediately at <A href="mailto:hello@dakio.io">hello@dakio.io</A>.</P>
        <P>Merchant accounts are intended for business use. Each merchant account grants access to the number of staff users defined by the active subscription plan.</P>
      </Section>

      <Section title="Merchant Responsibilities">
        <P>As a merchant using Dakio, you are solely responsible for:</P>
        <Ul items={[
          "The products you sell and the services you provide through Dakio (your storefront, website, chats and bookings), including their accuracy, legality, quality, and safety",
          "Setting accurate pricing and clearly communicating all costs to your customers, including delivery charges, quotes, advances and deposits",
          "All customer communications, post-sale support, returns, refunds, cancellations, missed appointments, and dispute resolution",
          "Ensuring your content, including product and service descriptions, images, and promotional material, does not infringe third-party rights or violate applicable laws",
          "Compliance with consumer protection laws, tax obligations, and any other regulations applicable to your business and jurisdiction",
          "If you sell products: managing your inventory levels and ensuring products offered for sale are available",
          "If you provide services: honouring the bookings you accept, holding any licence or qualification your work requires, and keeping what clients tell you confidential",
          "Recording payments accurately: money your customers pay you directly (cash, bKash, bank transfer or otherwise) reaches Dakio only as you record it, and you are responsible for checking it arrived",
          "The accuracy of business information you provide on the platform",
        ]} />
        <P>Dakio provides infrastructure and tools; we are not a party to the sales, bookings or service agreements between you and your customers. Any dispute between you and a customer is your responsibility to resolve.</P>
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

      <Section title="Bookings, Quotes and Invoices">
        <P>Dakio&apos;s booking, quote and invoice tools help you record appointments, prices and money. Times offered to clients come from the working hours and the team you set; you are responsible for keeping them current.</P>
        <P>Quotes and invoices are sent from you to your client. Dakio does not collect payments on your behalf through them: your clients pay you directly by the ways you list, and you record the payment in Dakio. Totals, reports and profit figures in Dakio are based on what is recorded and are not tax or accounting advice.</P>
      </Section>

      <Section title="Nova, the AI CEO">
        <P>Nova is Dakio&apos;s AI. We call it the AI CEO of your business because it runs day to day work for you; it is software, not a person, an employee or an officer of your company. When you switch it on, Nova answers your customers in chat and comments, offers free times, records booking requests and takes orders, within the settings you choose. Nova works from the information you give Dakio (your products, services, prices, hours and rules), so you are responsible for keeping that information accurate.</P>
        <P>Nova can make mistakes. You can review its conversations, take over any chat, and switch it off at any time. Nova does not record a payment as received on its own: when a customer says they have paid, Nova passes it to you to confirm.</P>
      </Section>

      <Section title="Dropshipping and Fulfillment Operations">
        <P>The dropshipping and fulfillment service is available to merchants in Bangladesh only and is not sold through Paddle. Dakio&apos;s dropshipping service connects merchants with supplier inventory for fulfillment. When a merchant sells a dropship product, Dakio coordinates warehouse reservation, packing, and courier handover on behalf of the merchant. Merchants are charged for dropship costs as described in applicable service documentation.</P>
        <P>Dakio does not guarantee continuous availability of any specific dropship product. Stock availability is subject to supplier inventory levels and warehouse capacity. Merchants should not commit to customers for orders that cannot be fulfilled.</P>
      </Section>

      <Section title="Acceptable Use">
        <P>You agree not to use Dakio to:</P>
        <Ul items={[
          "Sell or provide counterfeit, stolen, prohibited, or illegal products or services",
          "Engage in fraudulent, deceptive, or misleading practices toward customers",
          "Abuse, harass, or harm other users of the platform",
          "Circumvent or tamper with platform security controls or technical protections",
          "Use the platform to generate or facilitate spam, phishing, or unauthorized marketing",
          "Scrape or extract platform data without authorization",
          "Violate applicable laws or regulations in Bangladesh or any other jurisdiction",
          "Submit orders or bookings you know to be fraudulent or fabricated",
        ]} />
        <P>Dakio may investigate suspected violations and take appropriate action, including account suspension or termination, without prior notice where necessary to protect the integrity of the platform.</P>
      </Section>

      <Section title="Integrations and Third-Party Services">
        <P>Dakio integrates with third-party services including messaging channels (Facebook Messenger, Instagram and WhatsApp), calendars (Google Calendar), email and SMS delivery, courier providers (Pathao, RedX, Steadfast, Sundarban, and others), payment processors (bKash, Nagad, SSLCommerz, and Paddle for businesses outside Bangladesh), and optional marketing tools (Meta Pixel, Google Tag Manager, and others). These integrations are provided as a convenience.</P>
        <P>Third-party services are governed by their own terms of service and privacy policies. Dakio is not responsible for the performance, availability, or actions of third-party platforms. If a third-party service changes its policies or becomes unavailable, Dakio will make reasonable efforts to maintain service continuity but cannot guarantee uninterrupted availability of specific integrations.</P>
        <P>Merchants are responsible for their own use of any third-party integrations they enable through the platform, including compliance with those platforms&apos; advertising and data policies.</P>
      </Section>

      <Section title="Subscription, Billing, and Charges">
        <P>Access to Dakio requires an active paid subscription. Pricing details, plan limits, and billing cycles are described on the Dakio website and may be updated from time to time. By subscribing, you authorize Dakio to charge your selected payment method for the applicable subscription fee.</P>
        <P>Subscription fees are generally non-refundable. Refund eligibility, if any, is described in our <A href="/refund-policy">Return and Refund Policy</A>. If you cancel, your access continues until the end of the current billing period.</P>
        <P><strong>Businesses based outside Bangladesh.</strong> Our order process for businesses outside Bangladesh is conducted by our online reseller Paddle.com. Paddle.com is the Merchant of Record for all those orders: Paddle charges you in US dollars, adds and remits any sales tax or VAT that applies, issues the invoice, and handles billing enquiries and refunds for those payments under the <A href="https://www.paddle.com/legal/checkout-buyer-terms">Paddle Buyer Terms</A>. Payments through Paddle are for Dakio software only: plan subscriptions and Nova credit top-ups. These subscriptions renew automatically at the end of each billing period until you cancel; you can cancel at any time from Billing in the app, and access continues until the end of the period you paid for.</P>
        <P>In addition to subscription fees, merchants may incur operational charges for platform services such as Nova credit top-ups, SMS messages, dropshipping fulfillment, courier service fees, and any other charges disclosed at time of use. Dakio reserves the right to adjust pricing with reasonable notice.</P>
      </Section>

      <Section title="Suspension and Termination">
        <P>Either party may terminate the relationship at any time. You may cancel your account through the platform or by contacting <A href="mailto:hello@dakio.io">hello@dakio.io</A>.</P>
        <P>Dakio reserves the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or cause harm to other users or the platform, with or without prior notice depending on the severity of the situation. We will make reasonable efforts to notify you in non-urgent cases.</P>
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
