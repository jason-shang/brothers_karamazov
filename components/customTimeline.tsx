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
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

const StyledTimelineContainer = styled(Box)({
  marginLeft: "3rem",
  marginTop: "2rem",
  backgroundColor: "#f0e8d4",
  padding: "15px",
  borderRadius: "10px",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  justifyContent: "flex-end",
  width: "23vw",
  height: "50vh",
  opacity: "65%"
});

const TimelineTextContainer = styled(Box)({
  width: "12rem", // Adjust the width as needed
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

export default function CustomTimeline({ time, setTime }: CustomTimelineProps) {
  return (
    <StyledTimelineContainer>
      <Timeline position="left">
        <TimelineItem>
          <TimelineSeparator>
            <StyledTimelineConnector />
            <IconButton
              onClick={() => {
                console.log("day1");
                setTime("day1");
              }}
            >
              <TimelineDot
                sx={{
                  backgroundColor: time === "day1" ? "saddlebrown" : "antiquewhite",
                  color: time === "day1" ? "white" : "black",
                  borderColor: "black",
                  borderWidth: "3px",
                  "&.MuiTimelineDot-outlined": {
                    borderWidth: "3px",
                  },
                }}
                variant={time === "day1" ? "outlined" : "filled"}
              >
                <BugReportIcon />
              </TimelineDot>
            </IconButton>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTextContainer>
              <StyledTypography variant="h6">
                Day One
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
                console.log("day2");
                setTime("day2");
              }}
            >
              <TimelineDot
                sx={{
                  backgroundColor: time === "day2" ? "saddlebrown" : "antiquewhite",
                  color: time === "day2" ? "white" : "black",
                  borderColor: "black",
                  borderWidth: "3px",
                  "&.MuiTimelineDot-outlined": {
                    borderWidth: "3px",
                  },
                }}
                variant={time === "day2" ? "outlined" : "filled"}
              >
                <BungalowIcon />
              </TimelineDot>
            </IconButton>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTextContainer>
              <StyledTypography variant="h6">
                Day Two
              </StyledTypography>
              <StyledTypography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                Wedding at Cana, the onion
              </StyledTypography>
            </TimelineTextContainer>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <StyledTimelineConnector />
            <IconButton
              onClick={() => {
                console.log("day3");
                setTime("day3");
              }}
            >
              <TimelineDot
                sx={{
                  backgroundColor: time === "day3" ? "saddlebrown" : "antiquewhite",
                  color: time === "day3" ? "white" : "black",
                  borderColor: "black",
                  borderWidth: "3px",
                  "&.MuiTimelineDot-outlined": {
                    borderWidth: "3px",
                  },
                }}
                variant={time === "day3" ? "outlined" : "filled"}
              >
                <ChurchIcon />
              </TimelineDot>
            </IconButton>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTextContainer>
              <StyledTypography variant="h6">
                Day Three
              </StyledTypography>
              <StyledTypography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                Dmitry&apos;s trial, Ivan&apos;s devil, Smerdyakov&apos;s suicide
              </StyledTypography>
            </TimelineTextContainer>
          </TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <StyledTimelineConnector />
            <IconButton
              onClick={() => {
                console.log("day4");
                setTime("day4");
              }}
            >
              <TimelineDot
                sx={{
                  backgroundColor: time === "day4" ? "saddlebrown" : "antiquewhite",
                  color: time === "day4" ? "white" : "black",
                  borderColor: "black",
                  borderWidth: "3px",
                  "&.MuiTimelineDot-outlined": {
                    borderWidth: "3px",
                  },
                }}
                variant={time === "day4" ? "outlined" : "filled"}
              >
                <BalanceIcon />
              </TimelineDot>
            </IconButton>
            <StyledTimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: "12px", px: 2 }}>
            <TimelineTextContainer>
              <StyledTypography variant="h6">
                Day Four
              </StyledTypography>
              <StyledTypography variant="body2" color="text.secondary" sx={{ py: 1 }}>
                The Fatal Day
              </StyledTypography>
            </TimelineTextContainer>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </StyledTimelineContainer>
  );
}
