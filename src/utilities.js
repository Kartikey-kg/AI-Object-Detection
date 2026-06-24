// Function to draw bounding boxes and labels around detected objects
// Parameters:
// detections -> Array of detected objects returned by the COCO-SSD model
// ctx -> Canvas 2D context used for drawing on the canvas
export const drawRect = (detections, ctx) => {

  // Loop through each detected object
  detections.forEach((prediction) => {

    // Extract bounding box coordinates from the detection
    // bbox format: [x, y, width, height]
    // x -> starting x-coordinate of the object
    // y -> starting y-coordinate of the object
    // width -> width of the bounding box
    // height -> height of the bounding box
    const [x, y, width, height] = prediction.bbox;

    // Create label text for the detected object
    // prediction.class -> object name (e.g., person, chair, bottle)
    // prediction.score -> confidence score (0 to 1)
    // Multiply by 100 and round it to show percentage confidence
    const text =
      prediction.class +
      " " +
      Math.round(prediction.score * 100) +
      "%";

    // Set bounding box color
    // This color will be used for the rectangle border
    ctx.strokeStyle = "#00e5ff";

    // Set rectangle border thickness
    ctx.lineWidth = 4;

    // Set background color for the label box
    ctx.fillStyle = "#00e5ff";

    // Set font style for the label text
    ctx.font = "20px Arial";

    // Draw a filled rectangle above the detected object
    // Used as a background for the object label
    // Parameters:
    // x -> horizontal position
    // y - 30 -> place label slightly above bounding box
    // 140 -> width of label box
    // 30 -> height of label box
    ctx.fillRect(x, y - 30, 140, 30);

    // Change text color to black for better readability
    ctx.fillStyle = "#000";

    // Draw object name and confidence score
    // x + 5 -> small padding from left edge
    // y - 8 -> vertically center text inside label box
    ctx.fillText(text, x + 5, y - 8);

    // Draw the bounding box around the detected object
    // Parameters:
    // x -> left position
    // y -> top position
    // width -> box width
    // height -> box height
    ctx.strokeRect(x, y, width, height);

  });
};