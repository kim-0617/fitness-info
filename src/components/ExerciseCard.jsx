import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({ exercise }) => {
    return (
        <Link
            style={{
                padding: 10,
            }}
            className="exercise-card"
            to={`/exercise/${exercise?.exercise?.id || exercise.id}`}
        >
            <img
                src={exercise?.exercise?.gifUrl || exercise.gifUrl}
                alt={exercise?.exercise?.name || exercise.name}
                loading="lazy"
            />
            <Stack direction="row">
                <Button
                    sx={{
                        ml: "21px",
                        color: "#fff",
                        background: "#FFA9A9",
                        fontSize: "14px",
                        borderRadius: "20px",
                        textTransform: "capitalize",
                    }}
                >
                    {exercise?.exercise?.bodyPart || exercise.bodyPart}
                </Button>
                <Button
                    sx={{
                        ml: "21px",
                        color: "#fff",
                        background: "#FCC757",
                        fontSize: "14px",
                        borderRadius: "20px",
                        textTransform: "capitalize",
                    }}
                >
                    {exercise?.exercise?.target || exercise.target}
                </Button>
            </Stack>
            <Typography
                ml="21px"
                color="#000"
                fontWeight="bold"
                sx={{ fontSize: { lg: "24px", xs: "20px" } }}
                mt="11px"
                pb="10px"
                textTransform="capitalize"
                fontSize="24px"
            >
                {exercise?.exercise?.name || exercise?.name}
            </Typography>
        </Link>
    );
};

export default ExerciseCard;
