import spark.Request;
import spark.Response;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import static spark.Spark.*;

public class RH {
    public static void setRoutes() {
        //books
        post("/addBookToLibrary", RH::addBookToLibrary);
//        delete("/removeBookFromLibrary", RH::removeBookFromLibrary);
        put("/renameBook", RH::renameBook);
        get("/getAllBookReaders", RH::getAllBookReaders);
        //users
        post("/addUser", RH::addUser);
        delete("/removeUser", RH::removeUser);
        put("/renameUser", RH::renameUser);
        put("/updateFavoriteBook", RH::updateFavoriteBook);
        put("/addReadiedBook", RH::addReadiedBook);
        put("/removeReadiedBook", RH::removeReadiedBook);
        get("/getAllReadiedBooks", RH::getAllReadiedBooks);
        //authors
        post("/addAuthor", RH::addAuthor);
        delete("/removeAuthor", RH::removeAuthor);
        put("/renameAuthor", RH::renameAuthor);
        put("/addWrittenBook", RH::addWrittenBook);
        put("/removeWrittenBook", RH::removeWrittenBook);

        get("/getAllWrittenBooks", RH::getAllWrittenBooks);
        //global
        get("/allUsers", RH::getAllUsers);
        get("/allAuthors", RH::getAllAuthors);
        get("/allBooks", RH::getAllBooks);

    }


    //book
    public static String addBookToLibrary(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String bookName = requestBody.get("bookName").getAsString();
        String authorId = requestBody.get("authorId").getAsString();
        return BL.addBookToLibrary(bookName, authorId);
    }

//    public static String removeBookFromLibrary(Request request, Response response) {
//        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
//        String bookId = requestBody.get("bookId").getAsString();
////        String authorId = requestBody.get("authorId").getAsString();
//        return BL.removeBookFromLibrary(bookId);
//    }

    public static String renameBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String bookId = requestBody.get("bookId").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return BL.renameBook(bookId, newName);
    }


    private static String getAllBookReaders(Request request, Response response) {
        String bookId = request.queryParams("id");
        return new Gson().toJson(BL.getAllBookReaders(bookId));
    }

//user

    public static String addUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userName = requestBody.get("userName").getAsString();
        return BL.addUser(userName);
    }

    public static String removeUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        return BL.removeUser(userId);
    }

    public static String renameUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return BL.renameUser(userId, newName);
    }

    public static String updateFavoriteBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return BL.updateFavoriteBook(userId, bookId);
    }

    public static String addReadiedBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return BL.addReadiedBook(userId, bookId);
    }

    public static String removeReadiedBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return BL.removeReadiedBook(userId, bookId);
    }

    private static String getAllReadiedBooks(Request request, Response response) {
        String userId = request.queryParams("id");
        return new Gson().toJson(BL.getAllReadiedBooks(userId));
    }

//    authors

    public static String addAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorName = requestBody.get("authorName").getAsString();
        return BL.addAuthor(authorName);
    }

    public static String removeAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("authorId").getAsString();
        return BL.removeAuthor(authorId);
    }

    public static String renameAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("authorId").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return BL.renameAuthor(authorId, newName);
    }

    public static String addWrittenBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("authorId").getAsString();
        String bookName = requestBody.get("bookName").getAsString();
        return BL.addWrittenBook(authorId, bookName);
    }

    public static String removeWrittenBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("authorId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return BL.removeWrittenBook(authorId, bookId);
    }

    private static String getAllWrittenBooks(Request request, Response response) {
        String authorId = request.queryParams("id");
        return new Gson().toJson(BL.getAllWrittenBooks(authorId));
    }

    //global
    private static String getAllUsers(Request request, Response response) {
        return new Gson().toJson(BL.getAllUsers());
    }

    public static String getAllAuthors(Request request, Response response) {
        return new Gson().toJson(BL.getAllAuthors());
    }

    public static String getAllBooks(Request request, Response response) {
        return new Gson().toJson(BL.getAllBooks());
    }
}
