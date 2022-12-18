import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";

import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

function SearchExcecises({ setExercises, bodyPart, setBodyPart }) {
    const [search, setSearch] = useState(""); // 검색 키워드
    const [bodyParts, setBodyParts] = useState([]); // 카테고리 + all

    useEffect(() => {
        const fetchExercisesData = async () => {
            const bodyPartsData = await fetchData(
                "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
                exerciseOptions,
            );
            setBodyParts(["all", ...bodyPartsData]);
        };
        fetchExercisesData();
    }, []);

    const handleSearch = async () => {
        if (search) {
            const exercisesData = await fetchData(
                "https://exercisedb.p.rapidapi.com/exercises",
                exerciseOptions,
            );
            const searchedExercise = exercisesData.filter(
                (ex) =>
                    ex.name.toLocaleLowerCase().includes(search) ||
                    ex.target.toLocaleLowerCase().includes(search) ||
                    ex.bodyPart.toLocaleLowerCase().includes(search) ||
                    ex.equipment.toLocaleLowerCase().includes(search),
            );

            setSearch("");
            setExercises(searchedExercise);
        }
    };

    return (
        <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
            <Typography
                fontWeight="700"
                sx={{ fontSize: { lg: "44px", xs: "30px" } }}
                mb="50px"
                textAlign="center"
            >
                Awsome Exersices You <br /> Should Konw
            </Typography>

            <Box position="relative" mb="72px">
                <TextField
                    sx={{
                        input: {
                            fontWeight: "700",
                            border: "none",
                            borderRadius: "4px",
                        },
                        width: {
                            lg: "800px",
                            xs: "350px",
                        },
                        backgroundColor: "#fff",
                        borderRadius: "40px",
                    }}
                    height="76px"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value.toLocaleLowerCase());
                    }}
                    placeholder="Search Exercises"
                    type="text"
                />
                <Button
                    className="search-btn"
                    sx={{
                        bgcolor: "#FF2625",
                        color: "#fff",
                        textTransform: "none",
                        width: { lg: "175px", xs: "80px" },
                        fontSize: { lg: "20px", xs: "14px" },
                        height: "56px",
                        position: "absolute",
                        right: "0",
                    }}
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Box>

            <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
                <HorizontalScrollbar
                    data={bodyParts}
                    bodyPart={bodyPart}
                    setBodyPart={setBodyPart}
                />
            </Box>
        </Stack>
    );
}

export default SearchExcecises;
