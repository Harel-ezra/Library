package BLs;

import DALs.AuthorDAL;
import Models.Author;
import Models.Book;
import java.util.ArrayList;
import java.util.UUID;

public class AuthorBL {

    public static ArrayList<Author> addAuthor(String authorName) {
        String authorId = UUID.randomUUID().toString();
        return AuthorDAL.addAuthor(authorId, authorName);
    }

    public static ArrayList<Author> removeAuthor(String authorId) {
        return AuthorDAL.removeAuthor(authorId);

    }

    public static ArrayList<Author> renameAuthor(String authorId, String newName) {
        return AuthorDAL.renameAuthor(authorId, newName);

    }

    public static ArrayList<Book> addWrittenBook(String authorId, String bookName) {
        String bookId=UUID.randomUUID().toString();
        return AuthorDAL.addWrittenBook(authorId,bookId, bookName);
    }

    public static ArrayList<Book> removeWrittenBook(String authorId, String bookId) {
        return AuthorDAL.removeWrittenBook(authorId, bookId);
    }
    public static ArrayList<Book> getAllWrittenBooks(String authorId) {
        return AuthorDAL.getAllWrittenBooks( authorId);

    }
    public static ArrayList<Author> getAllAuthors() {
        return AuthorDAL.getAllAuthors();
    }

}
