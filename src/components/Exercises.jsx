import React, { useState, useEffect } from "react";
import { Pagination } from "@mui/material/";
import { Box, Stack, Typography } from "@mui/material/";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";

function Exercises({ exercises, bodyPart, setExercises }) {
    const [currentPage, setCurrentPage] = useState(1);
    const exercisePerPage = 9;
    const indexOfLastExercise = currentPage * exercisePerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisePerPage;
    const currentExercises = exercises.slice(
        indexOfFirstExercise,
        indexOfLastExercise,
    );

    const paginate = (e, value) => {
        setCurrentPage(value);
        window.scrollTo({ top: 1800, behavior: "smooth" });
    };

    useEffect(() => {
        const fetchExerciesesData = async () => {
            let exercisesData = [];

            if (bodyPart === "all") {
                exercisesData = await fetchData(
                    "https://exercisedb.p.rapidapi.com/exercises",
                    exerciseOptions,
                );
            } else {
                exercisesData = await fetchData(
                    `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
                    exerciseOptions,
                );
            }

            setExercises(exercisesData);
        };
        fetchExerciesesData();
    }, [bodyPart]);

    return (
        <Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
            <Typography variant="h3" mb="46px">
                Showing Results
            </Typography>

            <Stack
                direction="row"
                sx={{ gap: { lg: "110px", xs: "50px" } }}
                flexWrap="wrap"
                justifyContent="center"
            >
                {currentExercises.map((exercise, index) => (
                    <ExerciseCard key={exercise.id} exercise={{ exercise }} />
                ))}
            </Stack>

            <Stack mt="100px" alignItems="center">
                {exercises.length > exercisePerPage && (
                    <Pagination
                        count={Math.ceil(exercises.length / exercisePerPage)}
                        defaultPage={1}
                        color="standard"
                        shape="rounded"
                        page={currentPage}
                        onChange={paginate}
                        size="large"
                    />
                )}
            </Stack>
        </Box>
    );
}

export default Exercises;
