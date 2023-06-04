import org.bson.types.ObjectId;

public class Book {
    private String id;
    private String name;
    private String authorId;

    public Book() {
    }

    public Book(String id, String name, String authorId) {
        this.id = id;
        this.name = name;
        this.authorId = authorId;
    }

    public Book(String name, String authorId) {
        this.name = name;
        this.authorId = authorId;
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
}
