import React, { useRef, useState, useEffect } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { FaSquare } from "react-icons/fa";

const colors = ["#000000", "#FF0000", "#FFFF00", "#0000FF", "#FFFFFF"];

const Index = () => {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "#FFFFFF";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    const context = canvasRef.current.getContext("2d");
    context.lineTo(offsetX, offsetY);
    context.stroke();
  };

  const stopDrawing = () => {
    const context = canvasRef.current.getContext("2d");
    context.closePath();
    setIsDrawing(false);
  };

  return (
    <Box position="relative" width="100vw" height="100vh">
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        style={{ display: "block" }}
      />
      <VStack position="absolute" top={4} left={4} spacing={4}>
        {colors.map((col) => (
          <Button
            key={col}
            backgroundColor={col}
            width="40px"
            height="40px"
            onClick={() => setColor(col)}
            border={col === "#FFFFFF" ? "1px solid #000000" : "none"}
          >
            {col === "#FFFFFF" && <FaSquare color="#000000" />}
          </Button>
        ))}
      </VStack>
    </Box>
  );
};

export default Index;