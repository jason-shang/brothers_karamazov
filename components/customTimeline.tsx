import * as React from "react";
import BungalowIcon from "@mui/icons-material/Bungalow";
import BalanceIcon from "@mui/icons-material/Balance";
import BugReportIcon from "@mui/icons-material/BugReport";
import ChurchIcon from "@mui/icons-material/Church";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/system";

interface CustomTimelineProps {
  scene: string;
  setScene: React.Dispatch<React.SetStateAction<string>>;
}

const StyledTimelineContainer = styled(Box)({
  marginLeft: "3rem",
  marginTop: "2rem",
  backgroundColor: "#f0e8d4",
  padding: "10px",
  borderRadius: "10px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  justifyContent: "flex-end",
  width: "20rem",
  height: "40vh",
  opacity: "70%"
});

const TimelineTextContainer = styled(Box)({
  width: "10rem", // Adjust the width as needed
});

const StyledTypography = styled(Typography)({
  fontFamily: '"Playfair Display", serif',
  color: "#43302E",
});

const StyledTimelineConnector = styled(TimelineConnector)({
  backgroundImage: "linear-gradient(to bottom, #8B0000, #8B0000 50%, #8B0000 50%, #8B0000)",
  backgroundSize: "1px 8px",
  backgroundRepeat: "repeat-y",
  width: "1px",
  height: "100%",
});

export default function CustomTimeline({ scene, setScene }: CustomTimelineProps) {
  return (
    <StyledTimelineContainer>
      <Timeline position="left">
        <TimelineItem>
          <TimelineSeparator>
            <StyledTimelineConnector />
            <IconButton
              onClick={() => {
                console.log("scene1");
                setScene("scene1");
              }}
            >
              <TimelineDot
                sx={{
                  backgroundColor: scene === "scene1" ? "saddlebrown" : "antiquewhite",
                  color: scene === "scene1" ? "white" : "black",
                  borderColor: "black",
                  borderWidth: "3px",
                  "&.MuiTimelineDot-outlined": {
                    borderWidth: "3px",
                  },
                }}
                variant={scene === "scene1" ? "outlined" : "filled"}
              >
                <BugReportIcon />
              </TimelineDot>
            </IconButton>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTextContainer>
              <StyledTypography variant="h6">
                Scene 1
              </StyledTypography>
              <StyledTypography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                Fyodor, Grand Inquisitor, Father Zossima
              </StyledTypography>
            </TimelineTextContainer>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <StyledTimelineConnector />
            <IconButton
              onClick={() => {
                console.log("scene2");
                setScene("scene2");
              }}
            >
              <TimelineDot
                sx={{
                  backgroundColor: scene === "scene2" ? "saddlebrown" : "antiquewhite",
                  color: scene === "scene2" ? "white" : "black",
                  borderColor: "black",
                  borderWidth: "3px",
                  "&.MuiTimelineDot-outlined": {
                    borderWidth: "3px",
                  },
                }}
                variant={scene === "scene2" ? "outlined" : "filled"}
              >
                <BungalowIcon />
              </TimelineDot>
            </IconButton>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTextContainer>
              <StyledTypography variant="h6">
                Scene 2
              </StyledTypography>
              <StyledTypography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                Wedding at Cana, the Onion
              </StyledTypography>
            </TimelineTextContainer>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <StyledTimelineConnector />
            <IconButton
              onClick={() => {
                console.log("scene3");
                setScene("scene3");
              }}
            >
              <TimelineDot
                sx={{
                  backgroundColor: scene === "scene3" ? "saddlebrown" : "antiquewhite",
                  color: scene === "scene3" ? "white" : "black",
                  borderColor: "black",
                  borderWidth: "3px",
                  "&.MuiTimelineDot-outlined": {
                    borderWidth: "3px",
                  },
                }}
                variant={scene === "scene3" ? "outlined" : "filled"}
              >
                <ChurchIcon />
              </TimelineDot>
            </IconButton>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTextContainer>
              <StyledTypography variant="h6">
                Scene 3
              </StyledTypography>
              <StyledTypography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                Ivan and his devil, Smerdyakov&apos;s suicide
              </StyledTypography>
            </TimelineTextContainer>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <StyledTimelineConnector />
            <IconButton
              onClick={() => {
                console.log("scene4");
                setScene("scene4");
              }}
            >
              <TimelineDot
                sx={{
                  backgroundColor: scene === "scene4" ? "saddlebrown" : "antiquewhite",
                  color: scene === "scene4" ? "white" : "black",
                  borderColor: "black",
                  borderWidth: "3px",
                  "&.MuiTimelineDot-outlined": {
                    borderWidth: "3px",
                  },
                }}
                variant={scene === "scene4" ? "outlined" : "filled"}
              >
                <BalanceIcon />
              </TimelineDot>
            </IconButton>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTextContainer>
              <StyledTypography variant="h6">
                Scene 4
              </StyledTypography>
              <StyledTypography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                The Courtroom
              </StyledTypography>
            </TimelineTextContainer>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </StyledTimelineContainer>
  );
}
