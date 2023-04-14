function iso8601DurationToSeconds(duration: string): number {
  const matches = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);

  const hours = matches?.[1] ? parseInt(matches[1].slice(0, -1)) : 0;
  const minutes = matches?.[2] ? parseInt(matches[2].slice(0, -1)) : 0;
  const seconds = matches?.[3] ? parseInt(matches[3].slice(0, -1)) : 0;

  return hours * 3600 + minutes * 60 + seconds;
}

function toHHMMSS(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  let timeString = "";

  if (hours > 0) {
    timeString += hours.toString().padStart(2, "0") + ":";
  }

  timeString +=
    minutes.toString().padStart(2, "0") +
    ":" +
    remainingSeconds.toString().padStart(2, "0");

  return timeString;
}

function to_h_min(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  let timeString = "";

  if (hours > 0) {
    timeString += hours.toString() + "h ";
  }

  if (minutes > 0) {
    timeString += minutes.toString() + "min";
  }

  if (timeString === "") {
    timeString = "0min";
  }

  return timeString;
}

export { toHHMMSS, to_h_min, iso8601DurationToSeconds };
