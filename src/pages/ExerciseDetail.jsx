import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { exerciseOptions, youtubeOptions, fetchData } from "../utils/fetchData";

import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";

function ExerciseDetail() {
    const [exerciseDetail, setExerciseDetail] = useState({});
    const [exerciseVideos, setExerciseVideos] = useState([]);
    const [exerciseTarget, setExerciseTarget] = useState([]);
    const [exerciseEquip, setExerciseEquip] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        const fetchExercisesData = async () => {
            try {
                let name;
                let target;
                let equipment;
                fetch(
                    `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
                    exerciseOptions,
                )
                    .then((response) => response.json())
                    .then((result) => {
                        setExerciseDetail(result);
                        name = result.name;
                        target = result.target;
                        equipment = result.equipment;

                        fetch(
                            `https://youtube-search-and-download.p.rapidapi.com/search?query=${name}`,
                            youtubeOptions,
                        )
                            .then((response) => response.json())
                            .then((result2) =>
                                setExerciseVideos(result2.contents),
                            )
                            .catch((error2) => console.log("error2", error2));

                        fetch(
                            `https://exercisedb.p.rapidapi.com/exercises/target/${target}`,
                            exerciseOptions,
                        )
                            .then((response) => response.json())
                            .then((result) => setExerciseTarget(result))
                            .catch((error) => console.log("error", error));

                        fetch(
                            `https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}`,
                            exerciseOptions,
                        )
                            .then((response) => response.json())
                            .then((result) => setExerciseEquip(result))
                            .catch((error) => console.log("error", error));
                    })
                    .catch((error) => console.log("error", error));
            } catch (error) {
                console.log(error);
            }
        };
        fetchExercisesData();
    }, [id]);

    return (
        <Box>
            <Detail exerciseDetail={exerciseDetail} />
            <ExerciseVideos
                exerciseVideos={exerciseVideos}
                name={exerciseDetail.name}
            />
            <SimilarExercises target={exerciseTarget} equip={exerciseEquip} />
        </Box>
    );
}

export default ExerciseDetail;
