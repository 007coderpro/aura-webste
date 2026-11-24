import Link from 'next/link';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/pages/privacy',
  'Aura VPN Privacy Policy',
  'Read how Aura VPN handles browsing activity, subscriptions, diagnostics, and optional campaign measurement on iOS.',
);

export default function PrivacyPage() {
  return (
    <div className="bg-transparent px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-300">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">AuraVPN Privacy Policy</h1>
        <p className="mt-6 text-xl leading-8 font-semibold text-white">
          Effective November 24, 2026
        </p>
        
        <div className="mt-10 space-y-8">
          <p>
            AuraVPN Ltd. (&quot;AuraVPN,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the website{" "}
            <Link href="https://auravpn.net" className="text-blue-400 hover:text-blue-300">auravpn.net</Link> (&quot;the Site&quot;), the AuraVPN software (&quot;the Software&quot;), and associated services, features, and applications (&quot;the Services&quot;). We are committed to protecting your privacy and ensuring transparency regarding how we handle your information. By using our Services, you agree to the terms of this Privacy Policy. If you do not agree with this Privacy Policy, please discontinue the use of our Services and uninstall the Software where applicable.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">What Types of Information Do We Collect?</h2>
            <p>
              Our app is a privacy-focused VPN using the WireGuard protocol, collecting minimal user data overall. This policy reflects the current data practices for both our iOS and Android apps.
            </p>
            
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">1. VPN-Related Data</h3>
                <p>
                  No browsing activity, DNS queries, bandwidth usage, or traffic content is logged or collected. Sessions are handled on-device and ephemerally, with no persistent storage or transmission beyond real-time functionality.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">2. Non-VPN Data (Separate from VPN Functionality)</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    <strong className="text-white">Internally (No Third Parties):</strong> Account ID (app user ID for purchase linking) and purchase status (e.g., active/inactive subscription).
                  </li>
                  <li>
                    <strong className="text-white">RevenueCat (Purchases):</strong> To manage purchases, RevenueCat uses your device type, operating system, app user ID, and the time your device was last seen. It also uses purchase receipts or tokens from Apple or Google.
                  </li>
                  <li>
                    <strong className="text-white">Firebase Analytics (Basic, Opt-In):</strong> Device model/OS/app version, session duration, anonymized IP (coarse country), installation ID, crashes, performance metrics.
                  </li>
                </ul>
                <p className="mt-4">
                  We do not collect your email address, name, or precise location in the app. For data used in optional campaign measurement on iOS, see <a href="#how-people-find-aura" className="text-blue-400 hover:text-blue-300">How people find Aura</a>.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-2">3. Website and General Log Data</h3>
                <p>
                  For the Site, we collect log data such as your IP address, device type, browser type, pages visited, and access times through aggregated analytics.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">How Do We Use Your Information?</h2>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong className="text-white">Internal:</strong> Manage subscriptions (link account ID to purchase status for entitlement checks).
              </li>
              <li>
                <strong className="text-white">RevenueCat (Purchases):</strong> RevenueCat verifies purchases through Apple or Google, unlocks subscription features, and helps prevent fraud. This works regardless of your tracking choice on iOS.
              </li>
              <li>
                <strong className="text-white">Firebase:</strong> App improvement (e.g., optimize UI/performance via sessions/metrics), debugging (crashes/responses), aggregate insights (e.g., regional engagement). Aggregated only; no profiling.
              </li>
            </ul>
            <p>
              We use your information to provide and improve our Services, authenticate user accounts, optimize performance, prevent fraud, process payments, and provide customer support. Analytics data are used in aggregate form to analyze traffic patterns and measure the effectiveness of our Site and marketing efforts.
            </p>
          </section>

          <section>
            <h2 id="how-people-find-aura" className="text-2xl font-bold text-white mb-4 scroll-mt-24">How people find Aura</h2>
            <p className="mb-4">
              Aura shows no ads in the app. If you allow tracking on iOS, AudienceLab uses device identifiers, device settings, and app activity. This helps us understand which ads led people to install Aura. With the same permission, we share a device identifier with RevenueCat to connect those installs with subscriptions.
            </p>
            <p>
              You can use the VPN either way. To change your choice on your iPhone, go to Settings → Privacy &amp; Security → Tracking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
            <p className="mb-4">
              Each provider follows its own retention policy. Firebase Analytics typically keeps event data for 2 months by default, or up to 14 months depending on the settings. Google signals data may be kept for up to 26 months if shorter limits do not apply. Aggregated data may be kept longer. RevenueCat keeps purchase records as needed to meet legal obligations, typically for up to 6 years or until you request deletion.
            </p>
            <p>
              Signing out or uninstalling Aura does not delete records already held by our providers. You can contact us to request deletion. We can process requests for RevenueCat and help you submit requests to Google. Some anonymous or aggregated data may remain.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Payments and Subscriptions</h2>
            <p>
              Payments for AuraVPN subscriptions are processed through the Apple App Store (In-App Purchases) on iOS and Google Play on Android. We do not collect or store your full payment details.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Information Sharing</h2>
            <p className="mb-4">
              We do not sell, rent, or trade your personal information. We share data with the following providers.
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong className="text-white">RevenueCat</strong> uses purchase data to verify subscriptions. It stores that data encrypted in the US on AWS.
              </li>
              <li>
                <strong className="text-white">Google Firebase</strong> handles optional app analytics. It stores analytics data encrypted in the US.
              </li>
              <li>
                <strong className="text-white">AudienceLab and RevenueCat</strong> receive campaign measurement data only if you allow tracking on iOS. See <a href="#how-people-find-aura" className="text-blue-400 hover:text-blue-300">How people find Aura</a> for what each receives.
              </li>
            </ul>
            <p>
              No other sharing (e.g., brokers). Legal requests are minimized, and we notify users where possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Potential Future Changes</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Automatic Software Updates and Upgrades</h3>
                <p>
                  The AuraVPN Software may be updated automatically at our discretion without requiring any action from you.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Automatic Uploading, Routing, and Caching</h3>
                <p>
                  In the future, AuraVPN may introduce optimizations that involve network routing between users under a peer-to-peer model.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Processing and Storage</h2>
            <p>
              Your information may be processed within the European Union (EU) or transferred outside the EU with appropriate safeguards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Security and Confidentiality</h2>
            <p>
              We employ industry-standard security measures including encryption, access controls, and continuous monitoring.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Choices and Rights</h2>
            <p>
              You have the right to access, update, or request deletion of your data. You can also opt out of marketing emails.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookies and Tracking Technologies</h2>
            <p>
              AuraVPN uses cookies for website functionality and analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Continued use of our Services indicates acceptance of any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="mb-4">If you have any privacy-related questions or concerns, contact us at:</p>
            <div className="space-y-2">
              <p>
                <strong className="text-white">Email:</strong>{" "}
                <Link href="mailto:contact@auravpn.net" className="text-blue-400 hover:text-blue-300">
                  contact@auravpn.net
                </Link>
              </p>
              <p>
                <strong className="text-white">Website:</strong>{" "}
                <Link href="https://auravpn.net" className="text-blue-400 hover:text-blue-300">
                  auravpn.net
                </Link>
              </p>
            </div>
            <p className="mt-8 text-sm text-gray-500">
              © 2025 AuraVPN Ltd. All Rights Reserved.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
