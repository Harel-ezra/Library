import spark.Request;
import spark.Response;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import static spark.Spark.*;

public class RH {
    public static void setRoutes() {
        //books
//        post("/addBookToLibrary", RH::addBookToLibrary);
//        delete("/removeBookFromLibrary", RH::removeBookFromLibrary);
        put("/renameBook", RH::renameBook);
        get("/BookDetails", RH::getAllBookReaders);
        //users
        post("/addUser", RH::addUser);
        delete("/removeUser", RH::removeUser);
        put("/renameUser", RH::renameUser);
        put("/updateFavoriteBook", RH::updateFavoriteBook);
        put("/addReadiedBook", RH::addReadiedBook);
        put("/removeUserBook", RH::removeReadiedBook);
        get("/UserDetails", RH::getAllReadiedBooks);
        get("/getFavoriteBook", RH::getFavoriteBook);

        //authors
        post("/addAuthor", RH::addAuthor);
        delete("/removeAuthor", RH::removeAuthor);
        put("/renameAuthor", RH::renameAuthor);
        put("/addWrittenBook", RH::addWrittenBook);
        put("/removeAuthorBook", RH::removeWrittenBook);

        get("/AuthorDetails", RH::getAllWrittenBooks);
        //global
        get("/User", RH::users);
        get("/Author", RH::authors);
        get("/Book", RH::books);
        get("/getUser", RH::getUser);

    }


    //book
//    public static String addBookToLibrary(Request request, Response response) {
//        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
//        String bookName = requestBody.get("bookName").getAsString();
//        String authorId = requestBody.get("authorId").getAsString();
//        return BL.addBookToLibrary(bookName, authorId);
//    }

    public static String renameBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String bookId = requestBody.get("id").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return new Gson().toJson(BL.renameBook(bookId, newName));
    }

    private static String getAllBookReaders(Request request, Response response) {
        String bookId = request.queryParams("id");
        return new Gson().toJson(BL.getAllBookReaders(bookId));
    }

//user

    public static String addUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userName = requestBody.get("name").getAsString();
        return new Gson().toJson(BL.addUser(userName));
    }

    public static String removeUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("id").getAsString();
        return new Gson().toJson(BL.removeUser(userId));
    }

    public static String renameUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("id").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return new Gson().toJson(BL.renameUser(userId, newName));
    }

    public static String updateFavoriteBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return BL.updateFavoriteBook(userId, bookId);
    }

    public static String getFavoriteBook(Request request, Response response) {
        String userId = request.queryParams("id");
        return new Gson().toJson(BL.getFavoriteBook(userId));
    }

    public static String addReadiedBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return new Gson().toJson(BL.addReadiedBook(userId, bookId));
    }

    public static String removeReadiedBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("id").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return new Gson().toJson(BL.removeReadiedBook(userId, bookId));
    }

    private static String getAllReadiedBooks(Request request, Response response) {
        String userId = request.queryParams("id");
        return new Gson().toJson(BL.getAllReadiedBooks(userId));
    }

//    authors

    public static String addAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorName = requestBody.get("name").getAsString();
        return new Gson().toJson(BL.addAuthor(authorName));
    }

    public static String removeAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("id").getAsString();
        return new Gson().toJson(BL.removeAuthor(authorId));
    }

    public static String renameAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("id").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return new Gson().toJson(BL.renameAuthor(authorId, newName));
    }

    public static String addWrittenBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("authorId").getAsString();
        String bookName = requestBody.get("bookName").getAsString();
        return new Gson().toJson(BL.addWrittenBook(authorId, bookName));
    }

    public static String removeWrittenBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("id").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return new Gson().toJson(BL.removeWrittenBook(authorId, bookId));
    }

    private static String getAllWrittenBooks(Request request, Response response) {
        String authorId = request.queryParams("id");
        return new Gson().toJson(BL.getAllWrittenBooks(authorId));
    }

    //global
    private static String users(Request request, Response response) {
        return new Gson().toJson(BL.getAllUsers());
    }

    public static String authors(Request request, Response response) {
        return new Gson().toJson(BL.getAllAuthors());
    }

    public static String books(Request request, Response response) {
        return new Gson().toJson(BL.getAllBooks());
    }

    public static String getUser(Request request, Response response) {
        String userId = request.queryParams("id");
        return new Gson().toJson(BL.getUser(userId));
    }
}
