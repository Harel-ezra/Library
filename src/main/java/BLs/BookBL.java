package BLs;
import DALs.BookDAL;
import Models.Book;
import Models.User;
import java.util.ArrayList;

public class BookBL {
    public static ArrayList<Book> getAllBooks() {
        return BookDAL.getAllBooks();
    }

    public static ArrayList<Book> renameBook(String bookId, String newName) {
        return BookDAL.renameBook(bookId, newName);
    }

    public static ArrayList<User> getAllBookReaders(String bookId) {
        return BookDAL.getAllBookReaders( bookId);
    }


}
