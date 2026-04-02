export interface Project {
    id: number;
    name: string;
    clientName: string;
    status: 'Active' | 'On Hold' | 'Completed';
    deadline: string;
    completionPercent: number;
}
