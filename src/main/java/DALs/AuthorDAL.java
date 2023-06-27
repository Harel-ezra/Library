package DALs;

import Models.Author;
import Models.Book;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import java.util.ArrayList;
import static DALs.DALConnections.*;
public class AuthorDAL {


    public static ArrayList<Author> addAuthor(String authorId, String authorName) {
        authorsCollection.insertOne(new Author(authorId, authorName));
        return getAllAuthors();
    }

    public static ArrayList<Author> removeAuthor(String authorId) {
        FindIterable<Book> booksIterator = booksCollection.find(new Document("authorId", authorId));
        for (Book book : booksIterator) {
            removeWrittenBook(authorId, book.getId());
        }
        authorsCollection.deleteOne(new Document("_id", authorId));
        return getAllAuthors();
    }

    public static ArrayList<Author> renameAuthor(String authorId, String newName) {
        try {
            authorsCollection.updateOne(
                    new Document("_id", authorId),
                    Updates.set("name", newName));
        } catch (Exception e) {
            System.out.println(e);
        }
        return getAllAuthors();
    }

    public static ArrayList<Book> addWrittenBook(String authorId, String bookId, String bookName) {
        booksCollection.insertOne(new Book(bookId, bookName, authorId));
        authorsCollection.updateOne(
                new Document("_id", authorId),
                new Document("$push", new Document("books", bookId)));
        return getAllWrittenBooks(authorId);
    }

    public static ArrayList<Book> removeWrittenBook(String authorId, String bookId) {
        userCollection.updateMany(
                new Document("booksRead", bookId),
                new Document("$pull", new Document("booksRead", bookId)));
        authorsCollection.updateOne(
                new Document("_id", authorId),
                new Document("$pull", new Document("books", bookId)));
        booksCollection.deleteOne(new Document("_id", bookId));
        return getAllWrittenBooks(authorId);
    }

    public static ArrayList<Book> getAllWrittenBooks(String authorId) {
        Author author = authorsCollection.find(new Document("_id", authorId)).first();
        ArrayList<Book> booksList = new ArrayList<>();
        for (String bookId : author.getBooks()) {
            booksList.add(booksCollection.find(new Document("_id", bookId)).projection(projectionNameAndId).first());
        }
        return booksList;
    }

    public static ArrayList<Author> getAllAuthors() {
        return authorsCollection.find(new Document()).projection(projectionNameAndId).into(new ArrayList<Author>());
    }

}
