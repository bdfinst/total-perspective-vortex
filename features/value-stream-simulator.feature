Feature: Value Stream Simulator

  Scenario: As a user, I should be able to apply a preset scenario.
    Given I am on the main page
    When I click on the "Optimized Flow" preset
    Then I should see "Optimized Flow" as the current scenario

  Scenario: As a user, I should be able to add a new step.
    Given I am on the main page
    When I click on the gear icon for the "Analysis" step
    And I click on the "+ After" button
    Then I should see a new step after the "Analysis" step

  Scenario: As a user, I should be able to remove a step.
    Given I am on the main page
    When I click on the gear icon for the "Testing" step
    And I click on the "Remove" button
    Then the "Testing" step should be removed

  Scenario: As a user, I should be able to edit a step's properties.
    Given I am on the main page
    When I click on the gear icon for the "Development" step
    And I change the "WIP Limit" to "5"
    Then the "WIP Limit" for the "Development" step should be "5"

  Scenario: As a user, I should be able to reorder steps.
    Given I am on the main page
    When I click on the gear icon for the "Development" step
    And I click on the "Move Right" button
    Then the "Development" step should be after the "Testing" step
