package com.example.LibTrack.services;

import com.example.LibTrack.Repositories.ISectionRepository;
import com.example.LibTrack.entities.Section;
import com.example.LibTrack.interfaces.ISectionService;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService implements ISectionService {

    ISectionRepository repository;

    public SectionService(ISectionRepository repository)
    {
        this.repository = repository;
    }

    @Override
    public ResponseEntity create(Section section)
    {
        this.repository.save(section);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity update(Section section) {
        this.repository.save(section);
        return ResponseEntity.ok().build();
    }

    @Override
    public ResponseEntity delete(Long id) {
        Section section = this.repository.findById(id)
                .orElseThrow(()-> new RuntimeException("Usuário não encontrado"));

        this.repository.delete(section);
        return ResponseEntity.ok().build();
    }

    @Override
    public List<Section> listAll() {
        return this.repository.findAll();
    }

}
