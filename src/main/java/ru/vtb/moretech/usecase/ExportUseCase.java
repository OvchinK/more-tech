package ru.vtb.moretech.usecase;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import ru.vtb.moretech.model.io.StreamHolder;
import ru.vtb.moretech.repository.OperationRepository;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class ExportUseCase {

    private final OperationRepository repo;

    public StreamHolder export(String sessionKey) {
        String opers = repo.exportOperations(sessionKey);
        InputStream targetStream = new ByteArrayInputStream(opers.getBytes());
        return new StreamHolder(targetStream, "operations-" + LocalDate.now() + ".txt");
    }

}
