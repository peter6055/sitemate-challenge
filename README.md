# Sitemate Challenge

## Getting Started with the project
### Backend
```` 
cd backend-express-server && npm install && npm start
````

### Frontend
```` 
cd frontend-react-app && npm install && npm start
````
<br/><br/>

## Technology Stack
- Frontend: React, Ant Design
- Backend: Express
- Library: Axios, Cors, uuidv4, Nodemon


<br/><br/>
## API Usage
| Function      | Method | Path              |
|---------------|--------|-------------------|
| Create Ticket | PUT    | /ticket           |
| Read Ticket   | GET    | /ticket/:ticketId |
| Update Ticket | POST   | /ticket           |
| Delete Ticket | DELETE | /ticket/:ticketId |
<br/>

### Create Ticket [PUT] /api/v1/ticket
- `ticket_name`-> name to create (required)
- `ticket_description`-> description to create (required)
````
{
    "ticket_name": "Ticket Title",
    "ticket_description": "Ticket Description",
}
````
<br/>

### Read Ticket [GET] /api/v1/ticket/:ticketId
- `/:ticketId = "all"` -> return all tickets
- `/:ticketId = "1"` -> return ticket with ticket_id = 1

<br/>


### Update Ticket [POST] /api/v1/ticket
- `ticketId` -> id to update (required)
- `ticket_name`-> name to update (at least one required)
- `ticket_description`-> description to update (at least one required)

````
{
    "ticket_id" : "1",
    "ticket_name": "New Ticket Title",
    "ticket_description": "New Ticket Description",
}
````
<br/>


### Delete Ticket [DELETE] /api/v1/ticket/:ticketId
- `/:ticketId` -> id to delete
