import { Box, Stack, Flex, Text, VStack, Spinner, HStack, Button, Img } from "@chakra-ui/react";
import COLORS from "~/utils/colors";
import { BiSearchAlt2, BiMoviePlay } from "react-icons/bi";
import { MdOutlineCategory, MdOutlineNotificationsActive } from "react-icons/md"
import { RiMovieFill } from "react-icons/ri"
import { AiFillHome } from "react-icons/ai";
import { BsPlay } from "react-icons/bs"
import { useState, useEffect } from "react";
import SearchScreen from "./SearchScreen";
import MoviesScreen from "./MoviesScreen"
import { getAllMovies, getMovieById, getAllTvshows, getTvshowById, getTopRatedTvshows, getTopRatedMovies, getNowPlayingMovies, getTrending } from "../api/moviesList";
import CategoryScreen from "./CategoryScreen";
import NotificationsScreen from "./NotificationsScreen";
import { Row, Col } from "antd";
import { isMobile, isTablet, isAndroid } from 'react-device-detect';
import { useNavigate } from "react-router-dom";
import SeriesScreen from "./SeriesScreen";

const HomeScreen = () => {
  const navigate = useNavigate()
  const [moviesList, setMoviesList]: any = useState([])
  const [tvShowsList, setTvShowsList]: any = useState([])
  const [selectedOptionScreen, setSelectedOptionScreen]: any = useState("")
  const [selectedVideosList, setSelectedVideosList]: any = useState([])
  const [topRatedTvShows, setTopRatedTvShows]: any = useState([])
  const [topRatedMovies, setTopRatedMovies]: any = useState([])
  const [nowPlayingMovies, setNowPlayingMovies]: any = useState([])
  const [trending, setTrending]: any = useState([])
  const [loader, setLoader]: any = useState(false)

  const getAllMoviesList = async () => {
    try {
      setLoader(true)
      const moviesData: any = await getAllMovies()
      const tvShowsRes: any = await getAllTvshows()
      const topRatedTvshows = await getTopRatedTvshows()
      const topRatedMoviesList = await getTopRatedMovies()
      const playingMovies = await getNowPlayingMovies()
      const trendingList = await getTrending()
      Promise.all([moviesData, tvShowsRes, topRatedTvshows, topRatedMoviesList, playingMovies, trendingList]).then((values: any) => {
        setMoviesList(values[0].results)
        setTvShowsList(values[1].results)
        setTopRatedTvShows(values[2].results)
        setTopRatedMovies(values[3].results)
        setNowPlayingMovies(values[4].results)
        setTrending(values[5].results)
      });
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
    const typeOfText = movieData?.title === undefined ? "Tv" : "Movie"
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
          <Stack key={selectedVideosList.id} mb={10} pb={10} >
            {selectedVideosList.length !== 0 ? <Img src={`${imageLink}/${selectedVideosList.poster_path}`}
              alt={selectedVideosList.title} height={"50vh"} width={"100vw"} /> : <Img src="https://images5.alphacoders.com/594/thumb-1920-594616.jpg" height={400} width={"100vw"} alt="dummyImage" />}
            <Stack style={{
              position: "absolute",
              left: "0px",
              top: "0px", zIndex: 1
            }} width={isMobile||isAndroid||isTablet ?300:"30vw"} padding={10}  h={"50vh"}>
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
              </HStack>
              }
            </Stack>
          </Stack>
        </Row>
        <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>Top Rated Movies</Text>
        <Row>
          {
            !loader && topRatedMovies.map((m: any) => {
              return (
                <Flex key={m.id}>
                  <VStack mt={5} p={8}>
                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
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
        <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>Top Rated Tv Shows</Text>
        <Row>
          {
            !loader && topRatedTvShows.map((m: any) => {
              return (
                <Flex key={m.id}>
                  <VStack mt={5} p={8}>
                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
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
        <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>Hollywood Movies</Text>
        <Row>
          {
            !loader && moviesList.map((m: any) => {
              return (
                <Flex key={m.id}>
                  <VStack mt={5} p={8}>
                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
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
        <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>New && Popular Tv Shows</Text>
        <Row>
          {
            !loader && tvShowsList.map((m: any) => {
              return (
                <Flex key={m.id}>
                  <VStack mt={5} p={8}>
                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
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
        <Text color={COLORS.WHITE} fontSize={20} fontWeight={500} fontFamily={"sans-serif"}>Now Playing Movies</Text>
        <Row>
          {
            !loader && nowPlayingMovies.map((m: any) => {
              return (
                <Flex key={m.id}>
                  <VStack mt={5} p={8}>
                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
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

  //Text styling for side bar menu
  const textDecorationStyles = {
    textDecoration: "underLine", cursor: "pointer", textDecorationColor: "#E50914"
  }
  const { textDecoration, cursor, textDecorationColor } = textDecorationStyles

  return (
    <Box height={"100vh"} width={"100vw"} overflowY={"scroll"} top={0} left={0} m={0}>
      {moviesList.length !== 0 && <Stack bg={COLORS.BLACK} h={60} width={"100vw"} display={isMobile || isTablet || isAndroid ? "block" : "none"}>
        <Row justify={"space-around"}>
          <Col>
            <Img src="https://www.freepnglogos.com/uploads/netflix-logo-circle-png-5.png" height={40} width={50} m={10} />
          </Col>
          <Col style={{ marginTop: "10px", paddingTop: "10px" }}>
            <BiSearchAlt2 color={COLORS.WHITE} onClick={() => setSelectedOptionScreen("Search")} size={20} style={{ marginRight: "10px" }} />
            <AiFillHome color={COLORS.WHITE} onClick={() => setSelectedOptionScreen("Home")} size={20} style={{ marginRight: "10px" }} />
            <RiMovieFill color={COLORS.WHITE} onClick={() => setSelectedOptionScreen("Series")} size={20} style={{ marginRight: "10px" }} />
            <BiMoviePlay color={COLORS.WHITE} onClick={() => setSelectedOptionScreen("Movies")} size={20} style={{ marginRight: "10px" }} />
            <MdOutlineCategory color={COLORS.WHITE} onClick={() => setSelectedOptionScreen("Categories")} size={20} style={{ marginRight: "10px" }} />
            <MdOutlineNotificationsActive color={COLORS.WHITE} onClick={() => setSelectedOptionScreen("Notifications")} size={20} />
            {trending?.length !== 0 && <Stack align={"end"}>
              <Text color={"red"} marginTop="-35" marginRight={"-20"}>{trending?.length - 1}+</Text>
            </Stack>}
          </Col>
        </Row>
      </Stack>
      }
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
        <Stack p={10} justify={"space-between"} display={isMobile || isTablet || isAndroid ? "none" : "block"}>
          <HStack><Img src="https://cdn.vectorstock.com/i/preview-1x/80/32/humpolec-czech-republic-march-23-2021-netflix-vector-37538032.jpg" height={60} width={100} /></HStack>
          <HStack pt={10} onClick={() => setSelectedOptionScreen("Search")} _hover={{ textDecoration, cursor, textDecorationColor }}><BiSearchAlt2 color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Search</Text></HStack>
          <HStack pt={10} onClick={() => setSelectedOptionScreen("Home")}><AiFillHome color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Home</Text></HStack>
          <HStack pt={10} onClick={() => setSelectedOptionScreen("Series")}><RiMovieFill color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Tv shows</Text></HStack>
          <HStack pt={10} onClick={() => setSelectedOptionScreen("Movies")}><BiMoviePlay color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Movies</Text></HStack>
          <HStack pt={10} onClick={() => setSelectedOptionScreen("Categories")}><MdOutlineCategory color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Categories</Text></HStack>
          <HStack pt={10} onClick={() => setSelectedOptionScreen("Notifications")}><MdOutlineNotificationsActive color={COLORS.WHITE} /><Text _hover={{ textDecoration, cursor, textDecorationColor }} color={COLORS.WHITE}>Notifications</Text>{trending?.length !== 0 && <sup style={{ marginTop: "-25px", marginLeft: "-3px", marginRight: "-5px", color: "red" }}> {trending?.length - 1}+</sup>}</HStack>
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
