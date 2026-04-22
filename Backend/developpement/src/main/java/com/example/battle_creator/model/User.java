public class User{

    private int id;

    private string email;

    private string login;

    private Boolean isActive;

    private Long createdAt;

    private Long updatedAt;

    public User(){};

    public User(int id, string email, string login, Boolean isActive, Long createdAt, Long updatedAt) {
        this.id = id;
        this.email = email;
        this.login = login;
        this.isActive = isActive;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}