
beforeEach(() => {
  cy.visit('/');
});

let login;
let pass;
let title;
let description;
let author;
let favorite;

describe('Authorization testing', () => {
  
  it('Checking the page display.', () => {
    cy.contains('Books list').should('be.visible');
    cy.get('a > span > span').should('have.class', 'ml-2');
  });

  it('Should successfully login', () => {
    login = 'bropet@mail.ru';
    pass = '123';
    cy.login(login, pass);
    cy.contains(`Добро пожаловать ${login}`).should('be.visible');
  });

  it('Should not login with empty login', () => {
    login = ' ';
    pass = '123';
    cy.login(login, pass);
    cy.false('#mail');
    cy.get('#mail')
      .then(($el) => $el[0].validationMessage)
      .should('contain', 'Заполните это поле');
  });
  
  it('Should not login with empty password', () => {
    cy.contains('Log in').click();
    cy.get('#mail').type('test@test.com');
    cy.contains('Submit').click();
    cy.false('#pass');
  });

})

describe('Books list testing', () => {

  beforeEach(() => {
    login = 'bropet@mail.ru';
    pass = '123';
    cy.login(login, pass);
  });
  
  it('Add book', () => {

    title = 'Война и Мир';
    description = 'Мировая классика';
    author = 'Л. Н. Толстой';
    favorite = false;
    
    cy.addBook(title, description, author, favorite);

    cy.contains('Война и Мир').should('be.visible');
  })

  it('Add a book to favorites via the checkbox', () => {

    title = 'Вишневый сад';
    description = 'Мировая классика';
    author = 'А. П. Чехов';
    favorite = true;
    
    cy.addBook(title, description, author, favorite);
    
    cy.favorite(title);
  });

  it('Add a book to your favorites using the button on the website', () => {

    title = 'Евгений Онегин';
    description = 'Мировая классика';
    author = 'А. С. Пушкин';
    favorite = false;
    cy.addBook(title, description, author, favorite);
    cy.contains(title).find('.btn').click();

    cy.contains(title).find('.btn').contains('Delete from favorite').should('be.visible');
    cy.favorite(title);
  });
});