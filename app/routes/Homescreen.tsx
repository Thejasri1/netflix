import { Box, Stack, Flex, Text, VStack, Spinner, HStack, Button, Img } from "@chakra-ui/react";
import COLORS from "~/utils/colors";
import { BiSearchAlt2, BiMoviePlay } from "react-icons/bi";
import { MdOutlineCategory, MdOutlineNotificationsActive } from "react-icons/md"
import { RiMovieFill } from "react-icons/ri"
import { AiFillHome, AiOutlineInfoCircle } from "react-icons/ai";
import { BsPlay } from "react-icons/bs"
import  { useState, useEffect } from "react";
import SearchScreen from "./SearchScreen";
import MoviesScreen from "./MoviesScreen"
import { getAllMovies, getMovieById, getAllTvshows, getTvshowById } from "../api/moviesList";
import CategoryScreen from "./CategoryScreen";
import NotificationsScreen from "./NotificationsScreen";
import { Row, Col } from "antd";
import {  useNavigate } from "react-router-dom";
import SeriesScreen from "./SeriesScreen";

const HomeScreen = () => {
  const navigate = useNavigate()
  const [moviesList, setMoviesList]: any = useState([])
  const [tvShowsList, setTvShowsList]: any = useState([])
  const [selectedOptionScreen, setSelectedOptionScreen]: any = useState("")
  const [selectedVideosList, setSelectedVideosList]: any = useState([])
  const [loader, setLoader]: any = useState(false)

  const getAllMoviesList = async () => {
    try {
      setLoader(true)
      const res: any = await getAllMovies()
      const tvShowsRes: any = await getAllTvshows()
      setTvShowsList(tvShowsRes.results)
      setMoviesList(res.results)
      setLoader(false)
    }
    catch (e) {
      console.log(e)
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
      setSelectedVideosList(res)
    }
    catch (e) {
      console.log(e)
    }
  }

  const onDisplayVideoScreen = (movieData: any) => {
    const typeOfText = movieData?.title ===undefined?"Tv":"Movie"
    return (  
      navigate(`/MoviePlayScreen`, { state: [movieData, typeOfText] })
    )
  }

  const onDisplayBackdropTvshow = async (tvShow: any) => {
    try {
      const tvShowId = tvShow.id
      const res = await getTvshowById(tvShowId)
      setSelectedVideosList(res)
    }
    catch (e) {
      console.log(e)
    }
  }

  //Home screen display
  const imageLink = "https://image.tmdb.org/t/p/original/"
  const homeScreenSection = () => {
    return (
      <Col style={{ overflowY: "scroll" }}>
        <Row>
          <Stack key={selectedVideosList.id} >
            {selectedVideosList.length !== 0 ? <Img src={`${imageLink}/${selectedVideosList.poster_path}`}
              alt={selectedVideosList.title} height={400} width={"100vw"} /> : <Img src="https://images5.alphacoders.com/594/thumb-1920-594616.jpg" height={400} width={"100vw"} alt="dummyImage" />}
            <Stack style={{
              position: "absolute",
              left: "0px",
              top: "0px", zIndex: 1
            }} width={300} padding={10}>
              <Text color={"red"} fontFamily={"fantasy"} fontSize={25}>{selectedVideosList.length !== 0 ? selectedVideosList.name === undefined ? selectedVideosList?.title : selectedVideosList?.name : "Pirates of the caribbean"}</Text>
              <HStack><Text color={COLORS.WHITE} fontFamily={"cursive"} fontWeight={300}>{selectedVideosList.length !== 0 ? selectedVideosList?.release_date === undefined ? selectedVideosList?.status : selectedVideosList?.release_date : "2007-05-25"}</Text>
                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" fontFamily={"cursive"} fontWeight={300}>U/A</Button>
                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" fontFamily={"cursive"} fontWeight={300}>HD</Button>
              </HStack>
              <Text color={COLORS.WHITE}>{selectedVideosList.length !== 0 ? selectedVideosList?.overview : "The story follows pirate Jack Sparrow (Johnny Depp) and blacksmith Will Turner (Orlando Bloom) as they rescue the kidnapped Elizabeth Swann (Keira Knightley) from the cursed crew of the Black Pearl, captained by Hector Barbossa (Geoffrey Rush), who become undead skeletons in moonlight."}</Text>
              {selectedVideosList.length !== 0 && <HStack>
                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" _hover={{ border: "3px solid" }} onClick={() => onDisplayVideoScreen(selectedVideosList)}>
                  <HStack>
                    <BsPlay color={COLORS.WHITE} size={30} />
                    <Text >
                      Play
                    </Text>
                  </HStack>
                </Button>
                <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" _hover={{ border: "3px solid" }}>
                  <HStack>
                    <AiOutlineInfoCircle color={COLORS.WHITE} size={30} />
                    <Text>
                      More Info
                    </Text>
                  </HStack>
                </Button>
              </HStack>
              }
            </Stack>
          </Stack>
        </Row>
        <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>Hollywood Movies</Text>
        <Row>
          {
            !loader && moviesList.map((m: any) => {
              return (
                <Flex key={m.id}>
                  <VStack mt={5} p={8}>
                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '2px solid' }} color={COLORS.WHITE}>
                      {m.poster_path !== "" && <Img src={`${imageLink}/${m.poster_path}`}
                        alt={m.title} height={160} width={130} onClick={() => onDisplayBackdropMovie(m)} />}
                    </Stack>
                    <Text color={COLORS.WHITE} width={100} >{m.poster_path !== "" && m.title}</Text>
                  </VStack>
                </Flex>
              )
            })
          }
        </Row>
        <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>New && Popular Tv Shows</Text>
        <Row>
          {
            !loader && tvShowsList.map((m: any) => {
              return (
                <Flex key={m.id}>
                  <VStack mt={5} p={8}>
                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '2px solid' }} color={COLORS.WHITE}>
                      {m.poster_path !== "" && <Img src={`${imageLink}/${m.poster_path}`}
                        alt={m.title} height={160} width={130} onClick={() => onDisplayBackdropTvshow(m)} />}
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

  //Text styling for side bar menu
  const textDecorationStyles = {
    textDecoration: "underLine", cursor: "pointer", textDecorationColor: "#E50914"
  }
  const { textDecoration, cursor, textDecorationColor } = textDecorationStyles
  return (
    <Box>
      {
        moviesList.length === 0 && <Stack bg={COLORS.BLACK} height={"100vh"}>
          <Row justify={"center"} >
            <VStack align={"center"} style={{ marginTop: "40vh" }}>
              <Img src="https://cdn.vectorstock.com/i/preview-1x/80/32/humpolec-czech-republic-march-23-2021-netflix-vector-37538032.jpg" height={100} width={300} />
              <Spinner color='red' width={50} height={50} />
            </VStack>
          </Row>
        </Stack>
      }
      {moviesList.length !== 0 && <Flex bg={COLORS.BLACK} height={"100vh"} m={0} hidden={moviesList?.length === 0 || moviesList?.length !== undefined}>
        <Stack p={10} justify={"space-between"}>
          <Stack>
            <HStack><Img src="https://cdn.vectorstock.com/i/preview-1x/80/32/humpolec-czech-republic-march-23-2021-netflix-vector-37538032.jpg" height={60} width={100} /></HStack>
            <HStack pt={10} onClick={() => setSelectedOptionScreen("Search")} _hover={{ textDecoration, cursor, textDecorationColor }}><BiSearchAlt2 color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Search</Text></HStack>
            <HStack pt={10} onClick={() => setSelectedOptionScreen("Home")}><AiFillHome color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Home</Text></HStack>
            <HStack pt={10} onClick={() => setSelectedOptionScreen("Series")}><RiMovieFill color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Tv shows</Text></HStack>
            <HStack pt={10} onClick={() => setSelectedOptionScreen("Movies")}><BiMoviePlay color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Movies</Text></HStack>
            <HStack pt={10} onClick={() => setSelectedOptionScreen("Categories")}><MdOutlineCategory color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Categories</Text></HStack>
          </Stack>
          <HStack mb={10} pb={10} onClick={() => setSelectedOptionScreen("Notifications")}><MdOutlineNotificationsActive color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Notifications</Text></HStack>
        </Stack>
        <>
          {
            selectedOptionScreen === "Search" ? <SearchScreen /> :
              selectedOptionScreen === "Categories" ? <CategoryScreen /> :
                selectedOptionScreen === "Notifications" ? <NotificationsScreen /> :
                  selectedOptionScreen === "Movies" ? <MoviesScreen /> :
                    selectedOptionScreen === "Series" ? <SeriesScreen /> : homeScreenSection()
          }
        </>
      </Flex>
      }
    </Box>
  );
};
export default HomeScreen;
