import * as React from "react";
import BungalowIcon from "@mui/icons-material/Bungalow";
import BalanceIcon from "@mui/icons-material/Balance";
import BugReportIcon from "@mui/icons-material/BugReport";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import { IconButton, Typography } from "@mui/material";

interface CustomTimelineProps {
  time: string;
  setTime: React.Dispatch<React.SetStateAction<string>>;
}

export default function CustomTimeline({ time, setTime }: CustomTimelineProps) {
  return (
    <Timeline position="left">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <IconButton
            onClick={() => {
              console.log("day1");
              setTime("day1");
            }}
          >
            <TimelineDot
              sx={{
                backgroundColor: time === "day1" ? "black" : "white",
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
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Day One
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            Fyodor&apos;s past, Grand Inquisitor, Katerina&apos;s sacrifice, Father
            Zossima
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <IconButton
            onClick={() => {
              console.log("day2");
              setTime("day2");
            }}
          >
            <TimelineDot
              sx={{
                backgroundColor: time === "day2" ? "black" : "white",
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
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Day Two
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            Wedding at Cana, the onion
          </Typography>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineConnector />
          <IconButton
            onClick={() => {
              console.log("day3");
              setTime("day3");
            }}
          >
            <TimelineDot
              sx={{
                backgroundColor: time === "day3" ? "black" : "white",
                color: time === "day3" ? "white" : "black",
                borderColor: "black",
                borderWidth: "3px",
                "&.MuiTimelineDot-outlined": {
                  borderWidth: "3px",
                },
              }}
              variant={time === "day3" ? "outlined" : "filled"}
            >
              <BalanceIcon />
            </TimelineDot>
          </IconButton>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{ py: "12px", px: 2 }}>
          <Typography variant="h6" component="span">
            Day Three
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ py: 1 }}>
            Dmitry&apos;s trial, Ivan & his devil, Smerdyakov&apos;s suicide
          </Typography>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  );
}
