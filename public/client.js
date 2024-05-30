// Establish WebSocket connection
const socket = new WebSocket("ws://localhost:3000");

// Handle connection open
socket.onopen = () => {
  console.log("Connected to the WebSocket server");
  document.getElementById("connectionStatus").textContent = "Connected";
};

// Handle incoming messages from the server
socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === "newItem") {
    updateItem(data.item);
  } else if (data.type === "update") {
    console.log("Updated bids:", data.bids);
    updateBids(data.bids);
  } else if (data.type === "error") {
    console.error("Error:", data.message);
  }
};

// Handle connection close
socket.onclose = () => {
  console.log("Disconnected from the WebSocket server");
  document.getElementById("connectionStatus").textContent = "Disconnected";
};

// Function to send a new bid to the server
const placeBid = (itemId, userId, amount) => {
  console.log(
    "Triggered: Item ID " + itemId + " User ID " + userId + " Amount " + amount
  );
  if (socket.readyState === WebSocket.OPEN) {
    const message = JSON.stringify({ type: "bid", itemId, userId, amount });
    socket.send(message);
  } else {
    console.error("WebSocket connection is not open");
  }
};

// Function to update the UI with the item details
const updateItem = (item) => {
  document.getElementById("itemCard").style.display = "block";
  document.getElementById("bidForm").style.display = "block";

  const itemImage = document.getElementById("itemImage");
  itemImage.src = item.imageUrl;
  itemImage.onerror = () => {
    itemImage.src = "default-image.jpg"; // Fallback image if the URL is broken
  };

  document.getElementById("itemName").innerText = item.name;
  document.getElementById("itemDescription").innerText = item.description;
  document.getElementById("startingPrice").innerText = item.startingPrice;
  document.getElementById("currentBid").innerText = item.currentBid;
  document.getElementById("createdAt").innerText = new Date(
    item.createdAt
  ).toLocaleString();
  document.getElementById("highestBidder").innerText = item.highestBidder;
};

// Function to update the UI with the latest bids
const updateBids = (bids) => {
  const itemsContainer = document.getElementById("items");
  itemsContainer.innerHTML = "";

  if (bids.length > 0) {
    const latestBid = bids[0]; // Assuming bids are ordered by time with the latest first
    document.getElementById("currentBid").innerText = latestBid.bid_amount;
    document.getElementById("highestBidder").innerText =
      latestBid.User.username;
  }

  bids.reverse().forEach((bid) => {
    const bidElement = document.createElement("div");
    bidElement.classList.add("bid-card");
    bidElement.innerHTML = `
      <p><strong>Item:</strong> ${bid.Item.name}</p>
      <p><strong>Bid Amount:</strong> $${bid.bid_amount}</p>
      <p><strong>Bidder:</strong> ${bid.User.username}</p>
    `;
    itemsContainer.appendChild(bidElement);
  });
};

// Add event listener to the form
document.getElementById("bidForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  const bidAmount = document.getElementById("bidAmount").value;
  const exampleUserId = 1; // Replace with actual user ID
  const exampleItemId = 4; // Replace with actual item ID

  placeBid(exampleItemId, exampleUserId, parseFloat(bidAmount));
});
