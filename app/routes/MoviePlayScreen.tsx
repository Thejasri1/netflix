import { Box, Stack, Text, Button, HStack, VStack, Img } from "@chakra-ui/react"
import COLORS from "~/utils/colors"
import { Row, Col } from "antd"
import { useLocation, useNavigate } from "react-router-dom"
import { RiArrowGoBackFill } from "react-icons/ri"
import { BsPlayCircle } from "react-icons/bs"
import { useState, useEffect } from "react"
import { getMovieVideoById, getTvshowsVideoById } from "../api/moviesList"
import {isMobile,isAndroid} from 'react-device-detect';
import YouTube from 'react-youtube';

const MoviePlayScreen = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const data = location?.state&&location?.state[0]
    const typeSelected = location?.state&&location?.state[1]
    const [movieInfo, setMovieInfo]: any = useState([])
    const [playMovie, setPlayMovie]: any = useState(false)
    
    const moviePlay = async () => {
        try {
            var res;
            if (typeSelected==="Movie") {
                res = await getMovieVideoById(data.id)
            }
            else {
                res = await getTvshowsVideoById(data.id)
            }
            const videoToPlay = res.videos.results.find((m: any) => m.name === "Official Trailer")
            setMovieInfo(videoToPlay)
        }
        catch (e) {
            console.log(e)

        }
    }
    useEffect(() => {
        moviePlay()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    //Back navigate to home page
    const backToHomeScreen = () => {
        return (
            navigate(`/`)
        )
    }
    const imageLink = "https://image.tmdb.org/t/p/original/"
    return (
        <Box bg={COLORS.BLACK} width={"100vw"} h={"100vh"} m={0} overflow={"scroll"}>
            {playMovie ? <VStack justify={"center"} >
                <HStack>
                    <RiArrowGoBackFill color={COLORS.WHITE} size={20} onClick={backToHomeScreen} />
                    <Text color={COLORS.WHITE} fontSize={16} fontWeight={500}>Back to home</Text>
                </HStack>
                <YouTube videoId={movieInfo?.key} id={movieInfo?.id} />
            </VStack> :
                <Col>
                    <Row>
                        <Stack key={data?.id} width={"10vw"} m={0}>
                            {data?.length !== 0 ? <Img src={`${imageLink}/${data?.poster_path}`}
                                alt={data?.title} height={"100vh"} width={"100vw"} onClick={() => setPlayMovie(true)} /> : <Img src="https://wallpaperaccess.com/full/2331348.jpg" height={"100vh"} width={"100vw"} alt="dummyImage" />}
                            <Stack style={{
                                position: "absolute",
                                left: "0px",
                                top: "0px", zIndex: 1
                            }} width={300} padding={10}>
                                <HStack pb={10}>
                                    <RiArrowGoBackFill color={COLORS.WHITE} size={20} onClick={backToHomeScreen} />
                                    <Text color={COLORS.WHITE} >Back to home</Text>
                                </HStack>
                                <Text color={"red"} fontFamily={"fantasy"} fontSize={isMobile||isAndroid?20:50}>{data?.title===undefined?data?.name:data?.title}</Text>
                                <HStack><Text color={COLORS.WHITE} fontFamily={"cursive"} fontWeight={300}>{data?.release_date===undefined?data?.status:data?.release_date}</Text>
                                    <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" fontFamily={"cursive"} fontWeight={300}>U/A</Button>
                                    <Button bg={"transparent"} color={COLORS.WHITE} border="1px solid" fontFamily={"cursive"} fontWeight={300}>HD</Button>
                                </HStack>
                                
                                <HStack color={COLORS.WHITE} >
                                <Text color={COLORS.WHITE}>Script :</Text>
                                    {data?.genres.map((g: any) => {
                                        return (
                                            <Text key={data?.id}>
                                                {g?.name}
                                            </Text>
                                        )
                                    })}
                                </HStack>
                                <Text color={COLORS.WHITE}>{data?.overview}</Text>
                                <HStack color={COLORS.WHITE}>
                                    <Text color={COLORS.WHITE}>Audio :</Text>
                                    <HStack color={COLORS.WHITE} >
                                        {data?.spoken_languages.map((g: any) => {
                                            return (
                                                <Text key={data?.id}>
                                                    {g?.name}
                                                </Text>
                                            )
                                        })}
                                    </HStack>
                                </HStack>
                                <Button bg={"transparent"} onClick={() => setPlayMovie(true)} border="none" color={"red"}>
                                    <Text pr={5} fontSize={30} fontWeight={800} fontFamily={"sans-serif"}>
                                        Watch Trailer
                                    </Text>
                                    <BsPlayCircle color={"red"} size={30} />
                                </Button>
                            </Stack>
                        </Stack>
                    </Row>
                </Col>
            }
        </Box>
    )
}
export default MoviePlayScreen