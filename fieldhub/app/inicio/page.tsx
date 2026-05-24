"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Label, Wordmark } from "@/components/ui/shared";
import DeviceCard from "@/components/features/DeviceCard";
import IrrigationButton from "@/components/features/IrrigationButton";
import SensorGrid from "@/components/features/SensorGrid";

export default function InicioPage() {
  const [irrigating, setIrrigating] = useState(false);
  const toggleIrrigating = () => setIrrigating((prev) => !prev);
  const router = useRouter();

  return (
    <div className="max-w-[402px] lg:max-w-2xl mx-auto pt-2">

      <div className="px-[22px] pt-2 flex justify-between items-center">
        <Wordmark s={20} />
        <button className="bg-white/[0.04] border-0 w-9 h-9 rounded-[18px] grid place-items-center cursor-pointer">
          <Bell size={16} color="#a3a3a3" />
        </button>
      </div>

      <div className="px-[22px] pt-6">
        <Label>BOM DIA</Label>
        <div className="text-[30px] font-semibold tracking-[-1px] mt-1.5 text-fg">
          Sua lavoura<br />está no controle.
        </div>
      </div>

      <DeviceCard irrigating={irrigating} onConfigure={() => router.push("/perfil")} />
      <IrrigationButton irrigating={irrigating} onClick={toggleIrrigating} />
      <SensorGrid irrigating={irrigating} />

      <div className="h-2" />
    </div>
  );
}
