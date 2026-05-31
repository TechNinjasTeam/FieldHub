import IrrigationBadge from "./IrrigationBadge";

type SensorCardProps = Readonly<{
  name: string;
  humidity: number;
  temperature: number;
  status: "ON" | "OFF";
}>;

export default function SensorCard(props: SensorCardProps) {
  const { name, humidity, temperature, status } = props;

  return (
    <div
  className="
    animate-[float_4s_ease-in-out_infinite]
    rounded-[28px]
    border border-white/10
    bg-linear-to-br
    from-[#18181b]
    to-[#101010]
    p-5
    shadow-xl shadow-black/30
    transition-all duration-300
    hover:-translate-y-2
    hover:shadow-green-500/10
  "
>
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-zinc-500">Sensor</p>
          <h3 className="text-2xl font-black text-white">{name}</h3>
        </div>

        <IrrigationBadge status={status} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-black/30 p-4">
          <p className="text-sm text-zinc-400">Umidade</p>
          <h4 className="mt-2 text-3xl font-black text-[#22c55e]">{humidity}%</h4>
        </div>

        <div className="rounded-2xl bg-black/30 p-4">
          <p className="text-sm text-zinc-400">Temperatura</p>
          <h4 className="mt-2 text-3xl font-black text-white">{temperature}°C</h4>
        </div>
      </div>
    </div>
  );
}
