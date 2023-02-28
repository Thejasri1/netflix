import { Box, Stack, Flex, Text, VStack, Spinner, HStack, Button, Img } from "@chakra-ui/react";
import COLORS from "~/utils/colors";
import { BsPlay } from "react-icons/bs"
import React, { useState, useEffect } from "react";
import { getAllTvshows, getTvshowById } from "../api/moviesList";
import { Row, Col } from "antd";
import { isMobile, isTablet, isAndroid } from 'react-device-detect';
import {  useNavigate } from "react-router-dom";

const SeriesScreen = () => {
    const navigate = useNavigate()
    const [tvShowsList, setTvshowsList]: any = useState([])
    const [selectedTvshow, setSelectedTvshow]: any = useState([])
    const [loader, setLoader]: any = useState(false)

    const getAllTvshowsList = async () => {
        try {
            setLoader(true)
            const res: any = await getAllTvshows()
            setTvshowsList(res.results)
            setLoader(false)
        }
        catch (e) {
            console.log("e", e)
        }
    }
    useEffect(() => {
        getAllTvshowsList()
    }, [])

    //Displaying movie on selected movie
    const onDisplayBackdropTvshow = async (show: any) => {
        try {
            const showId = show.id
            const res = await getTvshowById(showId)
            setSelectedTvshow(res)
        }
        catch (e) {
            console.log(e)
        }
    }
    const onDisplayMoviePlayScreen = (tvShowData: any) => {
        return (
            navigate(`/MoviePlayScreen`, { state: [tvShowData ,"Tv"]})
        )
    }

    //Home screen display
    const imageLink = "https://image.tmdb.org/t/p/original/"
    const SeriesScreenSection = () => {
        return (
            <Col style={{ overflowY: "scroll" }}>
                <Row>
                    <Stack key={selectedTvshow.id}>
                        {selectedTvshow.length !== 0 ? <Img src={`${imageLink}/${selectedTvshow.poster_path}`}
                            alt={selectedTvshow.title} height={"50vh"} width={"100vw"} /> : <Img src="https://scatteredquotes.com/wp-content/uploads/2022/11/Wednesday-Quotes-The-Best-Quotes-from-the-Netflix-TV-series-Wednesday.jpg" height={400} width={"100vw"} alt="dummyImage" />}
                        <Stack style={{
                            position: "absolute",
                            left: "0px",
                            top: "0px", zIndex: 1
                        }} width={isMobile||isAndroid||isTablet ?300:"30vw"} padding={10}  h={"50vh"}>
                            <Text color={"red"} fontFamily={"fantasy"} fontSize={25}>{selectedTvshow.length !== 0 ? selectedTvshow?.name : "WEDNESSDAY"}</Text>
                            <HStack><Text color={COLORS.WHITE} fontFamily={"cursive"} fontWeight={300}>{selectedTvshow.length !== 0 ? selectedTvshow?.release_date : "2022-11-16"}</Text>
                                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" fontFamily={"cursive"} fontWeight={300}>U/A</Button>
                                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" fontFamily={"cursive"} fontWeight={300}>HD</Button>
                            </HStack>
                            <Text color={COLORS.WHITE}>{selectedTvshow.length !== 0 ? selectedTvshow.overview : "Wednesday is an American coming-of-age supernatural comedy horror streaming television series based on the character Wednesday Addams by Charles Addams."}</Text>
                            {selectedTvshow.length !== 0 && <HStack>
                                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" _hover={{ border: "3px solid" }} onClick={() => onDisplayMoviePlayScreen(selectedTvshow)}>
                                    <HStack>
                                        <BsPlay color={COLORS.WHITE} size={30} />
                                        <Text >
                                            Play
                                        </Text>
                                    </HStack>
                                </Button>
                            </HStack>
                            }
                        </Stack>
                    </Stack>
                </Row>
                <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>Tv Shows</Text>
                <Row>
                    {
                        !loader && tvShowsList.map((m: any) => {
                            return (
                                <Flex key={m.id}>
                                    <VStack mt={5} p={8}>
                                        <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid',transform:"scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
                                            {m.poster_path !== "" && <Img src={`${imageLink}/${m.poster_path}`}
                                                alt={m.title} height={200} width={150} onClick={() => onDisplayBackdropTvshow(m)} />}
                                        </Stack>
                                        <Text color={COLORS.WHITE} width={100} >{m.poster_path !== "" && m.name}</Text>
                                    </VStack>
                                </Flex>
                            )
                        })
                    }
                </Row>
                <Stack align={"center"}>
                    {loader && <Spinner color="red" height={50} width={50} />}
                </Stack>
            </Col>
        )
    }

    return (
        <Box h={"100vh"} overflowY="scroll" width={"100vw"}>
            {
                tvShowsList.length === 0 && <Stack bg={COLORS.BLACK} height={"100vh"} w={"100vw"}>
                    <Row justify={"center"} >
                        <VStack align={"center"} style={{ marginTop: "40vh" }}>
                            <Img src="https://cdn.vectorstock.com/i/preview-1x/80/32/humpolec-czech-republic-march-23-2021-netflix-vector-37538032.jpg" height={100} width={300} />
                            <Spinner color='red' width={50} height={50} />
                        </VStack>
                    </Row>
                </Stack>
            }

            {SeriesScreenSection()}
        </Box>
    );
};
export default SeriesScreen;