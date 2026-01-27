import {
  Wifi,
  Wind,
  VenetianMask,
  Warehouse,
  CookingPot,
  Flame,
  MapPin,
} from "lucide-react";

export const API_URL = `https://web-production-33f69.up.railway.app`;

export const features = [
  { id: "has_wifi", label: "واي فاي", icon: <Wifi size={24} /> },
  { id: "has_ac", label: "تكييف", icon: <Wind size={24} /> },
  { id: "has_balcony", label: "بلكونة", icon: <VenetianMask size={24} /> },
  { id: "has_elevator", label: "مصعد", icon: <Warehouse size={24} /> },
  { id: "has_washing_machine", label: "غسالة", icon: <CookingPot size={24} /> },
  { id: "has_oven", label: "بوتجاز/فرن", icon: <CookingPot size={24} /> },
  { id: "has_gas", label: "غاز طبيعي", icon: <Flame size={24} /> },
  {
    id: "near_transport",
    label: "قريب من المواصلات",
    icon: <MapPin size={24} />,
  },
];

export const checklistOptions = [
  "قريب من الجامعة",
  "مسموح التدخين",
  "غرف واسعة",
  "هدوء في المكان",
  "قريب من الخدمات",
];

export const steps = [
  {
    number: 1,
    title: "المعلومات الأساسية",
    tip: "استخدم عنوانًا جذابًا ووصفًا دقيقًا لجذب المستأجرين.",
  },
  {
    number: 2,
    title: "تفاصيل العقار",
    tip: "التفاصيل الدقيقة مثل عدد الغرف والمساحة تساعد الطلاب في اتخاذ قرارهم بشكل أسرع.",
  },
  {
    number: 3,
    title: "المميزات والصور",
    tip: "الصور عالية الجودة تزيد من فرص تأجير شقتك بنسبة كبيرة. أضف 5 صور على الأقل.",
  },
];

export type FormDataType = {
  title: string;
  description: string;
  address: string;
  price: string;
  rooms: string;
  bathrooms: string;
  kitchens: string;
  total_beds: string;
  available_beds: string;
  residence_type: string;
  whatsapp_number: string;
  neighborhood_id: string;
  area: string;
  floor_number: string;
  has_elevator: boolean;
  has_wifi: boolean;
  has_ac: boolean;
  has_balcony: boolean;
  has_washing_machine: boolean;
  has_oven: boolean;
  has_gas: boolean;
  near_transport: boolean;
  owner_notes: string;
  preferred_tenant_type: string;
};