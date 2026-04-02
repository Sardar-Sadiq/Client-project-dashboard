// src/components/ProjectCard.jsx
// Shows one project as a card with: name, client, status badge, progress bar, deadline
// Props:
//   project  - one project object from projects.js
//   onRemove - function called when Remove button is clicked

// Helper: returns Tailwind classes based on status
function getStatusStyle(status) {
  if (status === 'Active')    return { pill: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', bar: 'bg-emerald-400', top: 'bg-emerald-400' }
  if (status === 'On Hold')   return { pill: 'bg-amber-500/15  text-amber-400  border-amber-500/25',  bar: 'bg-amber-400',  top: 'bg-amber-400'  }
  if (status === 'Completed') return { pill: 'bg-blue-500/15   text-blue-400   border-blue-500/25',   bar: 'bg-blue-400',   top: 'bg-blue-400'   }
  return { pill: '', bar: 'bg-gray-400', top: 'bg-gray-400' }
}

export default function ProjectCard({ project, onRemove }) {
  const style = getStatusStyle(project.status)

  return (
    <div className="group bg-[#14171f] border border-white/[0.07] rounded-2xl p-5
                    hover:-translate-y-1 hover:border-white/15 hover:shadow-2xl
                    transition-all duration-200 relative overflow-hidden">

      {/* Coloured top accent line — appears on hover */}
      <div className={`absolute top-0 left-0 right-0 h-[3px] ${style.top} opacity-0 group-hover:opacity-100 transition-opacity`} />

      {/* Card header: project name + status badge */}
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-display font-bold text-base leading-tight pr-3">{project.name}</h3>
        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full border whitespace-nowrap ${style.pill}`}>
          {project.status}
        </span>
      </div>

      {/* Client name */}
      <p className="text-xs text-gray-500 mb-4">
        Client: <span className="text-gray-300 font-medium">{project.client}</span>
      </p>

      {/* Progress bar */}
      <div className="mb-1">
        <div className="flex justify-between text-[11px] text-gray-500 mb-1.5">
          <span>Progress</span>
          <span className="text-white font-medium">{project.pct}%</span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${style.bar}`}
            style={{ width: `${project.pct}%` }}
          />
        </div>
      </div>

      {/* Footer: deadline + remove button */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/[0.06]">
        <p className="text-[11px] text-gray-500">
          Due: <span className="text-gray-300 font-medium">{project.deadline}</span>
        </p>
        <button
          onClick={() => onRemove(project.id)}
          className="text-[11px] text-gray-600 border border-white/10 px-3 py-1 rounded-md
                     hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
        >
          Remove
        </button>
      </div>
    </div>
  )
}
