import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-transparent px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-300">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">AuraVPN Privacy Policy</h1>
        <p className="mt-6 text-xl leading-8 font-semibold text-white">
          Last Updated: August 23, 2025
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
                    <strong className="text-white">RevenueCat (Purchases):</strong> Device type/OS, last-seen timestamp, purchase receipts/tokens (e.g., from Apple or Google), app user ID (for integration).
                  </li>
                  <li>
                    <strong className="text-white">Firebase Analytics (Basic, Opt-In):</strong> Device model/OS/app version, session duration, anonymized IP (coarse country), installation ID, crashes, performance metrics.
                  </li>
                  <li>
                    <strong className="text-white">Google AdMob (Ads):</strong> IP address (coarse location), device ID (e.g., IDFA on iOS if enabled via ATT prompt, or Advertising ID on Android if consented), advertising data (ads viewed), user interactions (e.g., app events, video views for ad optimization).
                  </li>
                </ul>
                <p className="mt-4">
                  No emails, names, precise locations, or personal identifiers are collected.
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
                <strong className="text-white">RevenueCat:</strong> Subscription validation/entitlements (e.g., unlock features via receipts), fraud prevention. Tied to platform billing (Apple or Google); no marketing.
              </li>
              <li>
                <strong className="text-white">Firebase:</strong> App improvement (e.g., optimize UI/performance via sessions/metrics), debugging (crashes/responses), aggregate insights (e.g., regional engagement). Aggregated only; no profiling.
              </li>
              <li>
                <strong className="text-white">AdMob:</strong> Display ads (e.g., serve relevant banners/interstitials based on interactions/IP), improve ad performance (e.g., measure views/clicks). No use beyond monetization.
              </li>
            </ul>
            <p>
              We use your information to provide and improve our Services, authenticate user accounts, optimize performance, prevent fraud, process payments, and provide customer support. Analytics data are used in aggregate form to analyze traffic patterns and measure the effectiveness of our Site and marketing efforts.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Retention</h2>
            <p>
              Data use is consent-based (e.g., ATT for IDFA on iOS; opt-in for Advertising ID on Android; opt-in prompt for analytics/ads; revocable in settings) and retained in accordance with the respective service providers&apos; policies (e.g., Firebase Analytics event-level data is typically retained for 2 months by default or up to 14 months depending on configuration, with user-level data up to 26 months for Google signals but respecting shorter periods; aggregated data may be kept longer; RevenueCat data is retained as necessary for legal obligations, typically up to 6 years or until deletion request; AdMob user activity data is retained for up to 90 days, while ads activity data may be retained for up to 7 years). Note that Firebase, RevenueCat, and AdMob data is not automatically deleted when the app is uninstalled or upon other events like account logout—existing collected data persists on the providers&apos; servers until the retention period expires or explicit deletion is requested, as no custom automatic deletion mechanisms (e.g., TTL policies or scheduled purges) have been configured beyond the providers&apos; defaults. Data can be deleted upon user request via support (e.g., we can process deletions for RevenueCat via dashboard/API; for Firebase/AdMob, we facilitate requests to Google where possible, though some anonymized/aggregated data may remain).
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
              We do not sell, rent, or trade your personal information. No selling or disclosure beyond what&apos;s necessary, in compliance with platform guidelines (e.g., Apple Guideline 5.4 and Google Play Data Safety). Shared only with processors:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>
                <strong className="text-white">RevenueCat:</strong> For purchase validation; stored in US (AWS, encrypted, per DPA).
              </li>
              <li>
                <strong className="text-white">Google (Firebase/AdMob):</strong> For analytics/ad serving; stored in US (encrypted, per Data Processing Terms). AdMob shares with advertisers for bidding/targeting.
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