import { useState } from "react";
import Button from "@mui/material/Button";

function Voting() {
  const [voteCounter, setCounter] = useState(0);

  const onUpVoteHandler = () => {
    setCounter(voteCounter + 1);
    console.log("I am in up vote");
  };
  const onDownVoteHandler = () => {
    if (voteCounter <= 0) {
      alert("Vote Cannot gow below 0 value");
      return;
    }
    setCounter(voteCounter - 1);

    console.log("I am in Down vote");
  };

  return (
    <div>
      <Button variant="contained" onClick={onUpVoteHandler}>
        Up Vote
      </Button>
      <Button variant="contained" onClick={onDownVoteHandler}>
        Down Vote
      </Button>
      <div>Votes: {voteCounter}</div>
    </div>
  );
}

export default Voting;
