package com.dashboard;

import com.dashboard.model.Project;
import com.dashboard.repository.ProjectRepository;
import com.dashboard.service.ProjectService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

class ProjectServiceTest {

    @Mock
    private ProjectRepository projectRepository;

    @InjectMocks
    private ProjectService projectService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllProjects() {
        Project p1 = new Project(1L, "Proj1", "Client1", "Active", LocalDate.now(), 50);
        Project p2 = new Project(2L, "Proj2", "Client2", "Completed", LocalDate.now(), 100);
        when(projectRepository.findAll()).thenReturn(Arrays.asList(p1, p2));

        List<Project> result = projectService.getAllProjects();
        assertEquals(2, result.size());
        verify(projectRepository, times(1)).findAll();
    }

    @Test
    void testGetProjectById() {
        Project p1 = new Project(1L, "Proj1", "Client1", "Active", LocalDate.now(), 50);
        when(projectRepository.findById(1L)).thenReturn(Optional.of(p1));

        Project result = projectService.getProjectById(1L);
        assertNotNull(result);
        assertEquals("Proj1", result.getName());
    }

    @Test
    void testSaveProject() {
        Project p1 = new Project(null, "Proj1", "Client1", "Active", LocalDate.now(), 50);
        Project savedP1 = new Project(1L, "Proj1", "Client1", "Active", LocalDate.now(), 50);

        when(projectRepository.save(any(Project.class))).thenReturn(savedP1);

        Project result = projectService.saveProject(p1);
        assertNotNull(result.getId());
        assertEquals(1L, result.getId());
    }
}
