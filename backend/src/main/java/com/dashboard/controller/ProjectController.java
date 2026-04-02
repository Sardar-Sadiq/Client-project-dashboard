package com.dashboard.controller;

import com.dashboard.model.Project;
import com.dashboard.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = { "http://localhost:5173", "http://localhost:3000", "http://localhost:4200" })
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable Long id) {
        Project project = projectService.getProjectById(id);
        if (project != null) {
            return ResponseEntity.ok(project);
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public Project createProject(@RequestBody Project project) {
        return projectService.saveProject(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable Long id, @RequestBody Project projectDetails) {
        Project project = projectService.getProjectById(id);
        if (project != null) {
            project.setName(projectDetails.getName());
            project.setClientName(projectDetails.getClientName());
            project.setStatus(projectDetails.getStatus());
            project.setDeadline(projectDetails.getDeadline());
            project.setCompletionPercent(projectDetails.getCompletionPercent());
            return ResponseEntity.ok(projectService.saveProject(project));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable Long id) {
        Project project = projectService.getProjectById(id);
        if (project != null) {
            projectService.deleteProject(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
