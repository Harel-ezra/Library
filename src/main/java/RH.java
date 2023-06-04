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
        delete("/removeBookFromLibrary", RH::removeBookFromLibrary);
        put("/renameBook", RH::renameBook);

        //users
        post("/addUser", RH::addUser);
        delete("/removeUser", RH::removeUser);
        put("/renameUser", RH::renameUser);
        put("/updateFavoriteBook", RH::updateFavoriteBook);
        put("/addReadiedBook", RH::addReadiedBook);
        put("/removeReadiedBook", RH::removeReadiedBook);

        //authors
        post("/addAuthor", RH::addAuthor);
        delete("/removeAuthor", RH::removeAuthor);
        put("/renameAuthor", RH::renameAuthor);
        put("/addWrittenBook", RH::addWrittenBook);
        put("/removeWrittenBook", RH::removeWrittenBook);

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

    public static String removeBookFromLibrary(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String bookId = requestBody.get("bookId").getAsString();
        String authorId = requestBody.get("authorId").getAsString();
        return BL.removeBookFromLibrary(bookId, authorId);
    }

    public static String renameBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String bookId = requestBody.get("bookId").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return BL.renameBook(bookId, newName);
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
        String bookId = requestBody.get("bookId").getAsString();
        return BL.addWrittenBook(authorId, bookId);
    }

    public static String removeWrittenBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("authorId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return BL.removeWrittenBook(authorId, bookId);
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
