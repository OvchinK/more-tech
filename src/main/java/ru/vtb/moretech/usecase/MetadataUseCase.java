package ru.vtb.moretech.usecase;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import ru.vtb.moretech.model.metadata.DatasetMetadata;
import ru.vtb.moretech.repository.MetadataRepository;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class MetadataUseCase {
    private final MetadataRepository repo;

    public List<DatasetMetadata> getAllMetadata(String sessionKey) {
        return repo.getAllMetadata(sessionKey);
    }

}
