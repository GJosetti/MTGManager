package com.example.LibTrack.interfaces;

import com.example.LibTrack.entities.Section;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ISectionService {

    public ResponseEntity create(Section section);

    public ResponseEntity update(Section section);

    public ResponseEntity delete(Long id);

    public List<Section> listAll();
}
