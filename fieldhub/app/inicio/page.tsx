import IrrigationBadge from "../../components/IrrigationBadge";
import SensorCard from "../../components/SensorCard";

export default function InicioPage() {
  const humidityHistory = [42, 55, 48, 62, 68, 58, 72];

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col gap-6 px-4 py-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-400">
            Monitoramento inteligente agrícola
          </p>

          <h1 className="mt-1 text-4xl font-black tracking-tight text-white">
            FieldHub
          </h1>

          <p className="mt-1 text-xs text-zinc-500">
            Sistema online • última leitura há 2 min
          </p>
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#22c55e]/20 text-2xl shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.05]">
          🌱
        </div>
      </header>

      <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-linear-to-br from-[#18181b] to-[#09090b] p-6 shadow-2xl shadow-black/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/10">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#22c55e]/20 blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-400">Dispositivo Ativo</p>

              <h2 className="mt-2 text-3xl font-black text-white">
                Irrigador Solar
              </h2>
            </div>

            <IrrigationBadge status="ON" />
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-green-500/10">
              <p className="text-sm text-zinc-400">Geração Solar</p>

              <h3 className="mt-2 text-3xl font-black text-[#22c55e]">
                420W
              </h3>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-green-500/10">
              <p className="text-sm text-zinc-400">Status</p>

              <h3 className="mt-2 text-3xl font-black text-white">ON</h3>
            </div>
          </div>

          <button className="mt-8 w-full rounded-3xl bg-[#22c55e] px-5 py-4 text-lg font-black text-black shadow-xl shadow-green-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-[#4ade80] hover:shadow-green-500/50 active:scale-[0.98]">
            Ligar Irrigador
          </button>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-green-500/10">
          <p className="text-lg">💧</p>
          <p className="mt-2 text-xs text-zinc-400">Umidade</p>
          <h3 className="text-2xl font-black text-white">56%</h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-green-500/10">
          <p className="text-lg">🌡️</p>
          <p className="mt-2 text-xs text-zinc-400">Temp.</p>
          <h3 className="text-2xl font-black text-white">26°C</h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-green-500/10">
          <p className="text-lg">☀️</p>
          <p className="mt-2 text-xs text-zinc-400">Solar</p>
          <h3 className="text-2xl font-black text-white">420W</h3>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-3">
        <div className="rounded-3xl border border-white/10 bg-[#111111]/80 p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-green-500/10">
          <p className="text-lg">🌊</p>
          <p className="mt-3 text-sm text-zinc-400">Água economizada</p>
          <h3 className="mt-1 text-3xl font-black text-white">32L</h3>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#111111]/80 p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-green-500/10">
          <p className="text-lg">🔋</p>
          <p className="mt-3 text-sm text-zinc-400">Autonomia</p>
          <h3 className="mt-1 text-3xl font-black text-white">8h</h3>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-[#111111]/80 p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/10">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">Umidade</h2>
            <p className="text-sm text-zinc-400">Histórico simulado</p>
          </div>

          <span className="rounded-full bg-[#22c55e]/15 px-4 py-2 text-xs font-black text-[#22c55e]">
            7 dias
          </span>
        </div>

        <div className="flex h-40 items-end gap-3 rounded-2xl bg-black/20 p-3">
          {humidityHistory.map((value) => (
            <div
              key={value}
              className="flex h-full flex-1 flex-col items-center justify-end gap-2"
            >
              <div
                className="w-full rounded-t-2xl bg-[#22c55e] shadow-lg shadow-green-500/30 transition-all duration-300 hover:scale-105 hover:bg-[#4ade80]"
                style={{ height: `${value}%` }}
              />

              <span className="text-[10px] text-zinc-500">
                {value}%
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[28px] border border-yellow-500/20 bg-yellow-500/10 p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-yellow-500/10">
        <div className="flex gap-3">
          <span className="text-2xl">⚠️</span>

          <div>
            <h2 className="text-lg font-black text-yellow-300">
              Alerta do sistema
            </h2>

            <p className="mt-1 text-sm text-yellow-100/80">
              Lote Sul está com umidade abaixo do ideal. Recomenda-se nova
              irrigação nas próximas horas.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-[28px] border border-white/10 bg-[#111111]/80 p-5 shadow-xl shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-green-500/10">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">
              Próximas ações
            </h2>

            <p className="text-sm text-zinc-400">
              Programação automática
            </p>
          </div>

          <span className="text-2xl">⏱️</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between rounded-2xl bg-black/30 p-4 transition-all duration-300 hover:bg-black/40 hover:translate-x-1">
            <div>
              <p className="font-bold text-white">Irrigação automática</p>
              <p className="text-xs text-zinc-500">06:30</p>
            </div>

            <span className="text-xs font-bold text-zinc-400">18 min</span>
          </div>

          <div className="flex items-center justify-between rounded-2xl bg-black/30 p-4 transition-all duration-300 hover:bg-black/40 hover:translate-x-1">
            <div>
              <p className="font-bold text-white">Leitura dos sensores</p>
              <p className="text-xs text-zinc-500">12:10</p>
            </div>

            <span className="text-xs font-bold text-zinc-400">2 min</span>
          </div>
        </div>
      </section>

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-white">Sensores</h2>

          <p className="text-sm text-zinc-400">
            Monitoramento em tempo real
          </p>
        </div>

        <span className="rounded-full bg-[#22c55e]/15 px-4 py-2 text-xs font-black text-[#22c55e]">
          ONLINE
        </span>
      </div>

      <SensorCard name="Lote Norte" humidity={68} temperature={27} status="ON" />
      <SensorCard name="Lote Sul" humidity={45} temperature={25} status="OFF" />
    </div>
  );
}