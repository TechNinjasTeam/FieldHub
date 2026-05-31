type IrrigationBadgeProps = {
  status: "ON" | "OFF";
};

export default function IrrigationBadge({ status }: IrrigationBadgeProps) {
  const isOn = status === "ON";

  return (
    <div className="flex items-center gap-2">
      <span
        className={`h-3 w-3 rounded-full ${
          isOn ? "bg-green-500 animate-pulse" : "bg-red-500"
        }`}
      />

      <span className={`text-sm font-bold ${isOn ? "text-green-400" : "text-red-400"}`}>
        {isOn ? "Irrigando..." : "Inativa"}
      </span>
    </div>
  );
}
