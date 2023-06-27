package DALs;

import Models.Book;
import Models.User;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import java.util.ArrayList;
import static DALs.DALConnections.*;

public class UserDAL {

    public static ArrayList<User> addUser(String userId, String userName) {
        userCollection.insertOne(new User(userId, userName));
        return getAllUsers();
    }

    public static ArrayList<User> removeUser(String userId) {
        userCollection.deleteOne(new Document("_id", userId));
        return getAllUsers();
    }

    public static ArrayList<User> renameUser(String userId, String newName) {
        userCollection.updateOne(
                new Document("_id", userId),
                Updates.set("name", newName));
        return getAllUsers();
    }

    public static String updateFavoriteBook(String userId, String bookId) {
        Book book = getFavoriteBook(userId);

        if (book == null || !book.getId().equals(bookId)) {
            userCollection.updateOne(
                    new Document("_id", userId),
                    new Document("$set", new Document("favoriteBook", bookId))
            );
        } else {
            userCollection.updateOne(
                    new Document("_id", userId),
                    new Document("$unset", new Document("favoriteBook", 1))
            );
        }
        return "ok";
    }

    public static Book getFavoriteBook(String userId) {

        String bookId = userCollection.find(new Document("_id", userId)).first().getFavoriteBook();
        return (bookId == "") ? null : booksCollection.find(new Document("_id", bookId)).projection(projectionNameAndId).first();
    }

    public static User getUser(String userId) {
        return userCollection.find(new Document("_id", userId)).first();
    }

    public static ArrayList<Book> addReadiedBook(String userId, String bookId) {
        booksCollection.updateOne(
                new Document("_id", bookId),
                new Document("$addToSet", new Document("readers", userId)));
        userCollection.updateOne(
                new Document("_id", userId),
                new Document("$addToSet", new Document("booksRead", bookId)));
        return getAllReadiedBooks(userId);
    }

    public static ArrayList<Book> removeReadiedBook(String userId, String bookId) {
        booksCollection.updateOne(
                new Document("_id", bookId),
                new Document("$pull", new Document("readers", userId)));
        userCollection.updateOne(
                new Document("_id", userId),
                new Document("$pull", new Document("booksRead", bookId)));

        return getAllReadiedBooks(userId);
    }
    public static ArrayList<Book> getAllReadiedBooks(String userId) {
        User user = userCollection.find(new Document("_id", userId)).first();
        ArrayList<Book> booksList = new ArrayList<>();
        for (String bookId : user.getBooksRead()) {
            booksList.add(booksCollection.find(new Document("_id", bookId)).projection(projectionNameAndId).first());
        }
        return booksList;
    }
    public static ArrayList<User> getAllUsers() {
        return userCollection.find(new Document()).projection(projectionNameAndId).into(new ArrayList<User>());
    }

}
