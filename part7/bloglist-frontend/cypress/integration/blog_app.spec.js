describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user_one = {
      name: "Izan Lopez",
      username: "Life0",
      password: "whatever",
    };
    const user_two = {
      name: "Patty Oliva",
      username: "Fotolita",
      password: "whatever",
    };
    cy.request("POST", "http://localhost:3003/api/users", user_one);
    cy.request("POST", "http://localhost:3003/api/users", user_two);
    cy.visit("http://localhost:3000/login");
  });

  it("login form is shown", function () {
    cy.contains("username");
    cy.contains("password");
    cy.contains("login");
  });
  describe("login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("Life0");
      cy.get("#password").type("whatever");
      cy.get("#login-button").click();

      cy.contains("Izan Lopez logged-in");
    });
    it.skip("fails with wrong credentials", function () {
      cy.get("#username").type("Life0");
      cy.get("#password").type("whatev");
      cy.get("#login-button").click();

      cy.get(".error")
        .should("contain", "Wrong user or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Life0", password: "whatever" });
      cy.createBlog({
        title: "Node for dumbasses",
        author: "Sarah Connor",
        url: "www.overgourge.com",
        likes: 15,
      });
      cy.createBlog({
        title: "Typing the script",
        author: "Joe L. Markel",
        url: "www.tforthee.com",
        likes: 12,
      });
      cy.createBlog({
        title: "Reacting to the DOM",
        author: "Some old guy",
        url: "www.iklin.com",
        likes: 7,
      });
      cy.createBlog({
        title: "Programming with Java",
        author: "The dude",
        url: "www.zdevel.com",
        likes: 3,
      });
      cy.visit("http://localhost:3000");
    });
    it("a blog can be created", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Cypress typing");
      cy.get("#author").type("Izan L.S.");
      cy.get("#url").type("www.itsnotlikeisneeded.com");
      cy.get("#create-blog").click();

      cy.contains("Cypress typing Izan L.S.");

      cy.get(".info")
        .should("contain", "a new blog Cypress typing by Izan L.S. added")
        .and("have.css", "color", "rgb(0, 128, 0)")
        .and("have.css", "border-style", "solid");
    });
    it("the user can give like to a blog", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Cypress typing");
      cy.get("#author").type("Izan L.S.");
      cy.get("#url").type("www.itsnotlikeisneeded.com");
      cy.get("#create-blog").click();

      cy.contains("Cypress typing Izan L.S.").parent().as("parent");

      cy.get("@parent").find("#show-button").click();
      cy.get("@parent").find("#like-button").click();

      cy.get("@parent").find("#likes").should("contain", "1");
    });
    it("the user can delete his blog", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Cypress typing");
      cy.get("#author").type("Izan L.S.");
      cy.get("#url").type("www.itsnotlikeisneeded.com");
      cy.get("#create-blog").click();

      cy.contains("Cypress typing Izan L.S.").parent().as("parent");

      cy.get("@parent").find("#show-button").click();
      cy.get("@parent").find("#delete-button").click();
      cy.on("window:confirm", () => true);

      cy.contains("www.itsnotlikeisneeded.com").should("not.exist");
    });
    it("one user can' delete the blog of another", function () {
      cy.contains("create new blog").click();
      cy.get("#title").type("Cypress typing");
      cy.get("#author").type("Izan L.S.");
      cy.get("#url").type("www.itsnotlikeisneeded.com");
      cy.get("#create-blog").click();
      cy.get("#logout-button").click();

      cy.get("#username").type("Fotolita");
      cy.get("#password").type("whatever");
      cy.get("#login-button").click();

      cy.get("#show-button").click();
      cy.get("#delete-button").click();
      cy.on("window:confirm", () => true);

      cy.contains("www.itsnotlikeisneeded.com");
    });
    it("the blogs are ordered by number of likes", function () {
      cy.get("span#likes")
        .then((blogs) => blogs.map((a, b) => b.innerText).get())
        .then((likes) => {
          const sortedLikes = [...likes];
          expect(
            JSON.stringify(sortedLikes.sort((a, b) => b - a)) ===
              JSON.stringify(likes)
          ).to.be.true;
        });
    });
  });
});
