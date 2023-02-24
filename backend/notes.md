# Map of the Week

## Player Registration

- /register
  - Check if the user is already registered
  - Further prompt user to enter in whether they are unranked, master, or legend
  - Initialize other fields in the database
    - `Trophies: {
    first: {
    type: Number,
    default: 0
    }
    second: {
    type: Number,
    default: 0
    }
    third: {
    type: Number,
    default: 0
    }
        }`
    - `eventsParticipated: {
    type: Number,
    default: 0
    }`
    - `allPlacements: [
    {
    type: Number,
    default: 0
    }
    ]`

## Event Registration
- /join
- Check if user is blacklisted
- Check if the user is already registered and if they are not, prompt them to register
- Check if the user has already joined the event

## Event Schema
- `map: {
    type: String,
    default: "Map of the Week"
    }`
- `participants: [
    {
    type: String,
    unique: true
    }
    ]`
- `qualifierTimes: {
    player: {
    type: String,
    unique: true
    },
    time: {
    type: Number,
    default: 0
    }}`
- `divisions: {
    division: {
    type: Number,
    unique: true
    },
    players: [
    {
    type: String,
    unique: true
    }
    ]}`
- `eventStatus: {
    type: String,
    default: "open"
    }`
- `eventDate: {
    type: Date,
    default: Date.now
    }`

## Event Creation
- /create
- Check if the user is a team member
- Get the latest map from the database
- Set event start time
- Set event description
- Send message announcing the event and the map

## Time Tracking
- Check if the user is blacklisted
- Check if the user is registered
- Check if the user has joined the event
- Check if the user has already submitted a time for the round number
- /time (event number) (round number) (time in seconds)
- Update the user's time for the round in the database
- Send a reply message to confirm time submission

## Time tracking Use Cases
- Reminder System (send a reminder message to users who have not submitted a time for the current round)
- Time submission deadline (send a message to users who have not submitted a time for the current round and remove them from the event)
- Verification system (require user's to provide a screenshot of their time via imgur in order to submit a time)
- Screenshots are useful to verify user times after the event has ended

## Leaderboard
- /leaderboard
- Retrieve the list of players who participated in the latest "Map of the Week" event.
- Sort the list of players by their qualifying time and division in ascending order.

## Division Algorithm

- Retrieve the list of players who participated in the "Map of the Week" event.
- Sort the list of players by their qualifying time in ascending order.
- Determine the number of divisions needed based on the number of players who showed up and the desired division size.
- Calculate the number of players that will be in each division by dividing the total number of players by the number of divisions.
- Iterate through the sorted list of players and assign each player to a division based on their qualifying time and the number of players in each division.
