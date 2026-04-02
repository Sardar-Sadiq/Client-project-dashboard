import React, { useEffect, useState } from 'react';
import { Project } from '../types/Project';
import { projectService } from '../services/api';
import { Trash2, AlertCircle, CheckCircle2, Clock, Briefcase, Calendar } from 'lucide-react';

export default function Dashboard() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [filter, setFilter] = useState<string>('All');

    useEffect(() => {
        loadProjects();
    }, []);

    const loadProjects = async () => {
        try {
            const data = await projectService.getAllProjects();
            setProjects(data);
        } catch (error) {
            console.error('Failed to load projects', error);
        }
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this project?')) {
            try {
                await projectService.deleteProject(id);
                setProjects(projects.filter(p => p.id !== id));
            } catch (error) {
                console.error('Failed to delete project', error);
            }
        }
    };

    const filteredProjects = filter === 'All'
        ? projects
        : projects.filter(p => p.status === filter);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Active': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'On Hold': return 'bg-amber-100 text-amber-800 border-amber-200';
            case 'Completed': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Active': return <Clock className="w-4 h-4 mr-1" />;
            case 'On Hold': return <AlertCircle className="w-4 h-4 mr-1" />;
            case 'Completed': return <CheckCircle2 className="w-4 h-4 mr-1" />;
            default: return null;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Client Projects</h1>
                    <p className="mt-1 text-sm text-gray-500">Manage and track your consultancy engagements.</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-gray-200">
                    {['All', 'Active', 'On Hold', 'Completed'].map(status => (
                        <button
                            key={status}
                            onClick={() => setFilter(status)}
                            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${filter === status
                                    ? 'bg-blue-600 text-white shadow'
                                    : 'text-gray-600 hover:bg-gray-50'
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {filteredProjects.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
                    <Briefcase className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-semibold text-gray-900">No projects found</h3>
                    <p className="mt-1 text-sm text-gray-500">No projects match the current filter.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProjects.map(project => (
                        <div key={project.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200 flex flex-col">
                            <div className="p-6 flex-grow">
                                <div className="flex justify-between items-start mb-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
                                        {getStatusIcon(project.status)}
                                        {project.status}
                                    </span>
                                    <button
                                        onClick={() => handleDelete(project.id)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                        title="Delete Project"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                                <div className="flex items-center text-sm text-gray-600 mb-4">
                                    <Briefcase className="w-4 h-4 mr-1.5 text-gray-400" />
                                    {project.clientName}
                                </div>

                                <div className="flex items-center text-sm text-gray-600 mb-6">
                                    <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                                    Deadline: <span className="ml-1 font-medium text-gray-900">{new Date(project.deadline).toLocaleDateString()}</span>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-1.5">
                                        <span className="text-sm font-medium text-gray-700">Progress</span>
                                        <span className="text-sm font-bold text-gray-900">{project.completionPercent}%</span>
                                    </div>
                                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                                        <div
                                            className={`h-2.5 rounded-full ${project.status === 'Completed' ? 'bg-emerald-500' :
                                                    project.status === 'On Hold' ? 'bg-amber-500' : 'bg-blue-600'
                                                }`}
                                            style={{ width: `${project.completionPercent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
