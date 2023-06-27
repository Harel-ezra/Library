import com.mongodb.ConnectionString;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import com.mongodb.client.model.Updates;
import org.bson.Document;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.conversions.Bson;

import java.util.ArrayList;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class DAL {
    public static ConnectionString connectionString = new ConnectionString("mongodb://localhost:27017");
    public static PojoCodecProvider provider = PojoCodecProvider.builder().register(User.class, Book.class, Author.class).build();
    public static CodecRegistry registry = fromRegistries(getDefaultCodecRegistry(), fromProviders(provider));

    public static MongoDatabase libraryDB = MongoClients.create(connectionString)
            .getDatabase("Library")
            .withCodecRegistry(registry);

    public static MongoCollection<User> userCollection = libraryDB.getCollection("Users", User.class);
    public static MongoCollection<Book> booksCollection = libraryDB.getCollection("Books", Book.class);
    public static MongoCollection<Author> authorsCollection = libraryDB.getCollection("Authors", Author.class);
    public static Bson projectionNameAndId = Projections.fields(Projections.include("_id", "name"));


    public static ArrayList<Book> renameBook(String bookId, String newName) {
        booksCollection.updateOne(
                new Document("_id", bookId),
                Updates.set("name", newName));
        return getAllBooks();
    }

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


    public static ArrayList<Author> addAuthor(String authorId, String authorName) {
        authorsCollection.insertOne(new Author(authorId, authorName));
        return getAllAuthors();
    }

    public static ArrayList<Author> removeAuthor(String authorId) {
        //need remove all his books and his readers.

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

    public static ArrayList<Book> getAllReadiedBooks(String userId) {
        User user = userCollection.find(new Document("_id", userId)).first();
        ArrayList<Book> booksList = new ArrayList<>();
        for (String bookId : user.getBooksRead()) {
            booksList.add(booksCollection.find(new Document("_id", bookId)).projection(projectionNameAndId).first());
        }
        return booksList;
    }

    public static ArrayList<User> getAllBookReaders(String bookId) {
        return userCollection.find(new Document("booksRead", bookId)).projection(projectionNameAndId).into(new ArrayList<>());
    }

    public static ArrayList<User> getAllUsers() {
        return userCollection.find(new Document()).projection(projectionNameAndId).into(new ArrayList<User>());
    }

    public static ArrayList<Author> getAllAuthors() {
        return authorsCollection.find(new Document()).projection(projectionNameAndId).into(new ArrayList<Author>());
    }

    public static ArrayList<Book> getAllBooks() {
        return booksCollection.find(new Document()).projection(projectionNameAndId).into(new ArrayList<Book>());
    }
}
