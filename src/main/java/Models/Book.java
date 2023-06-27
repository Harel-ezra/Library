package Models;

import java.util.ArrayList;
import java.util.List;

public class Book {
    private String id;
    private String name;
    private String authorId;
    private List<String> readers;

    public Book() {
    }

    public Book(String id, String name, String authorId, List<String> readers) {
        this.id = id;
        this.name = name;
        this.authorId = authorId;
        this.readers = readers;
    }

    public Book(String id, String name, String authorId) {
        this.id = id;
        this.name = name;
        this.authorId = authorId;
        this.readers = new ArrayList<>();
    }


    public Book(String name, String authorId) {
        this.name = name;
        this.authorId = authorId;
        this.readers = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAuthorId() {
        return authorId;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAuthorId(String authorId) {
        this.authorId = authorId;
    }

    public void setReaders(List<String> readers) {
        this.readers = readers;
    }

    public List<String> getReaders() {
        return readers;
    }

}
