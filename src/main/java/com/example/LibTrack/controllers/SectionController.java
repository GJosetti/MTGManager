package com.example.LibTrack.controllers;

import com.example.LibTrack.entities.Section;
import com.example.LibTrack.services.SectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/section")
public class SectionController {

    SectionService service;

    public SectionController(SectionService service)
    {
        this.service = service;
    }

    @PostMapping("/create")
    public ResponseEntity create (@RequestBody Section data)
    {
        return service.create(data);
    }

    @PostMapping("/update")
    public ResponseEntity update (@RequestBody Section data)
    {
        return service.update(data);
    }

    @PostMapping("/delete")
    public ResponseEntity delete (@RequestBody Long data)
    {
        return service.delete(data);
    }
    @GetMapping("/list")
    public List<Section> listAll()
    {
        return service.listAll();
    }

}
