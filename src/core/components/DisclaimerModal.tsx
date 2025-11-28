import React from 'react';
import { X, ExternalLink } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onClose: () => void;
  partners: Array<{ name: string; state: string; website: string }>;
}

const stateBarLinks = [
  { state: 'Alabama', url: 'https://alabar.org' },
  { state: 'Alaska', url: 'https://alaskabar.org' },
  { state: 'Arizona', url: 'https://azbar.org' },
  { state: 'Arkansas', url: 'https://arkbar.com' },
  { state: 'California', url: 'https://calbar.ca.gov' },
  { state: 'Colorado', url: 'https://cobar.org' },
  { state: 'Connecticut', url: 'https://ctbar.org' },
  { state: 'Delaware', url: 'https://dsba.org' },
  { state: 'District of Columbia', url: 'https://dcbar.org' },
  { state: 'Florida', url: 'https://floridabar.org' },
  { state: 'Georgia', url: 'https://gabar.org' },
  { state: 'Guam', url: 'https://guambar.org' },
  { state: 'Hawaii', url: 'https://hsba.org' },
  { state: 'Idaho', url: 'https://isb.idaho.gov' },
  { state: 'Illinois', url: 'https://isba.org' },
  { state: 'Indiana', url: 'https://inbar.org' },
  { state: 'Iowa', url: 'https://iowabar.org' },
  { state: 'Kansas', url: 'https://ksbar.org' },
  { state: 'Kentucky', url: 'https://kybar.org' },
  { state: 'Louisiana', url: 'https://lsba.org' },
  { state: 'Maine', url: 'https://mainebar.org' },
  { state: 'Maryland', url: 'https://msba.org' },
  { state: 'Massachusetts', url: 'https://massbar.org' },
  { state: 'Michigan', url: 'https://michbar.org' },
  { state: 'Minnesota', url: 'https://mnbar.org' },
  { state: 'Mississippi', url: 'https://msbar.org' },
  { state: 'Missouri', url: 'https://mobar.org' },
  { state: 'Montana', url: 'https://montanabar.org' },
  { state: 'Nebraska', url: 'https://nebar.com' },
  { state: 'Nevada', url: 'https://nvbar.org' },
  { state: 'New Hampshire', url: 'https://nhbar.org' },
  { state: 'New Jersey', url: 'https://njsba.com' },
  { state: 'New Mexico', url: 'https://nmbar.org' },
  { state: 'New York', url: 'https://nysba.org' },
  { state: 'North Carolina', url: 'https://ncbar.org' },
  { state: 'North Dakota', url: 'https://sbnד.org' },
  { state: 'Ohio', url: 'https://ohiobar.org' },
  { state: 'Oklahoma', url: 'https://okbar.org' },
  { state: 'Oregon', url: 'https://osbar.org' },
  { state: 'Pennsylvania', url: 'https://pabar.org' },
  { state: 'Puerto Rico', url: 'https://colegiodeabogadospr.org' },
  { state: 'Rhode Island', url: 'https://ribar.com' },
  { state: 'South Carolina', url: 'https://scbar.org' },
  { state: 'South Dakota', url: 'https://statebarofsouthdakota.com' },
  { state: 'Tennessee', url: 'https://tba.org' },
  { state: 'Texas', url: 'https://texasbar.com' },
  { state: 'Utah', url: 'https://utahbar.org' },
  { state: 'Vermont', url: 'https://vtbar.org' },
  { state: 'Virgin Islands', url: 'https://vibar.org' },
  { state: 'Virginia', url: 'https://vsb.org' },
  { state: 'Washington', url: 'https://wsba.org' },
  { state: 'West Virginia', url: 'https://wvbar.org' },
  { state: 'Wisconsin', url: 'https://wisbar.org' },
  { state: 'Wyoming', url: 'https://wyomingbar.org' },
];

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ isOpen, onClose, partners }) => {
  if (!isOpen) return null;

  const uniquePartners = Array.from(new Set(partners.map(p => p.name))).sort();

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 animate-fadeIn"
        onClick={onClose}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="bg-white rounded-lg shadow-2xl max-w-5xl w-full max-h-[90vh] relative animate-slideUp pointer-events-auto flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white rounded-t-lg">
            <h2 className="text-2xl font-bold text-gray-900">Partner Network Disclosure</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="overflow-y-auto p-6 space-y-6">
            <div>
              <p className="text-gray-700 leading-relaxed mb-4">
                Personal Injury Hotline partners with a nationwide network of trusted legal professionals and related service providers.
                When you submit your information through our website, your details are only shared within this network — specifically with one or more of the following categories of partners, depending on your location and the nature of your claim.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We do not sell leads or send your information to anyone outside of these partner categories.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Personal Injury Hotline is not a law firm; instead, we collect inquiries and connect you (with your consent) to licensed attorneys or service providers within our network who can assist with your case.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We use encrypted data transmission and store your information securely in compliance with applicable privacy and data protection laws.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Partner Categories</h3>
              <div className="space-y-4 text-gray-700">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Law Firms & Case Evaluation Partners</h4>
                  <p className="leading-relaxed mb-2">
                    Licensed personal injury and motor-vehicle accident law firms that provide free claim evaluations and representation services. These include, but are not limited to, firms handling:
                  </p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Car, truck, motorcycle, and pedestrian accidents</li>
                    <li>Slip-and-fall or premises-liability claims</li>
                    <li>Workplace injury and employer negligence cases</li>
                    <li>Wrongful-death and catastrophic injury matters</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Medical & Rehabilitation Partners</h4>
                  <p className="leading-relaxed">
                    Licensed medical providers, chiropractors, physical therapists, and rehabilitation centers that assist injury victims with post-accident treatment, recovery, and medical documentation.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Insurance & Automotive Service Partners</h4>
                  <p className="leading-relaxed">
                    Select organizations that assist with accident-related needs such as insurance claims, vehicle repair or replacement, and rental assistance while your claim is pending.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Legal Marketing & Case Intake Partners</h4>
                  <p className="leading-relaxed mb-2">
                    Specialized marketing firms, call centers, and intake support teams that assist with data verification, communications, and client matching within our attorney network.
                  </p>
                  <p className="text-sm italic">
                    All leads are generated through our own platform; we do not purchase third-party leads. These partners only assist with communications and intake operations.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Network List</h3>
              <p className="text-sm text-gray-600 mb-4">
                Below is a representative list of partner law firms in our network (updated periodically). This list will expand as we grow our relationships and maintain compliance with applicable regulations. We are not formally partnered with every firm referenced or listed; any names shown are illustrative examples of attorneys and practices that handle similar cases in our industry.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm text-gray-700">
                {uniquePartners.map((name, index) => (
                  <div key={index} className="truncate">{name}</div>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                Additional firms and providers may be added periodically based on region and case type.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Attorney License Verification</h3>
              <p className="text-gray-700 mb-4">
                You can verify an attorney's license and standing through your state's official bar association or licensing authority. Use the links below to access your state's lookup tool.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {stateBarLinks.map((bar) => (
                  <a
                    key={bar.state}
                    href={bar.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-sm"
                  >
                    <span className="font-medium text-gray-900">{bar.state}</span>
                    <ExternalLink className="w-4 h-4 text-blue-600" />
                  </a>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-4">
                If your state or territory is not listed above, please refer to your jurisdiction's official court or bar website for license verification. You may also contact us for assistance in locating the appropriate resource.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Attorney Network & Access Notice</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Personal Injury Hotline maintains relationships with select licensed law firms across the United States. Our goal is to provide consumers with access to a national network of qualified personal-injury and motor-vehicle accident attorneys.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                When appropriate — and only with your consent — we will connect you with one of these partner firms for a free case evaluation.
              </p>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="font-semibold text-gray-900 mb-2">PLEASE NOTE</p>
                <p className="text-gray-700 mb-2">
                  You initially may be connected to a non-attorney representative (for example, an intake specialist or call center partner).
                </p>
                <p className="text-gray-700 mb-2">
                  To speak with a licensed attorney directly, you must specifically request to be connected to one.
                </p>
                <p className="text-gray-700">
                  We will then arrange a consultation with an attorney in your jurisdiction if your case qualifies.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Important Legal Disclosures</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-3 text-sm text-gray-700">
                <p className="font-bold text-red-600 text-base">THIS IS AN ADVERTISEMENT.</p>
                <p>You are under no obligation to retain a lawyer who contacts you.</p>
                <p>
                  All content provided on this website is for informational purposes only. Personal Injury Hotline is not a law firm or a lawyer-referral service and does not provide legal advice.
                </p>
                <p>
                  All claim evaluations and legal services are performed by independent, third-party licensed attorneys in our network. Participating attorneys and firms may compensate Personal Injury Hotline for marketing, advertising, or administrative support services in accordance with applicable legal-advertising and ethical rules.
                </p>
                <p>
                  Participation in this network does not constitute an endorsement or recommendation of any attorney or firm.
                </p>
                <p>
                  Submitting your information through this site does not create an attorney–client relationship.
                </p>
                <p>
                  An attorney–client relationship is only established after you sign a retainer or engagement agreement with a law firm.
                </p>
                <p>
                  Services may not be available in all states. The choice of a lawyer is an important decision and should not be based solely upon advertisements.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Case Funding & Outcomes Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                If you pursue a claim, there is no guarantee of any particular outcome, settlement, or monetary advance.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Some law firms may assist clients with cash advances or loans during lengthy cases, but such support is at the sole discretion of the law firm or a third-party funding company and is not guaranteed.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Any advance, if offered, is not a settlement of your claim and must typically be repaid from future recovery. You should carefully review any funding agreement or consult with your attorney about such arrangements.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Attorney Verification & Transparency</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                For your peace of mind, we have provided official state bar resources above to verify the credentials and good standing of any attorney with whom you are connected.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We encourage all users to confirm an attorney's license status and qualifications before engaging representation.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Personal Injury Hotline may expand or adjust its network of law firms over time.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We are not formally partnered with every law firm named or referenced on this page. Any listed firms are illustrative examples of those handling similar matters. Our network continues to evolve to best serve consumers nationwide.
              </p>
            </div>

            <div className="border-t pt-4">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Updates</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                This Partner Network Disclosure page is reviewed and updated periodically to reflect current relationships, compliance requirements, and operational changes.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                We are committed to transparency and maintaining full compliance with state bar advertising and TCPA regulations.
              </p>
              <div className="text-sm text-gray-600">
                <p className="mb-1"><strong>Last Updated:</strong> October 2025</p>
                <p><strong>Contact:</strong> admin@personalinjuryhotline.co</p>
              </div>
              <p className="text-xs text-gray-500 mt-4 italic">
                This advertisement is intended for general informational purposes and should not be construed as legal advice. Availability of services varies by state.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </>
  );
};
