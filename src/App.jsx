// src/App.jsx
// ─────────────────────────────────────────────
// ROOT COMPONENT — this is the brain of the app
// It holds state and passes data down to child components
// ─────────────────────────────────────────────

import { useState } from 'react'
import projectsData from './data/projects.js'
import StatCard from './components/StatCard.jsx'
import FilterBar from './components/FilterBar.jsx'
import ProjectCard from './components/ProjectCard.jsx'

export default function App() {

  // useState — React hook that holds data which can change
  const [projects, setProjects] = useState(projectsData)   // full list
  const [filter, setFilter] = useState('All')           // active filter
  const [search, setSearch] = useState('')              // search text
  // p is an object with the following properties:
  // p: {
  //   id: INT,
  //   name: STRING,
  //   client: STRING,
  //   status: STRING,
  //   deadline: STRING,
  //   pct: INT
  // }
  // ── DERIVED VALUES (calculated from state, not stored separately) ──
  const total = projects.length
  const active = projects.filter(p => p.status === 'Active').length
  const onHold = projects.filter(p => p.status === 'On Hold').length
  const completed = projects.filter(p => p.status === 'Completed').length

  // Filtered + searched list shown in the grid

  const visible = projects
    .filter(p => filter === 'All' || p.status === filter)
    .filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.client.toLowerCase().includes(search.toLowerCase())
    )

  // ── REMOVE PROJECT ──
  // Uses filter to create a new array without the removed item
  function handleRemove(id) {
    setProjects(prev => prev.filter(p => p.id !== id))
  }

  // ── JSX RENDER ──
  return (
    <div className="min-h-screen bg-[#0b0d12]">

      {/* Background grid pattern */}
      <div className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(79,142,247,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(79,142,247,0.03) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16">

        {/* ── HEADER ── */}
        <header className="flex items-center justify-between py-7 border-b border-white/[0.07] mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-500
                            flex items-center justify-center font-display font-bold text-sm text-white">
              CP
            </div>
            <span className="font-display font-bold text-lg tracking-tight">
              Client<span className="text-blue-400 animate-pulse">Pulse</span>
            </span>
          </div>

        </header>

        {/* ── STATS ROW ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <StatCard label="Total projects" value={total} color="text-blue-400" />
          <StatCard label="Active" value={active} color="text-emerald-400" />
          <StatCard label="On hold" value={onHold} color="text-amber-400" />
          <StatCard label="Completed" value={completed} color="text-violet-400" />
        </div>

        {/* ── FILTER + SEARCH ── */}
        <FilterBar
          current={filter}
          onChange={setFilter}
          search={search}
          onSearch={setSearch}
        />

        {/* ── PROJECT CARDS GRID ── */}
        {visible.length === 0 ? (
          <div className="text-center py-20 text-gray-600">No projects found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {visible.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}



      </div>
    </div>
  )
}
