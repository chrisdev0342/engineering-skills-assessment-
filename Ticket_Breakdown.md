# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here

Ticket 1 - Add custom id table
AC:
    - Add a table in database called agent_custom_ids
    - Add a column custom_id
    - Add a column agent_id which is Foreign Key for the Agents table
    - Add a column facility_id which is Foreign Key for the Facilities table
Story Points : 2

Ticket 2 - Allow Facilities to add/edit custom ids
AC:
    - Create a form which allows facilities to add / update custom ids to the agents they work with.
        - Add a select field Agent in the form, preload it with agents the facility works with.
        - Add a text field Custom id, preload it with the custom id if it already exists
Story Points : 3

Ticket 3 - Create endpoints to add/update custom ids
AC:
    - Create a GET endpoint to get custom ids
        - Add ability to get by facility id and agent id
    - Create a POST endpoint to add custom ids
    - Create a PUT endpoint to update custom ids
Story Points : 5

Ticket 4 - Update getShiftsByFacility function to use custom ids
AC:
    - Update the getShiftsByFacility function to fetch custom ids for agents
    - Add the custom ids to the metadata
Story Points : 2

Ticket 5 - Update generateReport function to use custom ids
AC:
    - Update the generateReport function to use the agents custom id instead of the internal database id when creating a report
Story Points : 1
