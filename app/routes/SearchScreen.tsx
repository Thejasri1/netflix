import { Box, Stack, Text, Img, Flex, VStack, Spinner, Input } from "@chakra-ui/react";
import COLORS from "~/utils/colors";
import { useState, useEffect } from "react"
import { Row } from 'antd';
import { isMobile, isTablet, isAndroid } from 'react-device-detect';
import { useNavigate } from "react-router-dom";
import { getAllMovies, getMovieById } from "../api/moviesList"

const SearchScreen = () => {
    const [selectedFont, setSelectedFont]: any = useState("")
    const [loader, setLoader]: any = useState(false)
    const [moviesList, setMoviesList]: any = useState([])
    const navigate = useNavigate()

    const getAllMoviesList = async () => {
        try {
            setLoader(true)
            const res: any = await getAllMovies()
            setMoviesList(res.results)
            setLoader(false)
        }
        catch (e) {
            console.log(e)
        }
    }

    const selectedKeys = (e: any) => {
        try {
            const key = e.target.value
            setSelectedFont(key)
        }
        catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getAllMoviesList()
    }, [])

    const onDisplayVideoScreen = async (videoData: any) => {
        try {
            const res = await getMovieById(videoData.id)
            const typeOfText = videoData?.title === undefined ? "Tv" : "Movie"
            return (
                navigate(`/MoviePlayScreen`, { state: [res, typeOfText] })
            )
        }
        catch (e) {
            console.log(e)
        }
    }


    const filteringSearchedMovies: any = moviesList.filter((m: any) => m?.title?.toLocaleLowerCase().includes(selectedFont) || m?.name?.toLocaleLowerCase().includes(selectedFont))
    const imageLink = "https://image.tmdb.org/t/p/original/"

    return (
        <Box overflow={"scroll"} h={"100vh"} width={"100vw"}>
            <Stack m={10} p={10}>
                <Input color={COLORS.WHITE} bg={"transparent"} fontFamily={"sans-serif"} width={isMobile || isTablet || isAndroid ? "70vw" : "50vw"} border={"1px solid"} mt={10} onChange={selectedKeys} borderRadius={5} p={5} placeholder=" Search movies, web series " />
                <Text color={COLORS.WHITE} bg={"transparent"} fontSize={16} fontFamily={"sans-serif"} pt={10}>{!selectedFont ? "Top Searches" : selectedFont}</Text>
                <Row>
                    {
                        !loader && filteringSearchedMovies?.map((m: any) => {
                            return (
                                <Flex key={m.id}>
                                    <VStack mt={5} p={10}>
                                        <Stack _hover={{ borderColor: COLORS.WHITE, border: '3px solid' ,transform:"scale(2,2)"}} color={COLORS.WHITE} align="center">
                                            {m.poster_path !== "" && <Img src={`${imageLink}/${m.poster_path}`}
                                                alt={m.title} height={200} width={130} onClick={() => onDisplayVideoScreen(m)} />}
                                        </Stack>
                                    </VStack>
                                </Flex>
                            )
                        })
                    }

                </Row>
            </Stack>
                <Stack align={"center"}>
                    { !loader && filteringSearchedMovies.length === 0 &&
                            <Text color={"red"} fontFamily={"fantasy"} fontSize={20}>Movie Not Found</Text>
                    }
                </Stack>
            <Stack align={"center"}>
                {loader && <Spinner color="red" height={50} width={50} />}
            </Stack>
        </Box>

    )

}
export default SearchScreen