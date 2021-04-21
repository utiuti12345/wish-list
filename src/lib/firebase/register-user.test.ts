import registerUser from "./register-user";

describe("firestore test",() => {
    describe("register-test",() => {
        it('test.aaa@gmail.com', async () => {
            const user = await registerUser("test.aaa@gmail.com","123456");
            expect(user.mailAddress).toBe("test.aaa@gmail.com");
        });
    })
})
