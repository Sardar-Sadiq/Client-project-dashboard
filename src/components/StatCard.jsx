// src/components/StatCard.jsx
// A small reusable card that shows one number (total, active, etc.)
// Props: label (string), value (number), color (tailwind text color class)

export default function StatCard({ label, value, color }) {
  return (
    <div className="bg-[#14171f] border border-white/[0.07] rounded-2xl p-5 hover:border-blue-500/30 transition-colors">
      <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">{label}</p>
      <p className={`font-display text-4xl font-bold ${color}`}>{value}</p>
    </div>
  )
}
