import java.util.ArrayList;
import java.util.UUID;

public class BL {


    public static ArrayList<User> getAllUsers() {
        return DAL.getAllUsers();
    }

    public static ArrayList<Author> getAllAuthors() {
        return DAL.getAllAuthors();
    }

    public static ArrayList<Book> getAllBooks() {
        return DAL.getAllBooks();
    }

    public static ArrayList<Book> renameBook(String bookId, String newName) {
        return DAL.renameBook(bookId, newName);
    }

    public static ArrayList<User> addUser(String userName) {
        String userId = UUID.randomUUID().toString();
        return DAL.addUser(userId, userName);
    }

    public static ArrayList<User> removeUser(String userId) {
        return DAL.removeUser(userId);
    }

    public static ArrayList<User> renameUser(String userId, String newName) {
        return DAL.renameUser(userId, newName);
    }

    public static String updateFavoriteBook(String userId, String bookId) {
        return DAL.updateFavoriteBook(userId, bookId);
    }

    public static Book getFavoriteBook(String userId) {
        return DAL.getFavoriteBook(userId);
    }

    public static ArrayList<Book> addReadiedBook(String userId, String bookId) {
        return DAL.addReadiedBook(userId, bookId);
    }
    public static ArrayList<Book> removeReadiedBook(String userId, String bookId) {
        return DAL.removeReadiedBook(userId, bookId);
    }

    public static ArrayList<Author> addAuthor(String authorName) {
        String authorId = UUID.randomUUID().toString();
        return DAL.addAuthor(authorId, authorName);
    }

    public static ArrayList<Author> removeAuthor(String authorId) {
        return DAL.removeAuthor(authorId);

    }

    public static ArrayList<Author> renameAuthor(String authorId, String newName) {
        return DAL.renameAuthor(authorId, newName);

    }

    public static ArrayList<Book> addWrittenBook(String authorId, String bookName) {
        String bookId=UUID.randomUUID().toString();
        return DAL.addWrittenBook(authorId,bookId, bookName);
    }

    public static ArrayList<Book> removeWrittenBook(String authorId, String bookId) {
        return DAL.removeWrittenBook(authorId, bookId);
    }

    public static ArrayList<Book> getAllReadiedBooks(String userId) {
        return DAL.getAllReadiedBooks(userId);

    }

    public static ArrayList<Book> getAllWrittenBooks(String authorId) {
        return DAL.getAllWrittenBooks( authorId);

    }

    public static ArrayList<User> getAllBookReaders(String bookId) {
        return DAL.getAllBookReaders( bookId);
    }

    public static User getUser(String userId) {
        return DAL.getUser( userId);
    }
}
