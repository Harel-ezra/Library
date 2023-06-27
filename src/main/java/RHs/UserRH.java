package RHs;

import BLs.UserBL;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import spark.Request;
import spark.Response;

import static spark.Spark.*;
import static spark.Spark.get;

public class UserRH {


    public static void setUserRoutes()
    {
        post("/addUser", UserRH::addUser);
        delete("/removeUser", UserRH::removeUser);
        put("/renameUser", UserRH::renameUser);
        put("/updateFavoriteBook", UserRH::updateFavoriteBook);
        put("/addReadiedBook", UserRH::addReadiedBook);
        put("/removeUserBook", UserRH::removeReadiedBook);
        get("/UserDetails", UserRH::getAllReadiedBooks);
        get("/getFavoriteBook", UserRH::getFavoriteBook);
        get("/User", UserRH::users);
        get("/getUser", UserRH::getUser);
    }

    public static String addUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userName = requestBody.get("name").getAsString();
        return new Gson().toJson(UserBL.addUser(userName));
    }

    public static String removeUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("id").getAsString();
        return new Gson().toJson(UserBL.removeUser(userId));
    }

    public static String renameUser(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("id").getAsString();
        String newName = requestBody.get("newName").getAsString();
        return new Gson().toJson(UserBL.renameUser(userId, newName));
    }

    public static String updateFavoriteBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return UserBL.updateFavoriteBook(userId, bookId);
    }

    public static String getFavoriteBook(Request request, Response response) {
        String userId = request.queryParams("id");
        return new Gson().toJson(UserBL.getFavoriteBook(userId));
    }

    public static String addReadiedBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("userId").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return new Gson().toJson(UserBL.addReadiedBook(userId, bookId));
    }

    public static String removeReadiedBook(Request request, Response response) {
        JsonObject requestBody = new JsonParser().parse(request.body()).getAsJsonObject();
        String userId = requestBody.get("id").getAsString();
        String bookId = requestBody.get("bookId").getAsString();
        return new Gson().toJson(UserBL.removeReadiedBook(userId, bookId));
    }

    private static String getAllReadiedBooks(Request request, Response response) {
        String userId = request.queryParams("id");
        return new Gson().toJson(UserBL.getAllReadiedBooks(userId));
    }
    private static String users(Request request, Response response) {
        return new Gson().toJson(UserBL.getAllUsers());
    }
    public static String getUser(Request request, Response response) {
        String userId = request.queryParams("id");
        return new Gson().toJson(UserBL.getUser(userId));
    }
}
