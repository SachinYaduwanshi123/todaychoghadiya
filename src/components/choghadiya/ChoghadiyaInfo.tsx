import { CheckCircle2, XCircle } from 'lucide-react';

export default function ChoghadiyaInfo() {
  return (
    <div className="w-full mx-auto py-12 px-6 sm:px-10 bg-white rounded-3xl shadow-sm border border-gray-100 my-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">What is Choghadiya?</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Choghadiya is an ancient Vedic astrology system used to find auspicious and inauspicious timings of the day. A 24-hour period is divided into <strong>Day Choghadiya</strong> (sunrise to sunset) and <strong>Night Choghadiya</strong> (sunset to next sunrise). Each is further divided into 8 equal parts of approximately 1.5 hours each.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="bg-emerald-50/50 rounded-2xl p-8 border border-emerald-100 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-2xl font-bold text-emerald-800 flex items-center mb-6">
            <CheckCircle2 className="w-8 h-8 mr-3 text-emerald-600" />
            Auspicious (Good) Choghadiya
          </h3>
          <ul className="space-y-6">
            <li className="flex flex-col">
              <span className="font-bold text-emerald-900 text-lg mb-1">Amrit</span>
              <span className="text-emerald-700 leading-relaxed">Considered the most auspicious time. Best for starting any new work, spiritual rituals, or undertaking important journeys.</span>
            </li>
            <li className="flex flex-col">
              <span className="font-bold text-emerald-900 text-lg mb-1">Shubh</span>
              <span className="text-emerald-700 leading-relaxed">Highly favorable. Good for marriage, Poojas, education, and purchasing property or vehicles.</span>
            </li>
            <li className="flex flex-col">
              <span className="font-bold text-emerald-900 text-lg mb-1">Labh</span>
              <span className="text-emerald-700 leading-relaxed">Best for business transactions, starting new commercial ventures, and seeking profit.</span>
            </li>
            <li className="flex flex-col">
              <span className="font-bold text-emerald-900 text-lg mb-1">Char (Chal)</span>
              <span className="text-emerald-700 leading-relaxed">A dynamic phase. Ideal for travel, movement, and activities requiring momentum.</span>
            </li>
          </ul>
        </div>

        <div className="bg-red-50/50 rounded-2xl p-8 border border-red-100 shadow-sm transition-all hover:shadow-md">
          <h3 className="text-2xl font-bold text-red-800 flex items-center mb-6">
            <XCircle className="w-8 h-8 mr-3 text-red-600" />
            Inauspicious (Bad) Choghadiya
          </h3>
          <ul className="space-y-6">
            <li className="flex flex-col">
              <span className="font-bold text-red-900 text-lg mb-1">Rog</span>
              <span className="text-red-700 leading-relaxed">Associated with disease and bad health. It is highly advised to avoid starting new tasks, business, or medical treatments during this time.</span>
            </li>
            <li className="flex flex-col">
              <span className="font-bold text-red-900 text-lg mb-1">Kaal</span>
              <span className="text-red-700 leading-relaxed">Associated with loss, delays, and obstacles. Do not undertake any important work, travel, or investments.</span>
            </li>
            <li className="flex flex-col">
              <span className="font-bold text-red-900 text-lg mb-1">Udveg</span>
              <span className="text-red-700 leading-relaxed">Causes stress, anxiety, and distress. Bad for government dealings, legal matters, or approaching superiors.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
