// src/components/FilterBar.jsx
// Shows filter buttons (All / Active / On Hold / Completed) + search box
// Props:
//   current   - currently active filter string
//   onChange  - function called when a filter button is clicked
//   search    - current search string
//   onSearch  - function called when search input changes

const FILTERS = ['All', 'Active', 'On Hold', 'Completed']

export default function FilterBar({ current, onChange, search, onSearch }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(f => (
          <button
            key={f}
            onClick={() => onChange(f)}
            className={`px-4 py-1.5 rounded-full text-xs border transition-all
              ${current === f
                ? 'bg-blue-500 border-blue-500 text-white font-medium'
                : 'bg-[#14171f] border-white/10 text-gray-400 hover:border-blue-500/40 hover:text-white'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <input
        type="text"
        value={search}
        onChange={e => onSearch(e.target.value)}
        placeholder="Search project or client…"
        className="bg-[#14171f] border border-white/10 rounded-lg px-3 py-2 text-sm text-white
                   placeholder-gray-600 outline-none focus:border-blue-500/60 w-52 transition-colors"
      />
    </div>
  )
}
