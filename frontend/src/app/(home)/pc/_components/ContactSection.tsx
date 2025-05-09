import { Mail, Phone, MapPin } from "lucide-react";

type Props = {
  phone?: string;
  email?: string;
  location?: string;
};

export default function ContactSection({ phone, email, location }: Props) {
  return (
    <div className="space-y-4 p-4 border rounded-xl shadow bg-white">
      <h2 className="text-lg font-semibold">📞 Холбоо барих</h2>
      <div className="space-y-2 text-sm text-gray-700">
        {phone && (
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 stroke-[1.5]" />
            <span>{phone}</span>
          </div>
        )}
        {email && (
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 stroke-[1.5]" />
            <span>{email}</span>
          </div>
        )}
        {location && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 stroke-[1.5] mt-0.5" />
            <span>{location}</span>
          </div>
        )}
      </div>
    </div>
  );
}
