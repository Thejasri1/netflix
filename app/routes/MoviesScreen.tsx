import { Box, Stack, Flex, Text, VStack, Spinner, HStack, Button, Img } from "@chakra-ui/react";
import COLORS from "~/utils/colors";
import { BsPlay } from "react-icons/bs"
import React, { useState, useEffect } from "react";
import { getAllMovies, getMovieById } from "../api/moviesList";
import { Row, Col } from "antd";
import { isMobile, isTablet, isAndroid } from 'react-device-detect';
import {  useNavigate } from "react-router-dom";

const MoviesScreen = () => {
  const navigate = useNavigate()
  const [moviesList, setMoviesList]: any = useState([])
  const [selectedMovie, setSelectedMovie]: any = useState([])
  const [loader, setLoader]: any = useState(false)

  const getAllMoviesList = async () => {
    try {
      setLoader(true)
      const res: any = await getAllMovies()
      setMoviesList(res.results)
      setLoader(false)
    }
    catch (e) {
      console.log( e)
    }
  }
  useEffect(() => {
    getAllMoviesList()
  }, [])

  //Displaying movie on selected movie
  const onDisplayBackdropMovie = async (movie: any) => {
    try {
      const movieId = movie.id
      const res = await getMovieById(movieId)
      setSelectedMovie(res)
    }
    catch (e) {
      console.log(e)
    }
  }
  const onDisplayMoviePlayScreen = (movieData: any) => {
    return (
      navigate(`/MoviePlayScreen`, { state: movieData })
    )
  }

  //Home screen display
  const imageLink = "https://image.tmdb.org/t/p/original/"
  const MoviesScreenSection = () => {
    return (
      <Col style={{ overflowY: "scroll" }}>
        <Row>
          <Stack key={selectedMovie.id}>
            {selectedMovie.length !== 0 ? <Img src={`${imageLink}/${selectedMovie.poster_path}`}
              alt={selectedMovie.title} height={"50vh"} width={"100vw"} /> : <Img src="https://cdn.dnaindia.com/sites/default/files/styles/full/public/2019/04/27/817597-avengers-endgame.jpg" height={400} width={"100vw"}  alt="dummyImage" />}
            <Stack style={{
              position: "absolute",
              left: "0px",
              top: "0px", zIndex: 1
            }}width={isMobile||isAndroid||isTablet ?300:"30vw"} padding={10}  h={"50vh"}>
              <Text color={"red"} fontFamily={"fantasy"} fontSize={25}>{selectedMovie.length !== 0 ? selectedMovie?.title : "Avengers End Game"}</Text>
              <HStack><Text color={COLORS.WHITE} fontFamily={"cursive"} fontWeight={300}>{selectedMovie.length !== 0 ? selectedMovie?.release_date : "2019-04-26"}</Text>
                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" fontFamily={"cursive"} fontWeight={300}>U/A</Button>
                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" fontFamily={"cursive"} fontWeight={300}>HD</Button>
              </HStack>
              <Text color={COLORS.WHITE}>{selectedMovie.length !== 0 ? selectedMovie.overview : "Nebula and Tony Stark are stranded in space following their defeat by Thanos on Titan, but are returned to Earth by Carol Danvers and reunited with Natasha Romanoff, Bruce Banner, Steve Rogers, Rocket, Thor, and James Rhodes."}</Text>
              {selectedMovie.length !== 0 && <HStack>
                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" _hover={{ border: "3px solid" }} onClick={() => onDisplayMoviePlayScreen(selectedMovie)}>
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
        <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>Movies</Text>
        <Row>
          {
            !loader && moviesList.map((m: any) => {
              return (
                <Flex key={m.id}>
                  <VStack mt={5} p={8}>
                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid' ,transform:"scale(1.10,1.10)"}} color={COLORS.WHITE} align="center">
                      {m.poster_path !== "" && <Img src={`${imageLink}/${m.poster_path}`}
                        alt={m.title} height={200} width={150} onClick={() => onDisplayBackdropMovie(m)} />}
                    </Stack>
                    <Text color={COLORS.WHITE} width={100} >{m.poster_path !== "" && m.title}</Text>
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
    <Box  h={"100vh"} overflowY="scroll" width={"100vw"}>
      {
        moviesList.length === 0 && <Stack bg={COLORS.BLACK} height={"100vh"} w={"100vw"}>
          <Row justify={"center"} >
            <VStack align={"center"} style={{ marginTop: "40vh" }}>
              <Img src="https://cdn.vectorstock.com/i/preview-1x/80/32/humpolec-czech-republic-march-23-2021-netflix-vector-37538032.jpg" height={100} width={300} />
              <Spinner color='red' width={50} height={50} />
            </VStack>
          </Row>
        </Stack>
      }

{MoviesScreenSection()}
    </Box>
  );
};
export default MoviesScreen;
