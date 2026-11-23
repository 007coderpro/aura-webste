import Link from 'next/link';
import { pageMetadata } from '@/lib/pageMetadata';

export const metadata = pageMetadata(
  '/pages/terms',
  'Aura VPN Terms of Service',
  'Read the Aura VPN end user license agreement, including subscription terms, renewals, and refunds.',
);

export default function TermsPage() {
  return (
    <div className="bg-transparent px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-300">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">End User License Agreement (EULA)</h1>
        <p className="mt-6 text-xl leading-8 font-semibold text-white">
          Last Updated: August 23, 2025
        </p>
        
        <div className="mt-10 space-y-8">
          <p className="font-bold text-white">IMPORTANT – PLEASE READ CAREFULLY:</p>
          <p>
            THIS END USER LICENSE AGREEMENT, TOGETHER WITH THE PRIVACY POLICY INCORPORATED HEREIN, CONSTITUTES A LEGALLY BINDING AGREEMENT (&quot;AGREEMENT&quot;) BETWEEN YOU (AN INDIVIDUAL) AND AuraVPN Ltd. (referred to herein as &quot;AuraVPN&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). THIS AGREEMENT GOVERNS YOUR ACCESS TO AND USE OF THE AuraVPN Software (&quot;Software&quot;), THE AuraVPN WEBSITES (INCLUDING, BUT NOT LIMITED TO, <Link href="https://auravpn.net" className="text-blue-400 hover:text-blue-300">auravpn.net</Link>) AND ANY ACCOMPANYING SERVICES, FEATURES, CONTENT, OR APPLICATIONS (COLLECTIVELY, THE &quot;Services&quot;). BY USING THE SERVICES, YOU AGREE TO BE BOUND BY THIS AGREEMENT. IF YOU DO NOT AGREE TO THIS AGREEMENT OR THE PRIVACY POLICY, DO NOT USE THE SERVICES.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Privacy</h2>
            <p>
              We value your privacy and take reasonable measures to protect it. Our Services collect minimal user data as detailed in our Privacy Policy, including no logging of browsing activity, DNS queries, or traffic content for VPN functionality, and limited non-VPN data shared with third parties such as RevenueCat for purchases, Firebase for analytics, and Google AdMob for ads. Please review our Privacy Policy available on <Link href="https://auravpn.net" className="text-blue-400 hover:text-blue-300">auravpn.net</Link> to understand how we collect, use, retain, and share your information, including consent-based data use and retention policies aligned with both iOS and Android platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Data Privacy and GDPR Compliance</h2>
            <p>
              AuraVPN complies with the General Data Protection Regulation (GDPR) and applicable data privacy laws. All personal data provided by you is stored securely in our database systems and, where necessary, shared with Google’s and Apple’s services, as well as other processors like RevenueCat, Firebase, and AdMob, to support our platform’s functionality as described in our Privacy Policy. If you wish to have your account details and associated personal data deleted, please contact us at <Link href="mailto:contact@auravpn.net" className="text-blue-400 hover:text-blue-300">contact@auravpn.net</Link>. Please note that certain data may be retained as required by law or for legitimate business purposes, and data with third parties is retained per their policies (e.g., up to 14 months for Firebase event-level data).
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Use of the Services</h2>
            <p className="mb-4">
              The Services are provided in a standard (free) format; certain features or functionalities may be available only in a Premium version. You must be at least 13 years old (or the applicable age in your jurisdiction) and the owner or authorized administrator of the device on which you use the Software. We reserve the right to modify, suspend, or discontinue any feature of the Services at our sole discretion. Continued use of the Services following any changes constitutes acceptance of the revised terms.
            </p>
            <p>
              <strong className="text-white">Usage Policy:</strong> We do not accept the improper or unauthorized use of our Services. While we employ measures to prevent misuse, you acknowledge and agree that AuraVPN is not responsible for any misuse of our VPN service. Furthermore, we assume no financial responsibility arising from or related to any misuse or wrongful use of the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Payment, Renewals, and Refunds</h2>
            <p>
              You may use the free version of the Software. If you opt for the Premium version, you will be charged the then-current monthly fee. Premium accounts are automatically renewed at the end of each term until terminated by you. To terminate your Premium account, please contact us at <Link href="mailto:contact@auravpn.net" className="text-blue-400 hover:text-blue-300">contact@auravpn.net</Link> or cancel via your account settings. AuraVPN may use third-party services, such as RevenueCat, for payment processing in conjunction with Apple App Store or Google Play. You are encouraged to review any third-party terms and policies as we are not responsible for their practices. No refunds will be issued after the trial period ends.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limited License</h2>
            <p>
              During the term of this Agreement, we grant you a personal, non-exclusive, non-transferable, non-sublicensable, revocable, and limited license to use the Services and install the Software on your personal device solely for your personal and non-commercial use. Any commercial use requires a separate agreement with AuraVPN. For inquiries regarding commercial usage, please contact <Link href="mailto:contact@auravpn.net" className="text-blue-400 hover:text-blue-300">contact@auravpn.net</Link>. The Software is licensed to you, not sold. You may not copy, modify, distribute, sublicense, or reverse-engineer the Software except as expressly permitted herein.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Prohibited Conduct</h2>
            <p>
              You agree not to use the Services in any manner that damages, disables, overburdens, or impairs our servers or interferes with any other party&apos;s use of the Services. You may not attempt to gain unauthorized access to any part of the Services. You agree to use the Services only in ways that are legal and authorized. Any wrongful or abusive usage of the VPN service may result in immediate termination of your license to use the Software and the Services without further notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Registration and Security</h2>
            <p>
              In order to access certain features of the Services, you may need to create an account. You agree to provide accurate, current, and complete information during registration and to update it as necessary. You are responsible for safeguarding your account information and for all activities that occur under your account. Please notify us immediately at <Link href="mailto:contact@auravpn.net" className="text-blue-400 hover:text-blue-300">contact@auravpn.net</Link> if you suspect any unauthorized use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Proprietary Rights</h2>
            <p>
              All rights, title, and interest in and to the Software, websites, and Services (including any updates or modifications) are owned by AuraVPN or its licensors and are protected by applicable intellectual property laws. This Agreement does not grant you any rights in the Software, except for the limited license granted herein.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">User Generated Content</h2>
            <p>
              Certain areas of the Services may allow you to post or upload content (&quot;User Content&quot;). You are solely responsible for your User Content and must ensure that it does not violate any law or infringe on the rights of others. We reserve the right to remove any User Content that violates this Agreement without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Infringement Notices and Counter-Notice</h2>
            <p>
              If you believe that your intellectual property rights have been infringed, please submit a notification to our designated agent via email at <Link href="mailto:contact@auravpn.net" className="text-blue-400 hover:text-blue-300">contact@auravpn.net</Link> including all relevant information as required by applicable law. Failure to comply with these requirements may invalidate your notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Automatic Software Updates and Upgrades</h2>
            <p>
              AuraVPN may update or upgrade the Software automatically, which may include bug fixes, security updates, and new features. Such updates shall be deemed part of the Software and subject to this Agreement unless expressly provided otherwise.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Ads and Information Sharing</h2>
            <p>
              Our Services may display advertisements provided by third-party ad networks, such as Google AdMob. By using the Services, you acknowledge and agree that advertisements may be shown to you and that AuraVPN may share certain information with these ad networks for the purpose of delivering relevant ads. Such information may include, but is not limited to, device identifiers, usage data, and other information as described in our Privacy Policy. You agree that AuraVPN is not liable for any issues arising from the display of such advertisements or from information shared with ad networks.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Beta Program</h2>
            <p>
              You acknowledge that the Services may be in a beta stage and may contain bugs or limited functionality. Your use of beta features is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Websites and Content</h2>
            <p>
              The Services may include links to third-party websites or content that are not under our control. AuraVPN is not responsible for the content or practices of these third-party sites. Accessing any third-party site is at your own risk, and you should review their respective terms and privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Warranty Disclaimers</h2>
            <p className="uppercase">
              THE SOFTWARE AND SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE,&quot; WITHOUT ANY WARRANTY OF ANY KIND. TO THE FULLEST EXTENT PERMITTED BY LAW, AURAVPN, ITS OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS DISCLAIM ALL WARRANTIES, WHETHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT THE SOFTWARE OR SERVICES WILL BE ERROR-FREE, UNINTERRUPTED, OR FREE OF HARMFUL COMPONENTS.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <p>
              AuraVPN and any party involved in the creation or distribution of the Services shall not be financially responsible for any claims, damages, or losses arising out of or in connection with your use of the Services. You expressly acknowledge that you are using the Services at your own risk, and you agree to release and hold harmless AuraVPN from any and all liability related to your use or inability to use the Services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless Aura VPN and its affiliates, officers, directors, employees, agents, and licensors from any claims, liabilities, damages, or expenses (including reasonable attorneys&apos; fees) arising from your use of the Services or your breach of this Agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Term and Termination</h2>
            <p>
              This Agreement becomes effective when you first access or install the Software and will continue until terminated by either you or AuraVPN. You may terminate this Agreement at any time by uninstalling the Software. AuraVPN may suspend or terminate your access to the Services at any time, with or without notice, for any reason including, but not limited to, a breach of this Agreement. Upon termination, your license to use the Software and Services shall immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Compliance with Law &amp; Export Control</h2>
            <p>
              You agree to use the Software only in compliance with all applicable laws and regulations. You further agree not to export or re-export the Software in violation of any export laws or regulations.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">General Provisions</h2>
            <p className="mb-4">
              This Agreement, along with any policies referenced herein, constitutes the entire agreement between you and AuraVPN. We may notify you of important changes or updates via postings on our website or by email, so please ensure that your contact information is accurate. AuraVPN may assign its rights under this Agreement at its discretion. You may not assign your rights or obligations without our prior written consent. This Agreement shall be governed by the laws of Finland, and you agree to submit to the exclusive jurisdiction of the courts in Finland for any disputes arising out of or relating to this Agreement. Failure by AuraVPN to enforce any provision of this Agreement shall not constitute a waiver of future enforcement of that or any other provision. Any claim or cause of action arising out of or related to the use of the Services must be filed within one (1) year of the claim arising.
            </p>
            <p>
              By using the Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement and our Privacy Policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <p className="mb-4">
              If you have any questions regarding this Agreement, please contact us at <Link href="mailto:contact@auravpn.net" className="text-blue-400 hover:text-blue-300">contact@auravpn.net</Link>.
            </p>
            <p className="text-sm text-gray-500 mt-8">
              © 2025 AuraVPN Ltd. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Use of the Services constitutes acceptance of AuraVPN’s Terms of Use and Privacy Notice.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
