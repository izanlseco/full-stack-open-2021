describe('Pokedex', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5000')
  })
  it('can open the frontend', function() {
    cy.contains('ivysaur')
    cy.contains('Pokémon and Pokémon character names are trademarks of Nintendo.')
  })
  it('can navigate to a single pokemon page', function() {
    cy.contains('charmander').click()
    cy.contains('blaze')
  })
})