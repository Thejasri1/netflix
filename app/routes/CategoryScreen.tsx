import {
    Text, Box, Stack, VStack, Flex, Img, Spinner, Menu, Button,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react"
import COLORS from "~/utils/colors"
import { getAllMovies, getMovieById, getAllTvshows, getTvshowById } from "~/api/moviesList"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { IoMdArrowDropdown } from "react-icons/io"
import { Row } from "antd"
import { isMobile, isTablet, isAndroid } from 'react-device-detect';

const CategoryScreen = () => {
    const navigate = useNavigate()
    const [allMovies, setAllMovie]: any = useState([])
    const [selectedLanguageMv, setSelectedLanguageMv]: any = useState([])
    const [selectedLanguageTv, setSelectedLanguageTv]: any = useState([])
    const [loader, setLoader]: any = useState(false)
    const [allTvShows, setAllTvShows]: any = useState([])

    const moviesListCall = async () => {
        try {
            setLoader(true)
            const moviesRes = await getAllMovies()
            const tvshowsRes = await getAllTvshows()
            setAllMovie(moviesRes.results)
            setAllTvShows(tvshowsRes.results)
            setLoader(false)
        }
        catch (e) {
            console.log(e)
        }
    }
    useEffect(() => { moviesListCall() }, [])
    const callMovieDBbySelectedLanguage = async (language: any) => {
        const languageMatchedMoviesList = allMovies.filter((m: any) => m?.original_language.includes(language))
        const languageMatchedTvList = allTvShows.filter((m: any) => m?.original_language.includes(language))
        setSelectedLanguageMv(languageMatchedMoviesList)
        setSelectedLanguageTv(languageMatchedTvList)
    }
    const imageLink = "https://image.tmdb.org/t/p/original/"

    const onDisplayBackdropMovie = async (data: any) => {
        try {
            const videoId = data.id
            const res = await getMovieById(videoId)
            return (
                navigate(`/MoviePlayScreen`, { state: [res, "Movie"] })
            )
        }
        catch (e) {
            console.log(e)
        }
    }

    const onDisplayBackdropTvshow = async (data: any) => {
        try {
            const videoId = data.id
            const res = await getTvshowById(videoId)
            return (
                navigate(`/MoviePlayScreen`, { state: [res, "Tv"] })
            )
        }
        catch (e) {
            console.log(e)
        }
    }

    return (
        <Box backgroundColor={COLORS.BLACK} height="100vh" width="100vw" overflow={"scroll"}>
            <Flex display={isMobile || isTablet || isAndroid ? "none" : "block"}>
            <Stack display={isMobile || isTablet || isAndroid ? "none" : "block"} ml={5} mt={10}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<IoMdArrowDropdown size={30}/>} border={"2px solid white"} bg={"transparent"} width={"50vw"} color={COLORS.WHITE} borderRadius={5}>
                        <Text fontFamily="sans-serif" fontSize={16} m={10} >Select by language Category</Text>
                    </MenuButton>
                    <MenuList w={"50vw"} bg={"transparent"} color={COLORS.WHITE} p={10} m={10} >
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0px solid"} onClick={() => callMovieDBbySelectedLanguage("en")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>English</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("id")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Indonesian</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("hi")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Hindi</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("ma")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Maliyalam</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("ja")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Japanese</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("ta")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Tamil</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("te")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Telugu</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("sp")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Spanish</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("ru")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Russian</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("po")} _hover={{border:"1px solid white"}}><Text fontSize={14} m={10}>Portuguese</Text></MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
                <Row>
                    {
                        !loader && selectedLanguageMv.map((m: any) => {
                            return (
                                <Flex key={m.id} >
                                    <VStack mt={5} p={8}>
                                        <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
                                            {m.poster_path !== "" && <Img src={`${imageLink}/${m?.poster_path}`}
                                                alt={m?.title} height={200} width={150} onClick={() => onDisplayBackdropMovie(m)} />}
                                        </Stack>
                                        <Text color={COLORS.WHITE} width={100} >{m?.poster_path !== "" && m?.title}</Text>
                                    </VStack>
                                </Flex>
                            )
                        })
                    }
                    {
                        !loader && selectedLanguageTv.map((m: any) => {
                            return (
                                <Flex key={m.id} >
                                    <VStack mt={5} p={8}>
                                        <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
                                            {m?.poster_path !== "" && <Img src={`${imageLink}/${m?.poster_path}`}
                                                alt={m?.title} height={200} width={150} onClick={() => onDisplayBackdropTvshow(m)} />}
                                        </Stack>
                                        <Text color={COLORS.WHITE} width={100} >{m?.poster_path !== "" && m?.name}</Text>
                                    </VStack>
                                </Flex>
                            )
                        })
                    }
                </Row>
            </Flex>
            <Stack display={isMobile || isTablet || isAndroid ? "Block" : "none"} ml={5} mt={10}>
                <Menu>
                    <MenuButton as={Button} rightIcon={<IoMdArrowDropdown />} border={"2px solid white"} bg={"transparent"} width={"90vw"} color={COLORS.WHITE} borderRadius={5} p={5}>
                        <Text fontFamily="fantasy" fontSize={18} m={10} >Select Category</Text>
                    </MenuButton>
                    <MenuList w={"90vw"} bg={"transparent"} color={COLORS.WHITE} p={10} m={10} >
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0px solid"} onClick={() => callMovieDBbySelectedLanguage("en")}><Text fontFamily="fantasy" fontSize={18} m={10}>English</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("id")}><Text fontFamily="fantasy" fontSize={18} m={10}>Indonesian</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("hi")}><Text fontFamily="fantasy" fontSize={18} m={10}>Hindi</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("ma")}><Text fontFamily="fantasy" fontSize={18} m={10}>Maliyalam</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("ja")}><Text fontFamily="fantasy" fontSize={18} m={10}>Japanese</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("ta")}><Text fontFamily="fantasy" fontSize={18} m={10}>Tamil</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("te")}><Text fontFamily="fantasy" fontSize={18} m={10}>Telugu</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("sp")}><Text fontFamily="fantasy" fontSize={18} m={10}>Spanish</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("ru")}><Text fontFamily="fantasy" fontSize={18} m={10}>Russian</Text></MenuItem>
                        <MenuItem bg={"transparent"} cursor="pointer" border={"0 solid"} onClick={() => callMovieDBbySelectedLanguage("po")}><Text fontFamily="fantasy" fontSize={18} m={10}>Portuguese</Text></MenuItem>
                    </MenuList>
                </Menu>
            </Stack>
            <Row style={{display:isMobile || isTablet || isAndroid ? "Block" : "none"}}>
                {
                    !loader && selectedLanguageMv.map((m: any) => {
                        return (
                            <Flex key={m.id} >
                                <VStack mt={5} p={8}>
                                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
                                        {m.poster_path !== "" && <Img src={`${imageLink}/${m?.poster_path}`}
                                            alt={m?.title} height={200} width={"90vw"} onClick={() => onDisplayBackdropMovie(m)} />}
                                    </Stack>
                                    <Text color={COLORS.WHITE} >{m?.poster_path !== "" && m?.title}</Text>
                                </VStack>
                            </Flex>
                        )
                    })
                }
                {
                    !loader && selectedLanguageTv.map((m: any) => {
                        return (
                            <Flex key={m.id} >
                                <VStack mt={5} p={8}>
                                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '4px solid', transform: "scale(1.10,1.10)" }} color={COLORS.WHITE} align="center">
                                        {m?.poster_path !== "" && <Img src={`${imageLink}/${m?.poster_path}`}
                                            alt={m?.title} height={200} width={"90vw"} onClick={() => onDisplayBackdropTvshow(m)} />}
                                    </Stack>
                                    <Text color={COLORS.WHITE} >{m?.poster_path !== "" && m?.name}</Text>
                                </VStack>
                            </Flex>
                        )
                    })
                }
            </Row>
            <Stack align={"center"}>
                {loader && <Spinner color="red" height={50} width={50} />}
            </Stack>
        </Box>
    )
}
export default CategoryScreen