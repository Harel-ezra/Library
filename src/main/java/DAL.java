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


    public static ArrayList<User> getAllUsers() {
        Bson projection = Projections.fields(Projections.include("_id", "name"));
        return userCollection.find(new Document()).projection(projection).into(new ArrayList<User>());
    }

    public static ArrayList<Author> getAllAuthors() {
        Bson projection = Projections.fields(Projections.include("_id", "name"));
        return authorsCollection.find(new Document()).projection(projection).into(new ArrayList<Author>());
    }

    public static ArrayList<Book> getAllBooks() {
        Bson projection = Projections.fields(Projections.include("_id", "name"));
        return booksCollection.find(new Document()).projection(projection).into(new ArrayList<Book>());
    }


    public static String renameBook(String bookId, String newName) {
        booksCollection.updateOne(
                new Document("_id", bookId),
                Updates.set("name", newName));
        return "ok";
    }

    public static String addBookToLibrary(String bookId, String bookName, String authorId) {
        booksCollection.insertOne(new Book(bookId, bookName, authorId));
        return "ok";
    }

    public static String removeBookFromLibrary(String bookId, String authorId) {
        booksCollection.deleteOne(new Document("_id", bookId));
        authorsCollection.updateOne(
                new Document("_id", authorId),
                new Document("$pull", new Document("books", new Document("bookId", bookId))));
        userCollection.updateMany(
                new Document("books", new Document("bookId", bookId)),
                new Document("$pull", new Document("books", new Document("bookId", bookId))));
        return "ok";
    }

    public static String addUser(String userId, String userName) {
        userCollection.insertOne(new User(userId, userName));
        return "ok";
    }

    public static String removeUser(String userId) {
        userCollection.deleteOne(new Document("_id", userId));
        return "ok";
    }

    public static String renameUser(String userId, String newName) {
        userCollection.updateOne(
                new Document("_id", userId),
                Updates.set("name", newName));
        return "ok";
    }

    public static String updateFavoriteBook(String userId, String bookId) {
        userCollection.updateOne(
                new Document("_id", userId),
                new Document("favoriteBook", bookId)
        );
        return "ok";
    }

    public static String addReadiedBook(String userId, String bookId) {
        userCollection.updateOne(
                new Document("_id", userId),
                new Document("$push", new Document("books",
                        new Document("bookId", bookId))));

        return "ok";
    }

    public static String removeReadiedBook(String userId, String bookId) {
        userCollection.updateOne(
                new Document("_id", userId),
                new Document("$pull", new Document("books",
                        new Document("bookId", bookId))));

        return "ok";
    }


    public static String addAuthor(String authorId, String authorName) {
        authorsCollection.insertOne(new Author(authorId, authorName));
        return "ok";
    }

    public static String removeAuthor(String authorId) {
        //need remove all his books and his readers.

        FindIterable<Book> booksIterator = booksCollection.find(new Document("authorId", authorId));
        for (Book book : booksIterator) {
            removeBookFromLibrary(book.getId(), authorId);
        }
        authorsCollection.deleteOne(new Document("_id", authorId));
        return "ok";
    }

    public static String renameAuthor(String authorId, String newName) {
        authorsCollection.updateOne(
                new Document("_id", authorId),
                new Document("name", newName)
        );
        return "ok";
    }

    public static String addWrittenBook(String authorId, String bookId) {
        authorsCollection.updateOne(
                new Document("_id", authorId),
                new Document("$push", new Document("books",
                        new Document("bookId", bookId))));

        return "ok";
    }

    public static String removeWrittenBook(String authorId, String bookId) {
        removeBookFromLibrary(bookId, authorId);
        return "ok";
    }
}
