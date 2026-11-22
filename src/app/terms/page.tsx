import type { Metadata } from 'next'
import Link from 'next/link'

import LegalPage, { CONTACT_EMAIL, LEGAL_ENTITY } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Service — Doerfy',
  description: 'The terms that govern your use of Doerfy.',
}

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="November 22, 2026">
      <section>
        <h2>1. Agreement</h2>
        <p>
          These Terms govern your use of doerfy.com and the Doerfy apps (the &ldquo;Service&rdquo;), operated by{' '}
          {LEGAL_ENTITY} (&ldquo;Doerfy,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;). By using the Service you agree
          to these Terms. If you use the Service for an organization, you agree on its behalf.
        </p>
      </section>

      <section>
        <h2>2. The Service</h2>
        <p>
          Doerfy helps you design and run your life and work: themes, goals, stories, tasks, notes, canvas, content,
          team spaces, and AI assistance through Doey. We may add, change, or remove features over time.
        </p>
      </section>

      <section>
        <h2>3. Your account</h2>
        <ul>
          <li>Provide accurate information and keep it up to date</li>
          <li>Keep your sign-in credentials secure and don&rsquo;t share your account</li>
          <li>Tell us promptly about any unauthorized use</li>
          <li>You are responsible for activity under your account</li>
        </ul>
      </section>

      <section>
        <h2>4. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service for anything illegal, harmful, or abusive</li>
          <li>Upload content you don&rsquo;t have the right to share</li>
          <li>Upload malicious code or try to break, overload, or gain unauthorized access to the Service</li>
          <li>Scrape the Service or resell it without our permission</li>
          <li>Use AI features to create content that is unlawful or violates others&rsquo; rights</li>
        </ul>
      </section>

      <section>
        <h2>5. Your content</h2>
        <p>
          You own the content you create. You give us a limited license to store, process, display, and back it up as
          needed to provide the Service, including sharing it with people you choose and sending it to AI providers
          when you use AI features. You are responsible for having the rights to what you upload.
        </p>
      </section>

      <section>
        <h2>6. AI features</h2>
        <p>
          AI output can be inaccurate or incomplete. Review it before relying on it; it is not professional (legal,
          medical, financial) advice. AI usage is measured in credits as described in section 7.
        </p>
      </section>

      <section>
        <h2>7. Plans, billing, and AI credits</h2>
        <ul>
          <li>Paid plans are billed in advance, monthly or yearly, through Stripe. Team plans are billed per seat.</li>
          <li>Subscriptions renew automatically until cancelled. You can cancel at any time and keep access until the end of the paid period.</li>
          <li>Plans include a monthly AI credit allowance. Unused allowance does not roll over.</li>
          <li>Extra credit packs are one-time purchases. They don&rsquo;t expire while your account is active and are used after your monthly allowance.</li>
          <li>Except where required by law, payments, including credit packs, are non-refundable.</li>
          <li>We may change prices with at least 30 days&rsquo; notice. Changes apply from your next billing period.</li>
          <li>Taxes may apply based on your location.</li>
        </ul>
      </section>

      <section>
        <h2>8. Our intellectual property</h2>
        <p>
          The Service, including its design, code, and features (but not your content), belongs to Doerfy. You may not
          copy, modify, or reverse engineer it except as the law allows.
        </p>
      </section>

      <section>
        <h2>9. Privacy</h2>
        <p>
          Our <Link href="/privacy">Privacy Policy</Link> explains how we handle your information and is part of these
          Terms.
        </p>
      </section>

      <section>
        <h2>10. Disclaimer</h2>
        <p>
          THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE,&rdquo; WITHOUT WARRANTIES OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO
          NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED OR ERROR-FREE.
        </p>
      </section>

      <section>
        <h2>11. Limitation of liability</h2>
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, DOERFY WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
          CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR FOR LOST DATA, PROFITS, OR GOODWILL. OUR TOTAL LIABILITY FOR ANY CLAIM
          IS LIMITED TO THE AMOUNT YOU PAID US IN THE 12 MONTHS BEFORE THE CLAIM.
        </p>
      </section>

      <section>
        <h2>12. Indemnification</h2>
        <p>
          You agree to indemnify Doerfy against claims arising from your use of the Service, your content, or your
          violation of these Terms.
        </p>
      </section>

      <section>
        <h2>13. Suspension and termination</h2>
        <p>
          You may delete your account at any time in Settings. We may suspend or end accounts that violate these Terms
          and remove content that breaks them or the law. After termination we delete your data as described in the
          Privacy Policy.
        </p>
      </section>

      <section>
        <h2>14. Changes to these Terms</h2>
        <p>
          We may update these Terms. We will notify you of material changes by email or in the Service. Continuing to
          use the Service after changes take effect means you accept them.
        </p>
      </section>

      <section>
        <h2>15. Governing law</h2>
        <p>
          These Terms are governed by the laws of the United States and of the state in which {LEGAL_ENTITY} is
          incorporated, without regard to conflict-of-law rules. Disputes will be resolved by binding individual
          arbitration, except where the law does not allow it or for small-claims matters.
        </p>
      </section>

      <section>
        <h2>16. General</h2>
        <ul>
          <li>If any part of these Terms is unenforceable, the rest stays in effect</li>
          <li>Not enforcing a right is not a waiver of it</li>
          <li>These Terms are the entire agreement between you and Doerfy about the Service</li>
          <li>You may not assign these Terms without our consent</li>
        </ul>
      </section>

      <section>
        <h2>17. Contact</h2>
        <p>
          {LEGAL_ENTITY} — <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>
    </LegalPage>
  )
}
