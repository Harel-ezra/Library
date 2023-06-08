
import java.util.ArrayList;
import java.util.List;

public class Author {
    private String id;
    private String name;
    private List<String> books;

    public Author(){}

    public Author(String id, String name, List<String> books) {
        this.id = id;
        this.name = name;
        this.books = books;
    }

    public Author(String id, String name) {
        this.id=id;
        this.name=name;
        this.books=new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getBooks() {
        return books;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBooks(List<String> books) {
        this.books = books;
    }
}
