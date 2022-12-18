import React, { useState } from "react";
import { Box } from "@mui/material";

import HeroBanner from "../components/HeroBanner";
import SearchExcecises from "../components/SearchExcecises";
import Exercises from "../components/Exercises";

function Home() {
    const [bodyPart, setBodyPart] = useState("all");
    const [exercises, setExercises] = useState([]);

    return (
        <Box>
            <HeroBanner />
            <SearchExcecises
                bodyPart={bodyPart}
                setBodyPart={setBodyPart}
                setExercises={setExercises}
            />
            <Exercises
                bodyPart={bodyPart}
                exercises={exercises}
                setExercises={setExercises}
            />
        </Box>
    );
}

export default Home;
