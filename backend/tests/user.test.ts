import { createUser, getUserByEmail, deleteUser } from "../user/user";


test('create user', async () => {
    const user = await createUser("test@test.com");
    const id = user.user_id;
    expect(user).toBeDefined();

    const retrieved_user = await getUserByEmail("test@test.com");
    expect(retrieved_user).toBeDefined();
    expect(retrieved_user?.user_id).toBe(id);

    const deleted_user = await deleteUser(id);
    expect(deleted_user).toBeDefined();
    expect(deleted_user.user_id).toBe(id);

    const retrieved_user_after_deletion = await getUserByEmail("test@test.com");
    expect(retrieved_user_after_deletion).toBeNull();
});