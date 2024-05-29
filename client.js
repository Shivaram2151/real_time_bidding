// Establish WebSocket connection
const socket = new WebSocket("ws://localhost:3000");

// Handle connection open
socket.onopen = () => {
  console.log("Connected to the WebSocket server");
};

// Handle incoming messages from the server
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "update") {
    console.log("Updated bids:", data.bids);
    updateBids(data.bids);
  }

  if (data.type === "error") {
    console.error("Error:", data.message);
  }
};

// Handle connection close
socket.onclose = () => {
  console.log("Disconnected from the WebSocket server");
};

// Function to send a new bid to the server
const placeBid = (itemId, userId, amount) => {
  const message = JSON.stringify({ type: "bid", itemId, userId, amount });
  socket.send(message);
};

// Function to update the UI with the latest bids
const updateBids = (bids) => {
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = "";

  bids.forEach((bid) => {
    const itemElement = document.createElement("div");
    itemElement.innerHTML = `
      <p>Item: ${bid.Item.name}</p>
      <p>Bid Amount: ${bid.amount}</p>
      <p>Bidder: ${bid.User.username}</p>
    `;
    itemsContainer.appendChild(itemElement);
  });
};

// Example usage: Uncomment the following line to place a bid when the script runs
// const exampleUserId = 1;
// const exampleItemId = 1;
// const exampleBidAmount = 100.00;
// placeBid(exampleItemId, exampleUserId, exampleBidAmount);
