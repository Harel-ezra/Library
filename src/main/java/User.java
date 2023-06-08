import java.util.ArrayList;
import java.util.List;

public class User {
    private String id;
    private String name;
    private List<String> booksRead;
    private String favoriteBookId;

    public User() {
    }

    public User(String id, String name, List<String> booksRead, String favoriteBookId) {
        this.id = id;
        this.name = name;
        this.booksRead = booksRead;
        this.favoriteBookId = favoriteBookId;
    }

    public User(String id, String name) {
        this.id = id;
        this.name = name;
        this.booksRead = new ArrayList<>();
        this.favoriteBookId = null;
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

    public String getFavoriteBookId() {
        return favoriteBookId;
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

    public void setFavoriteBookId(String favoriteBookId) {
        this.favoriteBookId = favoriteBookId;
    }

//    @Override
//    public String toString()
//    {
//        return "id:"+this.id.toString()+
//                ", name:"+this.name+
//                ", booksRead:"+ this.booksRead.toString()+
//                ", favoriteBook:"+ this.favoriteBookId.toString();
//    }
}
