package DALs;
import Models.Book;
import Models.User;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import java.util.ArrayList;
import static DALs.DALConnections.*;

public class BookDAL {
    public static ArrayList<Book> renameBook(String bookId, String newName) {
        booksCollection.updateOne(
                new Document("_id", bookId),
                Updates.set("name", newName));
        return getAllBooks();
    }
    public static ArrayList<Book> getAllBooks() {
        return booksCollection.find(new Document()).projection(projectionNameAndId).into(new ArrayList<Book>());
    }
    public static ArrayList<User> getAllBookReaders(String bookId) {
        return userCollection.find(new Document("booksRead", bookId)).projection(projectionNameAndId).into(new ArrayList<>());
    }
}
