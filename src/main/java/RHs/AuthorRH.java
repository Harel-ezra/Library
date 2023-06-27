package RHs;

import BLs.AuthorBL;
import spark.Request;
import spark.Response;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import static spark.Spark.*;

public class AuthorRH {
    public static void setAuthorRoutes() {
        post("/addAuthor", AuthorRH::addAuthor);
        delete("/removeAuthor", AuthorRH::removeAuthor);
        put("/renameAuthor", AuthorRH::renameAuthor);
        put("/addWrittenBook", AuthorRH::addWrittenBook);
        put("/removeAuthorBook", AuthorRH::removeWrittenBook);
        get("/AuthorDetails", AuthorRH::getAllWrittenBooks);
        get("/Author", AuthorRH::authors);
    }

    public static String addAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorName = requestBody.get("name").getAsString();
        return new Gson().toJson(AuthorBL.addAuthor(authorName));
    }

    public static String removeAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("id").getAsString();
        return new Gson().toJson(AuthorBL.removeAuthor(authorId));
    }

    public static String renameAuthor(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("id").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return new Gson().toJson(AuthorBL.renameAuthor(authorId, newName));
    }

    public static String addWrittenBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("authorId").getAsString();
        String bookName = requestBody.get("bookName").getAsString();
        return new Gson().toJson(AuthorBL.addWrittenBook(authorId, bookName));
    }

    public static String removeWrittenBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String authorId = requestBody.get("id").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return new Gson().toJson(AuthorBL.removeWrittenBook(authorId, bookId));
    }

    private static String getAllWrittenBooks(Request request, Response response) {
        String authorId = request.queryParams("id");
        return new Gson().toJson(AuthorBL.getAllWrittenBooks(authorId));
    }

    public static String authors(Request request, Response response) {
        return new Gson().toJson(AuthorBL.getAllAuthors());
    }


}
