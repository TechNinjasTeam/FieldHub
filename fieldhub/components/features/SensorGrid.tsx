import { BigNum, Label } from "@/components/ui/shared";

type Props = {
  irrigating: boolean;
};

const STATIC_SENSORS = [
  { label: "UMIDADE", val: "64", u: "%" },
  { label: "TEMP", val: "24.2", u: "°C" },
  { label: "GERAÇÃO", val: "8.4", u: "kWh" },
];

export default function SensorGrid({ irrigating }: Props) {
  const sensors = [
    ...STATIC_SENSORS,
    { label: "VAZÃO", val: irrigating ? "14.2" : "0", u: "m³/h", highlight: irrigating },
  ];

  return (
    <div className="px-[22px] pt-5">
      <div className="grid grid-cols-2 gap-[10px]">
        {sensors.map((card) => (
          <div key={card.label} className="bg-surface border border-white/[0.05] rounded-[14px] p-4">
            <Label>{card.label}</Label>
            <BigNum n={card.val} unit={card.u} size={32} unitSize={13} color={card.highlight ? "#22c55e" : "#fafafa"} />
          </div>
        ))}
      </div>
    </div>
  );
}
