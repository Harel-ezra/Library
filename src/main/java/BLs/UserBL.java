package BLs;

import DALs.UserDAL;
import Models.Book;
import Models.User;

import java.util.ArrayList;
import java.util.UUID;

public class UserBL {



    public static ArrayList<User> getAllUsers() {
        return UserDAL.getAllUsers();
    }
    public static ArrayList<User> addUser(String userName) {
        String userId = UUID.randomUUID().toString();
        return UserDAL.addUser(userId, userName);
    }

    public static ArrayList<User> removeUser(String userId) {
        return UserDAL.removeUser(userId);
    }

    public static ArrayList<User> renameUser(String userId, String newName) {
        return UserDAL.renameUser(userId, newName);
    }

    public static String updateFavoriteBook(String userId, String bookId) {
        return UserDAL.updateFavoriteBook(userId, bookId);
    }

    public static Book getFavoriteBook(String userId) {
        return UserDAL.getFavoriteBook(userId);
    }

    public static ArrayList<Book> addReadiedBook(String userId, String bookId) {
        return UserDAL.addReadiedBook(userId, bookId);
    }
    public static ArrayList<Book> removeReadiedBook(String userId, String bookId) {
        return UserDAL.removeReadiedBook(userId, bookId);
    }
    public static ArrayList<Book> getAllReadiedBooks(String userId) {
        return UserDAL.getAllReadiedBooks(userId);

    }
    public static User getUser(String userId) {
        return UserDAL.getUser( userId);
    }

}
