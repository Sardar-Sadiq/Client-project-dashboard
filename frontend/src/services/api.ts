import axios from 'axios';
import { Project } from '../types/Project';

const API_URL = 'http://localhost:8080/api/projects';

export const projectService = {
    getAllProjects: async (): Promise<Project[]> => {
        const response = await axios.get(API_URL);
        return response.data;
    },

    deleteProject: async (id: number): Promise<void> => {
        await axios.delete(`${API_URL}/${id}`);
    }
};
