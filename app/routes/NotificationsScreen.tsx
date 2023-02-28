import { Text, Stack, Button, Img, HStack } from "@chakra-ui/react"
import { isMobile, isTablet, isAndroid } from 'react-device-detect';
import COLORS from "~/utils/colors"
import { useState, useEffect } from "react"
import { getTrending,getTrendingById } from "../api/moviesList"
import { useNavigate } from "react-router-dom";

const NotificationsScreen = () => {
    const navigate = useNavigate()
    const [trendingsList, setTrendingsList]: any = useState([])
    const [loader, setLoader]: any = useState(false)
    const getAllTrendingVideos = async () => {
        try {
            setLoader(true)
            const res = await getTrending()
            setTrendingsList(res?.results)
            setLoader(false)
        }
        catch (e) {
            console.log(e)
        }
    }
    
  const onDisplayVideoScreen = async(trendingData: any) => {
    const res = await getTrendingById(trendingData.id)
    const typeOfText = trendingData?.title === undefined ? "Tv" : "Movie"
    return (
      navigate(`/MoviePlayScreen`, { state: [res, typeOfText] })
    )
  }

    useEffect(() => { getAllTrendingVideos() }, [])
    const imageLink = "https://image.tmdb.org/t/p/original/"

    return (
        <Stack p={10} align="center" h={"100vh"} w={"100vw"} overflow={"scroll"}>
            <Text color={COLORS.WHITE} fontSize={24} fontStyle={"oblique"} fontWeight={700}>New Arraivals</Text>
            <Text color={COLORS.WHITE}>Today</Text>
            {!loader && trendingsList.map((t: any) => {
                return (
                    <>
                        <HStack key={t.id} >
                            {t?.title && t?.poster_path &&
                                <>
                                    <Stack _hover={{ borderColor: COLORS.WHITE, border: '2px solid', transform: "scale(1.10,1.10)", mr:"20px"}} color={COLORS.WHITE} mr={10}>
                                        <Img src={`${imageLink}/${t?.poster_path}`} alt="netFlixIcon" height={"25vh"} width={isMobile || isTablet || isAndroid ? "80vw":"30vw"} style={{ margin: "5px" }} key={t?.id} />
                                    </Stack>
                                    <Stack width={"30vw"} display={isMobile || isTablet || isAndroid ? "none" : "block"}>
                                        <Text color={"red"} fontSize={18}>{t?.title}</Text>
                                        <Text color={COLORS.WHITE}>{t?.overview}</Text>
                                        <Button color={COLORS.WHITE} backgroundColor={"transparent"} border="1px solid" cursor={"pointer"} fontSize={12} p={5} borderRadius={5} _hover={{ border: "2px solid" }} onClick={()=>onDisplayVideoScreen(t)}>Watch Now</Button>
                                    </Stack>
                                </>
                            }
                        </HStack>
                        {t?.title && t?.poster_path &&
                            <Stack display={isMobile || isTablet || isAndroid ? "block" : "none"}>
                                <Text color={"red"}>{t?.title}</Text>
                                <Text color={COLORS.WHITE}>{t?.overview}</Text>
                                <Button color={COLORS.WHITE} backgroundColor={"transparent"} border="1px solid" cursor={"pointer"} fontSize={12} p={5} borderRadius={5} _hover={{ border: "2px solid" }} onClick={()=>onDisplayVideoScreen(t)}>Watch Now</Button>
                            </Stack>
                        }
                    </>
                )
            })}
        </Stack>
    )
}
export default NotificationsScreen