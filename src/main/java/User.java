import java.util.ArrayList;
import java.util.List;

public class User {
    private String id;
    private String name;
    private List<String> booksRead;
    private String favoriteBook;

    public User() {
    }

    public User(String id, String name, List<String> booksRead, String favoriteBook) {
        this.id = id;
        this.name = name;
        this.booksRead = booksRead;
        this.favoriteBook = favoriteBook;
    }

    public User(String id, String name) {
        this.id = id;
        this.name = name;
        this.booksRead = new ArrayList<>();
        this.favoriteBook = null;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public List<String> getBooksRead() {
        return booksRead;
    }

    public String getFavoriteBook() {
        return favoriteBook;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setBooksRead(List<String> booksRead) {
        this.booksRead = booksRead;
    }

    public void setFavoriteBook(String favoriteBook) {
        this.favoriteBook = favoriteBook;
    }
}
