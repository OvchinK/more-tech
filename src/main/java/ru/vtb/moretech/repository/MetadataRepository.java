package ru.vtb.moretech.repository;

import org.springframework.stereotype.Repository;
import ru.vtb.moretech.model.metadata.DatasetMetadata;
import ru.vtb.moretech.repository.mock.DatahubMock;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MetadataRepository {

    private final Map<String, List<DatasetMetadata>> sessions;
    private final DatahubMock data;

    public MetadataRepository(DatahubMock data) {
        this.data = data;
        sessions = new HashMap<>();
    }

    public List<DatasetMetadata> getAllMetadata(String sessionKey) {
        fillIfEmpty(sessionKey);
        return new ArrayList<>(sessions.get(sessionKey));
    }

    public List<DatasetMetadata> saveMetadata(String sessionKey, List<DatasetMetadata> datasetMetadata) {
        return sessions.put(sessionKey, datasetMetadata);
    }

    private void fillIfEmpty(String sessionKey) {
        sessions.computeIfAbsent(sessionKey, k -> data.getMetadata());
    }

}
