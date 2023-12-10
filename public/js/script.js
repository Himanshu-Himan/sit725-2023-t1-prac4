async function sendMessage() {
  const messageInput = document.getElementById("messageInput");
  const message = messageInput.value; 

  try {
    const response = await fetch(`/messages/sendMessage`, { // Updated route
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const responseData = await response.json();
    displayResponse(responseData.response);
  } catch (error) {
    console.error("Error:", error);
  }

  messageInput.value = "";
}

function displayResponse(response) {
  const responseContainer = document.getElementById("responseContainer");
  const newResponse = document.createElement("p");
  newResponse.textContent = response;
  responseContainer.appendChild(newResponse);
}
