import React, { useState } from "react";
import {
  CreditCard,
  Smartphone,
  Banknote,
  Shield,
  Calendar,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";

const BRAND_BLUE = "#1c7cf2";
const BRAND_GREEN = "#10b77f";

const steps = [
  "معلومات الحجز",
  "التفاصيل المالية",
  "طرق الدفع",
  "التواريخ",
  "تأكيد الحجز",
];

interface Props {
  apartmentName: string;
  landlordName: string;
  features: string[];
  price: number;
  deposit: number;
  commission: number;
  taxes: number;
}

const paymentOptions = [
  { value: "bank", label: "بطاقة بنكية", icon: <CreditCard className="w-5 h-5" /> },
  { value: "vodafone", label: "فودافون كاش", icon: <Smartphone className="w-5 h-5" /> },
  { value: "etisalat", label: "اتصالات كاش", icon: <Smartphone className="w-5 h-5" /> },
  { value: "orange", label: "أورنج كاش", icon: <Smartphone className="w-5 h-5" /> },
];

const termOptions = [
  { value: "term1", label: "ترم 1 (4 شهور)", duration: "4 أشهر", price: "4 x شهر" },
  { value: "term2", label: "ترم 2 (4 شهور)", duration: "4 أشهر", price: "4 x شهر" },
  { value: "year", label: "ترمين (8 شهور)", duration: "8 أشهر", price: "8 x شهر", popular: true },
];

const ApartmentBookingForm: React.FC<Props> = ({
  apartmentName = "شقة مفروشة بجامعة الأزهر",
  landlordName = "أحمد محمد",
  features = ["مفروشة بالكامل", "انترنت مجاني", "تكييف", "قريب من الجامعة"],
  price = 2500,
  deposit = 5000,
  commission = 250,
  taxes = 150,
}) => {
  const [step, setStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [term, setTerm] = useState("");
  const [holdMoney, setHoldMoney] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [paymentInputs, setPaymentInputs] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    phone: "",
    discount: "",
  });

  const validate = () => {
    let err: any = {};
    if (step === 2 && !paymentMethod) err.paymentMethod = "اختر طريقة الدفع";
    if (step === 3 && !term) err.term = "اختر مدة الحجز";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleNext = () => {
    if (validate()) setStep((s) => s + 1);
  };

  const handlePrev = () => setStep((s) => Math.max(s - 1, 0));

  const total = price + deposit + commission + taxes;

  return (
    <div className="w-full bg-gray-50 flex justify-center py-8 px-4">
    <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: BRAND_BLUE, fontFamily: "Tajawal, Arial" }}
          >
            حجز الشقة
          </h1>
          <p className="text-gray-600">أكمل البيانات التالية لإتمام عملية الحجز</p>
        </div>

        {/* Progress Bar */}
        <div
          className="mb-8 bg-white rounded-2xl shadow-sm p-6"
          style={{ direction: "rtl" }}
        >
          <div className="flex items-center justify-between mb-4">
            {steps.map((label, idx) => (
              <React.Fragment key={idx}>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      idx <= step ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {idx < step ? <CheckCircle className="w-6 h-6" /> : idx + 1}
                  </div>
                  <span
                    className={`text-xs mt-2 font-medium ${
                      idx <= step ? "text-blue-600" : "text-gray-400"
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded-full ${
                      idx < step ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <div
          className="bg-white rounded-2xl shadow-xl overflow-hidden w-full"
          style={{ fontFamily: "Tajawal, Arial", direction: "rtl" }}
        >
          <div className="p-8">
            {/* Step 0 */}
            {step === 0 && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
                  معلومات الحجز
                </h2>
                <p className="mb-6 text-gray-500">تأكد من صحة المعلومات قبل المتابعة</p>
                <div className="grid gap-3">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">اسم الشقة</span>
                    <p className="font-bold">{apartmentName}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">اسم المالك</span>
                    <p className="font-bold">{landlordName}</p>
                  </div>
                </div>
                <h3 className="mt-6 font-bold">المميزات المتاحة</h3>
                <ul className="grid grid-cols-2 gap-2 mt-2">
                  {features.map((f, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Step 1 */}
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
                  التفاصيل المالية
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <p>الإيجار الشهري: <b>{price} جنيه</b></p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p>التأمين: <b>{deposit} جنيه</b></p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p>الضرائب: <b>{taxes} جنيه</b></p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <p>عمولة الموقع: <b>{commission} جنيه</b></p>
                  </div>
                </div>
                <div className="mt-4 text-center font-bold text-lg">
                  الإجمالي: {total} جنيه
                </div>
              </div>
            )}

            {/* Step 2 */}
            {step === 2 && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
                  طرق الدفع
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {paymentOptions.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setPaymentMethod(opt.value)}
                      className={`p-4 border rounded-lg flex flex-col items-center ${
                        paymentMethod === opt.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      {opt.icon}
                      <span>{opt.label}</span>
                    </button>
                  ))}
                </div>

                {/* Payment Inputs */}
                {paymentMethod === "bank" && (
                  <div className="mt-6 grid gap-3">
                    <input
                      type="text"
                      placeholder="رقم البطاقة"
                      className="border p-2 rounded-lg"
                      value={paymentInputs.cardNumber}
                      onChange={(e) =>
                        setPaymentInputs({ ...paymentInputs, cardNumber: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="تاريخ الانتهاء MM/YY"
                      className="border p-2 rounded-lg"
                      value={paymentInputs.expiry}
                      onChange={(e) =>
                        setPaymentInputs({ ...paymentInputs, expiry: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      className="border p-2 rounded-lg"
                      value={paymentInputs.cvv}
                      onChange={(e) =>
                        setPaymentInputs({ ...paymentInputs, cvv: e.target.value })
                      }
                    />
                  </div>
                )}
                {["vodafone", "etisalat", "orange"].includes(paymentMethod) && (
                  <div className="mt-6 grid gap-3">
                    <input
                      type="text"
                      placeholder="رقم الموبايل"
                      className="border p-2 rounded-lg"
                      value={paymentInputs.phone}
                      onChange={(e) =>
                        setPaymentInputs({ ...paymentInputs, phone: e.target.value })
                      }
                    />
                    <input
                      type="text"
                      placeholder="كود الخصم (اختياري)"
                      className="border p-2 rounded-lg"
                      value={paymentInputs.discount}
                      onChange={(e) =>
                        setPaymentInputs({ ...paymentInputs, discount: e.target.value })
                      }
                    />
                  </div>
                )}

                {errors.paymentMethod && (
                  <p className="text-red-500 mt-3">{errors.paymentMethod}</p>
                )}
              </div>
            )}

            {/* Step 3 */}
            {step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-4" style={{ color: BRAND_BLUE }}>
                  اختر مدة الحجز
                </h2>
                <div className="grid gap-3">
                  {termOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        term === opt.value ? "border-green-500 bg-green-50" : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="term"
                        value={opt.value}
                        checked={term === opt.value}
                        onChange={() => setTerm(opt.value)}
                        className="mr-2"
                      />
                      {opt.label} – {opt.duration}
                    </label>
                  ))}
                </div>
                <label className="flex items-center gap-2 mt-4">
                  <input
                    type="checkbox"
                    checked={holdMoney}
                    onChange={() => setHoldMoney(!holdMoney)}
                  />
                  احتجاز المبلغ في الموقع
                </label>
                {errors.term && <p className="text-red-500">{errors.term}</p>}
              </div>
            )}

            {/* Step 4 */}
            {step === 4 && (
              <div className="text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold my-4" style={{ color: BRAND_GREEN }}>
                  تم تأكيد الحجز بنجاح!
                </h2>
                <p className="text-gray-600">سيتم التواصل معك قريبًا</p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              {step > 0 && step < steps.length && (
                <button
                  type="button"
                  onClick={handlePrev}
                  className="flex items-center gap-2 px-6 py-2 border rounded-lg text-gray-700 border-gray-300"
                >
                  <ArrowRight className="w-4 h-4" /> السابق
                </button>
              )}
              {step < steps.length - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg text-white"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  التالي <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApartmentBookingForm;
