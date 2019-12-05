import idx from '../lib'

describe("Default Index Function", () => {
    it("should return Hello World", async () => {
        return "Hello World" == idx()
    })
})