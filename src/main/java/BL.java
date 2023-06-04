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


    public static String addBookToLibrary(String bookName, String authorId) {
        String bookId = UUID.randomUUID().toString();
        return DAL.addBookToLibrary(bookId, bookName, authorId);
    }

    public static String removeBookFromLibrary(String bookId, String authorId) {
        return DAL.removeBookFromLibrary(bookId, authorId);
    }

    public static String renameBook(String bookId, String newName) {
        return DAL.renameBook(bookId, newName);
    }

    public static String addUser(String userName) {
        String userId = UUID.randomUUID().toString();
        return DAL.addUser(userId, userName);
    }


    public static String removeUser(String userId) {
        return DAL.removeUser(userId);
    }

    public static String renameUser(String userId, String newName) {
        return DAL.renameUser(userId, newName);
    }

    public static String updateFavoriteBook(String userId, String bookId) {
        return DAL.updateFavoriteBook(userId, bookId);
    }

    public static String addReadiedBook(String userId, String bookId) {
        return DAL.addReadiedBook(userId, bookId);
    }
    public static String removeReadiedBook(String userId, String bookId) {
        return DAL.removeReadiedBook(userId, bookId);
    }

    public static String addAuthor(String authorName) {
        String authorId = UUID.randomUUID().toString();
        return DAL.addAuthor(authorId, authorName);
    }

    public static String removeAuthor(String authorId) {
        return DAL.removeAuthor(authorId);

    }

    public static String renameAuthor(String authorId, String newName) {
        return DAL.renameAuthor(authorId, newName);

    }

    public static String addWrittenBook(String authorId, String bookId) {
        return DAL.addWrittenBook(authorId, bookId);
    }

    public static String removeWrittenBook(String authorId, String bookId) {
        return DAL.removeWrittenBook(authorId, bookId);
    }
}
