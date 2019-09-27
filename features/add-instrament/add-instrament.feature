Feature: Adding new measurement instrament
  In order to be hardware extensible
  I want to be able to add new instraments without any change


  @new
  Scenario: Can add more instraments without failure
    Given I have submitted new measurements as follows:
      | timestamp                  | temperature | dewPoint | precipitation | wind |
      | "2015-09-01T16:00:00.000Z" | 27.1        | 16.7     | 1             | 23.2 |
      | "2015-09-01T16:10:00.000Z" | 27.3        |          | 1             | 10.3 |
      | "2015-09-01T16:20:00.000Z" | 27.5        | 17.1     | 1             | 3.1  |
      | "2015-09-01T16:30:00.000Z" | 27.4        | 17.3     | 1             | 7.3  |
      | "2015-09-01T16:40:00.000Z" | 27.2        |          | 1             | 32.3 |
      | "2015-09-01T17:00:00.000Z" | 28.1        | 18.3     | 1             | 3.1  |

    # GET /stats?<params...>
    When I get stats with parameters:
      | param        | value                    |
      | stat         | min                      |
      | stat         | max                      |
      | stat         | average                  |
      | metric       | temperature              |
      | metric       | dewPoint                 |
      | metric       | wind                     |
      | metric       | precipitation            |
      | fromDateTime | 2015-09-01T16:00:00.000Z |
      | toDateTime   | 2015-09-01T17:00:00.000Z |
    Then the response has a status code of 200
    And the response body is an array of:
      | metric          | stat      | value |
      | "temperature"   | "min"     | 27.1  |
      | "temperature"   | "max"     | 27.5  |
      | "temperature"   | "average" | 27.3  |
      | "dewPoint"      | "min"     | 16.7  |
      | "dewPoint"      | "max"     | 17.3  |
      | "dewPoint"      | "average" | 17.0  |
      | "wind"          | "min"     | 3.1   |
      | "wind"          | "max"     | 32.3  |
      | "wind"          | "average" | 15.2  |
      | "precipitation" | "min"     | 1     |
      | "precipitation" | "max"     | 1     |
      | "precipitation" | "average" | 1     |
