import spark.Spark;

import static spark.Spark.after;
import static spark.Spark.options;

public class Server {
    public static void main(String[] args) {
        Spark.staticFiles.location("/public");
        setupCORS();
        RH.setRoutes();
    }

    public static void setupCORS() {
        after((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.header("Access-Control-Allow-Headers: Origin"," Content-Type, Accept, Authorization, X-Request-With");
            response.header("Access-Control-Allow-Credentials", "true");
            response.type("application/json");
        });

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "";
        });
    }
}
