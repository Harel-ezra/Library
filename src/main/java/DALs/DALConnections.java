package DALs;

import Models.Author;
import Models.Book;
import Models.User;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Projections;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;
import org.bson.conversions.Bson;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class DALConnections {

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

}
