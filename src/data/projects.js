// src/data/projects.js
// This file acts like a mock API response from Spring Boot backend
// In a real app: fetch('http://localhost:8080/api/projects')

const projects = [
  { id: 1, name: 'ERP Migration', client: 'TechCorp Ltd', status: 'Active', deadline: '30 Jun 2026', pct: 65 },
  { id: 2, name: 'Portal Redesign', client: 'FinanceHub', status: 'Active', deadline: '15 May 2026', pct: 40 },
  { id: 3, name: 'Cloud Setup', client: 'RetailMax', status: 'On Hold', deadline: '01 Aug 2026', pct: 20 },
  { id: 4, name: 'Mobile App', client: 'StartupXYZ', status: 'Completed', deadline: '01 Mar 2026', pct: 100 },
  { id: 5, name: 'Data Warehouse', client: 'BankGroup', status: 'Active', deadline: '01 Sep 2026', pct: 55 },
  { id: 6, name: 'Security Audit', client: 'GovDept', status: 'On Hold', deadline: '15 Jul 2026', pct: 10 },
  { id: 7, name: 'CRM Integration', client: 'SalesForce Co', status: 'Completed', deadline: '20 Feb 2026', pct: 100 },
  { id: 8, name: 'DevOps Automation', client: 'CloudNine Ltd', status: 'Active', deadline: '10 Oct 2026', pct: 30 },
  { id: 9, name: 'Web App', client: 'Team-X', status: 'Completed', deadline: '10 Mar 2026', pct: 45 }
]

export default projects
