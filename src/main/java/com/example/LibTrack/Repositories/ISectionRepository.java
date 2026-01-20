package com.example.LibTrack.Repositories;

import com.example.LibTrack.entities.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISectionRepository extends JpaRepository<Section,Long>{

}
