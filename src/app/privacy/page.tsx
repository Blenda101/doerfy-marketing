import type { Metadata } from 'next'
import Link from 'next/link'

import LegalPage, { CONTACT_EMAIL, LEGAL_ENTITY } from '@/components/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy — Doerfy',
  description: 'How Doerfy collects, uses, and protects your information.',
}

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 22, 2026">
      <section>
        <h2>Introduction</h2>
        <p>
          Doerfy is operated by {LEGAL_ENTITY} (&ldquo;Doerfy,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or
          &ldquo;us&rdquo;). This Privacy Policy explains what information we collect when you use doerfy.com and the
          Doerfy apps (the &ldquo;Service&rdquo;), how we use it, and the choices you have.
        </p>
      </section>

      <section>
        <h2>Information we collect</h2>
        <h3>Account information</h3>
        <ul>
          <li>Email address and name</li>
          <li>Profile picture, if you upload one</li>
          <li>Sign-in data from a third-party provider, if you use social login</li>
          <li>Organization and team membership, if you join or create one</li>
        </ul>
        <h3>Content you create</h3>
        <ul>
          <li>Themes, goals, stories, tasks, notes, documents, and posts</li>
          <li>Canvas boards, comments, and annotations</li>
          <li>Files and links you upload or save</li>
          <li>Messages you send to Doey and other AI features</li>
        </ul>
        <h3>Billing information</h3>
        <p>
          Payments are processed by Stripe. We receive your plan, billing status, and limited card details (such as
          brand and last four digits). We never see or store your full card number.
        </p>
        <h3>Usage data</h3>
        <ul>
          <li>Device and browser type</li>
          <li>Feature usage, including how many AI credits you use</li>
          <li>Error logs and performance data</li>
          <li>Session and activity timestamps</li>
        </ul>
      </section>

      <section>
        <h2>How we use your information</h2>
        <ul>
          <li>To provide, maintain, and sync the Service across your devices</li>
          <li>To enable sharing and collaboration you choose</li>
          <li>To run the AI features you use, and to measure AI credit usage</li>
          <li>To process payments and manage subscriptions</li>
          <li>To send service emails (sign-in, password reset, billing receipts)</li>
          <li>To send product updates, which you can opt out of at any time</li>
          <li>To provide support, improve the Service, and prevent fraud or abuse</li>
        </ul>
      </section>

      <section>
        <h2>AI features</h2>
        <p>
          When you use an AI feature, we send the content that feature needs (for example, your message and relevant
          items from your workspace) to an AI provider to generate the result. Providers process it only to return
          that result to us. We do not sell your content or use it to train our own models, and we use providers&rsquo;
          business API services, which do not train their models on API inputs by default.
        </p>
      </section>

      <section>
        <h2>Service providers</h2>
        <p>We share information only with providers that help us run the Service:</p>
        <ul>
          <li><strong>Supabase</strong> — database, authentication, and file storage</li>
          <li><strong>Amazon Web Services</strong> — hosting, compute, and email delivery</li>
          <li><strong>Stripe</strong> — payments and subscription billing</li>
          <li><strong>AI providers</strong> (Anthropic, Google, OpenAI, fal.ai, Voyage AI) — AI features you use</li>
          <li><strong>Netlify</strong> — hosting for this website</li>
        </ul>
      </section>

      <section>
        <h2>When we share information</h2>
        <p>We do not sell your personal information. We share it only:</p>
        <ul>
          <li>With people you choose to share content with, or teams you join</li>
          <li>With the service providers listed above</li>
          <li>If required by law, or to protect the rights and safety of our users and Doerfy</li>
          <li>As part of a merger, acquisition, or sale of assets, with notice to you</li>
        </ul>
      </section>

      <section>
        <h2>Data security</h2>
        <ul>
          <li>Encryption in transit (HTTPS/TLS) and at rest</li>
          <li>Access controls that limit each account to its own data</li>
          <li>Encrypted storage for connected-service credentials</li>
          <li>Ongoing security updates and monitoring</li>
        </ul>
      </section>

      <section>
        <h2>Data retention</h2>
        <p>
          We keep your data while your account is active. After you delete your account, we delete your personal data
          within 30 days; backup copies may persist for up to 90 days. We may keep billing records as required by law
          and anonymized usage statistics.
        </p>
      </section>

      <section>
        <h2>Your rights</h2>
        <ul>
          <li>Access and export your data</li>
          <li>Correct inaccurate information</li>
          <li>Delete your account and its data</li>
          <li>Opt out of marketing emails</li>
          <li>Object to or restrict certain processing, where the law allows</li>
        </ul>
        <p>
          To exercise these rights, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          We use essential cookies and local storage for sign-in and to remember your preferences. We may use analytics
          to understand how the Service is used. You can control cookies in your browser settings.
        </p>
      </section>

      <section>
        <h2>Children</h2>
        <p>
          Doerfy is not intended for children under 13 (or under 16 in the EU). We do not knowingly collect personal
          information from children. If you believe a child has given us personal information, contact us and we will
          delete it.
        </p>
      </section>

      <section>
        <h2>International transfers</h2>
        <p>
          Doerfy is based in the United States, and your data may be processed there or in other countries where our
          providers operate. We rely on our providers&rsquo; legally recognized safeguards for these transfers.
        </p>
      </section>

      <section>
        <h2>Changes to this policy</h2>
        <p>
          We may update this policy. We will notify you of material changes by email or in the Service. See also our{' '}
          <Link href="/terms">Terms of Service</Link>.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          {LEGAL_ENTITY} — <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </section>
    </LegalPage>
  )
}
