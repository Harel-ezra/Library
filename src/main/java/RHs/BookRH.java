package RHs;

import BLs.BookBL;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import spark.Request;
import spark.Response;

import static spark.Spark.get;
import static spark.Spark.put;

public class BookRH {
    public static void setBookRoutes()
    {
        put("/renameBook", BookRH::renameBook);
        get("/BookDetails", BookRH::getAllBookReaders);
        get("/Book", BookRH::books);

    }
    public static String renameBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String bookId = requestBody.get("id").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return new Gson().toJson(BookBL.renameBook(bookId, newName));
    }
    public static String getAllBookReaders(Request request, Response response) {
        String bookId = request.queryParams("id");
        return new Gson().toJson(BookBL.getAllBookReaders(bookId));
    }
    public static String books(Request request, Response response) {
        return new Gson().toJson(BookBL.getAllBooks());
    }

}
